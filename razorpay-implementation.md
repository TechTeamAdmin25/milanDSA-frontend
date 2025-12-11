# Razorpay Payment Gateway Implementation Guide for MILAN Ticketing

## Table of Contents
1. [Overview](#overview)
2. [Payment Flow - 6 Stages](#payment-flow---6-stages)
3. [Environment Setup](#environment-setup)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Integration](#frontend-integration)
6. [Database Schema](#database-schema)
7. [Error Handling & Logging](#error-handling--logging)
8. [Security Considerations](#security-considerations)
9. [Webhook Configuration](#webhook-configuration)
10. [Testing Checklist](#testing-checklist)
11. [API Reference](#api-reference)
12. [Troubleshooting Guide](#troubleshooting-guide)

---

## Overview

This document provides comprehensive guidance for implementing Razorpay payment gateway for MILAN ticket booking system. The implementation follows the official 6-stage payment lifecycle to ensure secure, reliable, and verifiable transactions.

### Key Features
- **Secure Order Creation**: Backend-generated orders prevent amount tampering
- **Signature Verification**: HMAC-SHA256 validation ensures payment authenticity
- **Comprehensive Logging**: Debug-friendly logs with timestamps and emojis
- **Webhook Backup**: Server-to-server notifications for reliability
- **Ticket History**: User account shows purchased tickets

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Payment Gateway**: Razorpay (Test/Live)
- **Authentication**: localStorage-based session (studentEmail)

---

## Payment Flow - 6 Stages

### Stage 1: Backend Creates an Order
```
┌─────────────────────────────────────────────────────────────────┐
│                    1. ORDER CREATION                            │
├─────────────────────────────────────────────────────────────────┤
│ • User clicks "Book Now" button                                 │
│ • Frontend calls /api/payment/create-order                      │
│ • Backend validates user session                                │
│ • Backend fetches student data from database                    │
│ • Backend calls Razorpay API to create order                    │
│ • Razorpay returns order_id (unique transaction reference)      │
│ • Backend returns order_id + student info to frontend           │
└─────────────────────────────────────────────────────────────────┘
```

**Why Create an Order First?**
- Razorpay requires a unique transaction reference
- Amount cannot be tampered on frontend (security)
- Links payment verification later
- Prevents replay attacks

**Backend sends to Razorpay:**
```javascript
{
  amount: 150000,        // Amount in PAISE (₹1500 = 150000 paise)
  currency: "INR",
  receipt: "MILAN_THAMAN_20241204_123456",  // Unique receipt ID
  notes: {
    event_name: "Thaman Live in Concert",
    student_email: "student@srmap.edu.in",
    booking_type: "pro_show_ticket"
  }
}
```

**Razorpay returns:**
```javascript
{
  id: "order_MpyV7eOsTBn24z",    // This is the ORDER_ID
  entity: "order",
  amount: 150000,
  amount_paid: 0,
  amount_due: 150000,
  currency: "INR",
  receipt: "MILAN_THAMAN_20241204_123456",
  status: "created",             // Initial status
  attempts: 0,
  created_at: 1697698714
}
```

### Stage 2: Frontend Opens Razorpay Checkout
```
┌─────────────────────────────────────────────────────────────────┐
│                 2. RAZORPAY CHECKOUT UI                         │
├─────────────────────────────────────────────────────────────────┤
│ • Frontend loads Razorpay checkout script                       │
│ • Creates checkout instance with order_id                       │
│ • Opens Razorpay modal/popup                                    │
│ • User sees payment options: UPI, Cards, Netbanking, Wallets   │
│ • Razorpay handles all UI, OTP, UPI intent                     │
└─────────────────────────────────────────────────────────────────┘
```

**Frontend Checkout Configuration:**
```javascript
const options = {
  key: "rzp_test_XXXXXX",           // Razorpay Key ID (public)
  amount: 150000,                    // Amount in paise
  currency: "INR",
  name: "MILAN 26",                  // Your business name
  description: "Thaman Live in Concert Ticket",
  image: "/Sprites/MilanLogo.png",   // Your logo
  order_id: "order_MpyV7eOsTBn24z",  // Order ID from Stage 1
  prefill: {
    name: "Student Name",
    email: "student@srmap.edu.in",
    contact: "9999999999"
  },
  theme: {
    color: "#EAB308"                 // Yellow theme matching MILAN
  },
  handler: function(response) {
    // Success callback - Stage 4
  },
  modal: {
    ondismiss: function() {
      // User closed modal without completing payment
    }
  }
};
```

### Stage 3: User Pays - Razorpay Processes Payment
```
┌─────────────────────────────────────────────────────────────────┐
│               3. PAYMENT PROCESSING                             │
├─────────────────────────────────────────────────────────────────┤
│ Internal Razorpay Processing:                                   │
│ • Verifies UPI/card details                                     │
│ • Sends OTP request                                             │
│ • Confirms with bank/payment processor                          │
│ • Handles success/failure                                       │
│ • Generates payment_id                                          │
│                                                                 │
│ On Success, Razorpay sends to frontend:                        │
│ • razorpay_payment_id                                          │
│ • razorpay_order_id                                            │
│ • razorpay_signature                                           │
└─────────────────────────────────────────────────────────────────┘
```

**⚠️ IMPORTANT: This frontend callback is NOT verified yet!**
- Anyone can fake this response
- NEVER trust frontend response directly
- ALWAYS verify on backend (Stage 4)

### Stage 4: Backend VERIFIES Payment (CRITICAL)
```
┌─────────────────────────────────────────────────────────────────┐
│              4. SIGNATURE VERIFICATION                          │
├─────────────────────────────────────────────────────────────────┤
│ • Frontend sends payment details to /api/payment/verify-payment │
│ • Backend generates HMAC SHA256 signature                       │
│ • Compares with Razorpay's signature                           │
│ • If match → Payment is AUTHENTIC and APPROVED                 │
│ • If not → FRAUD or TAMPERED - Reject immediately              │
└─────────────────────────────────────────────────────────────────┘
```

**Signature Verification Algorithm:**
```javascript
// Step 1: Concatenate order_id and payment_id
const body = razorpay_order_id + "|" + razorpay_payment_id;

// Step 2: Generate HMAC SHA256 using your API Secret
const crypto = require('crypto');
const expectedSignature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(body)
  .digest('hex');

// Step 3: Compare signatures
const isValid = expectedSignature === razorpay_signature;
```

**Using Razorpay SDK Helper:**
```javascript
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');

const isValid = validatePaymentVerification(
  { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
  razorpay_signature,
  RAZORPAY_KEY_SECRET
);
```

### Stage 5: Save Booking to Database
```
┌─────────────────────────────────────────────────────────────────┐
│              5. DATABASE OPERATIONS                             │
├─────────────────────────────────────────────────────────────────┤
│ After successful verification:                                  │
│ • Insert record into ticket_confirmations table                │
│ • Store: student info, event info, payment details             │
│ • Generate unique booking_reference                            │
│ • Set payment_status to "completed"                            │
│ • Return success response to frontend                          │
│ • Frontend redirects to account page                           │
└─────────────────────────────────────────────────────────────────┘
```

### Stage 6: Webhook Backup (Recommended)
```
┌─────────────────────────────────────────────────────────────────┐
│              6. WEBHOOK NOTIFICATIONS                           │
├─────────────────────────────────────────────────────────────────┤
│ Scenarios where webhooks help:                                  │
│ • User closes browser early                                     │
│ • Network drops during callback                                 │
│ • Device crashes                                                │
│                                                                 │
│ Razorpay sends server-to-server notification:                  │
│ • POST to your webhook endpoint                                │
│ • Contains: payment_id, order_id, amount, status               │
│ • Validate webhook signature before processing                 │
│ • Update database if not already updated                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Environment Setup

### Required Environment Variables
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX      # Public Key (safe for frontend)
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX  # Secret Key (NEVER expose to frontend)

# For webhooks (optional but recommended)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Next.js Configuration
The Razorpay Key ID needs to be exposed to the frontend. Create or update `next.config.ts`:
```typescript
const nextConfig = {
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  },
};
```

---

## Backend Implementation

### File Structure
```
app/
├── api/
│   └── payment/
│       ├── create-order/
│       │   └── route.ts    # Stage 1: Create Razorpay order
│       ├── verify-payment/
│       │   └── route.ts    # Stage 4: Verify payment signature
│       └── webhook/
│           └── route.ts    # Stage 6: Handle webhooks
lib/
├── razorpay.ts             # Razorpay utility functions
└── database.types.ts       # TypeScript types (updated)
```

### API Endpoints

#### POST /api/payment/create-order
**Request Body:**
```typescript
{
  eventName: string;      // "Thaman Live in Concert"
  eventDate: string;      // "Sat 15 Feb 2026"
  ticketPrice: number;    // 1500 (in rupees)
  studentEmail: string;   // From localStorage session
}
```

**Response:**
```typescript
{
  success: true;
  orderId: string;        // Razorpay order_id
  amount: number;         // Amount in paise
  currency: string;       // "INR"
  studentData: {
    name: string;
    email: string;
    registrationNumber: string;
    batch: string;
  }
}
```

#### POST /api/payment/verify-payment
**Request Body:**
```typescript
{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  eventName: string;
  eventDate: string;
  ticketPrice: number;
  studentEmail: string;
}
```

**Response:**
```typescript
{
  success: true;
  message: string;
  bookingReference: string;
  ticketData: {
    id: string;
    eventName: string;
    eventDate: string;
    bookingReference: string;
    paymentStatus: string;
  }
}
```

#### POST /api/payment/webhook
**Request Headers:**
```
X-Razorpay-Signature: <webhook_signature>
```

**Request Body:**
```json
{
  "entity": "event",
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_XXXXXXXX",
        "order_id": "order_XXXXXXXX",
        "amount": 150000,
        "status": "captured"
      }
    }
  }
}
```

---

## Frontend Integration

### Loading Razorpay Checkout Script

**Option 1: Script Tag in Layout**
```tsx
// app/layout.tsx
<Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
```

**Option 2: Dynamic Loading in Component**
```typescript
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
```

### Complete Payment Handler
```typescript
const handlePayment = async () => {
  // 1. Load Razorpay script
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error('Failed to load payment gateway');
    return;
  }

  // 2. Check user session
  const studentEmail = localStorage.getItem('studentEmail');
  if (!studentEmail) {
    router.push('/login');
    return;
  }

  // 3. Create order on backend
  const orderResponse = await fetch('/api/payment/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: "Thaman Live in Concert",
      eventDate: "Sat 15 Feb 2026",
      ticketPrice: 1500,
      studentEmail
    })
  });

  const orderData = await orderResponse.json();
  if (!orderData.success) {
    toast.error(orderData.message);
    return;
  }

  // 4. Configure Razorpay options
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: orderData.currency,
    name: "MILAN 26",
    description: "Thaman Live in Concert Ticket",
    order_id: orderData.orderId,
    prefill: {
      name: orderData.studentData.name,
      email: orderData.studentData.email,
    },
    handler: async function(response) {
      // 5. Verify payment on backend
      const verifyResponse = await fetch('/api/payment/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          eventName: "Thaman Live in Concert",
          eventDate: "Sat 15 Feb 2026",
          ticketPrice: 1500,
          studentEmail
        })
      });

      const verifyData = await verifyResponse.json();
      if (verifyData.success) {
        toast.success('Payment successful!');
        router.push('/account');
      } else {
        toast.error('Payment verification failed');
      }
    },
    modal: {
      ondismiss: function() {
        toast.warning('Payment cancelled');
      }
    },
    theme: { color: "#EAB308" }
  };

  // 6. Open Razorpay checkout
  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};
```

---

## Database Schema

### ticket_confirmations Table
```sql
CREATE TABLE ticket_confirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Student Information
  name VARCHAR NOT NULL,
  registration_number VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  batch VARCHAR,

  -- Event Information
  event_name VARCHAR NOT NULL,
  event_date VARCHAR,
  ticket_price NUMERIC NOT NULL,

  -- Payment Information
  razorpay_order_id VARCHAR NOT NULL,
  razorpay_payment_id VARCHAR,
  razorpay_signature VARCHAR,
  payment_status VARCHAR DEFAULT 'pending',  -- pending, completed, failed

  -- Booking Reference
  booking_reference VARCHAR UNIQUE NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ticket_confirmations ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read their own tickets
CREATE POLICY "Users can read their own tickets"
  ON ticket_confirmations
  FOR SELECT
  USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Policy for service role to insert/update
CREATE POLICY "Service role can manage all tickets"
  ON ticket_confirmations
  FOR ALL
  USING (true);
```

### TypeScript Types
```typescript
// lib/database.types.ts (addition)
ticket_confirmations: {
  Row: {
    id: string;
    name: string;
    registration_number: string;
    email: string;
    batch: string | null;
    event_name: string;
    event_date: string | null;
    ticket_price: number;
    razorpay_order_id: string;
    razorpay_payment_id: string | null;
    razorpay_signature: string | null;
    payment_status: string;
    booking_reference: string;
    created_at: string;
    updated_at: string;
  };
  // ... Insert and Update types
}
```

---

## Error Handling & Logging

### Log Levels and Format
```
📝 [INFO]    General information
✅ [SUCCESS] Successful operations
⚠️ [WARNING] Non-critical issues
❌ [ERROR]   Critical errors
🔐 [SECURITY] Security-related events
💰 [PAYMENT] Payment-specific events
```

### Example Log Output
```
💰 [PAYMENT] [2024-12-04T10:30:00.000Z] Creating order for: student@srmap.edu.in
📝 [INFO] [2024-12-04T10:30:00.100Z] Event: Thaman Live in Concert, Amount: ₹1500
✅ [SUCCESS] [2024-12-04T10:30:00.500Z] Order created: order_MpyV7eOsTBn24z
💰 [PAYMENT] [2024-12-04T10:31:30.000Z] Verifying payment: pay_JRP3Y66cNcf2qF
🔐 [SECURITY] [2024-12-04T10:31:30.100Z] Signature verification: PASSED
✅ [SUCCESS] [2024-12-04T10:31:30.200Z] Ticket confirmed: MILAN-THAMAN-ABC123
```

### Common Error Scenarios
| Error Code | Description | Action |
|------------|-------------|--------|
| `NO_SESSION` | User not logged in | Redirect to login |
| `USER_NOT_FOUND` | Email not in database | Show error message |
| `ORDER_CREATION_FAILED` | Razorpay API error | Retry or contact support |
| `SIGNATURE_MISMATCH` | Payment verification failed | Do NOT fulfill order |
| `DB_INSERT_FAILED` | Database write error | Log and notify admin |

---

## Security Considerations

### DO's ✅
- Always verify payment signature on backend
- Use HTTPS for all API calls
- Store RAZORPAY_KEY_SECRET only on server
- Validate user session before creating orders
- Use unique receipt IDs for each order
- Log all payment events for audit trail
- Implement webhook for backup verification

### DON'Ts ❌
- Never expose RAZORPAY_KEY_SECRET to frontend
- Never trust frontend payment callbacks without verification
- Never store sensitive payment data in localStorage
- Never skip signature verification
- Never use predictable receipt IDs

---

## Webhook Configuration

### Setting Up Webhooks in Razorpay Dashboard
1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add new webhook with URL: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Set a strong webhook secret
5. Save and test

### Webhook Signature Verification
```typescript
import Razorpay from 'razorpay';

const isValidSignature = Razorpay.validateWebhookSignature(
  JSON.stringify(webhookBody),
  xRazorpaySignature,
  RAZORPAY_WEBHOOK_SECRET
);
```

### Idempotency
Webhooks can be delivered multiple times. Ensure your handler is idempotent:
```typescript
// Check if payment already processed
const existing = await supabase
  .from('ticket_confirmations')
  .select('id')
  .eq('razorpay_payment_id', paymentId)
  .single();

if (existing.data) {
  // Already processed, return success without duplicate action
  return NextResponse.json({ success: true, message: 'Already processed' });
}
```

---

## Testing Checklist

### Test Mode Credentials
- Use `rzp_test_XXXX` key (test mode)
- Test card: `4386 2894 0766 0153`
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: `1234`

### Test Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| 1 | Successful card payment | Order confirmed, ticket in account |
| 2 | Failed card payment | Error message shown, no ticket created |
| 3 | User closes payment modal | "Payment cancelled" message |
| 4 | Network error during verification | Webhook handles confirmation |
| 5 | User not logged in | Redirect to login page |
| 6 | Invalid signature | Payment rejected, logged as fraud |
| 7 | Duplicate webhook | No duplicate ticket created |
| 8 | UPI payment | Order confirmed (use UPI test) |

### Pre-Production Checklist
- [ ] All test scenarios pass
- [ ] Switch to production Razorpay keys
- [ ] Update webhook URL to production domain
- [ ] Enable HTTPS
- [ ] Test with real payment (small amount)
- [ ] Verify database records
- [ ] Check email notifications (if any)
- [ ] Monitor logs for 24 hours

---

## API Reference

### Razorpay SDK Methods Used

#### Create Order
```typescript
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

const order = await razorpay.orders.create({
  amount: 150000,        // in paise
  currency: "INR",
  receipt: "MILAN_XYZ_123"
});
```

#### Validate Payment Signature
```typescript
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

const isValid = validatePaymentVerification(
  { order_id, payment_id },
  signature,
  key_secret
);
```

#### Validate Webhook Signature
```typescript
import Razorpay from 'razorpay';

const isValid = Razorpay.validateWebhookSignature(
  requestBody,
  xRazorpaySignature,
  webhookSecret
);
```

---

## Troubleshooting Guide

### Issue: "Razorpay is not defined"
**Cause:** Checkout script not loaded
**Solution:** Ensure script is loaded before opening checkout
```typescript
const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};
```

### Issue: "Order creation failed"
**Cause:** Invalid Razorpay credentials or API error
**Solution:**
1. Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`
2. Check if using test keys in test mode
3. Ensure amount is in paise (multiply by 100)

### Issue: "Signature verification failed"
**Cause:** Signature mismatch
**Solution:**
1. Ensure using exact same `order_id` and `payment_id` from callback
2. Use `RAZORPAY_KEY_SECRET` (not Key ID) for verification
3. Verify signature string format: `order_id|payment_id`

### Issue: "User sees payment success but no ticket"
**Cause:** Frontend callback worked but backend verification failed
**Solution:**
1. Check API logs for verification endpoint
2. Ensure webhook is configured as backup
3. Check database for any partial records

### Issue: "Webhook signature invalid"
**Cause:** Wrong webhook secret or body parsing issue
**Solution:**
1. Use raw request body (not parsed JSON) for signature
2. Verify `RAZORPAY_WEBHOOK_SECRET` matches dashboard
3. Don't modify request body before validation

---

## Quick Reference Card

| Item | Value |
|------|-------|
| Test Key Format | `rzp_test_XXXX` |
| Live Key Format | `rzp_live_XXXX` |
| Amount Unit | Paise (₹1 = 100 paise) |
| Test Card | 4111 1111 1111 1111 |
| Test OTP | 1234 |
| Signature Algorithm | HMAC-SHA256 |
| Signature Format | `order_id\|payment_id` |
| Checkout Script | https://checkout.razorpay.com/v1/checkout.js |

---

*Last Updated: December 4, 2024*
*MILAN 26 - SRM University AP*
