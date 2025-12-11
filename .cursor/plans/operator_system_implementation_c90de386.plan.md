---
name: Operator System Implementation
overview: Create a complete operator system with separate login, RSVP flow for students, ticket printing functionality, and test data generation for the Milan 26' event management platform.
todos:
  - id: db-tables
    content: Create operator_data and rsvp_confirmations tables via Supabase migrations
    status: completed
  - id: update-types
    content: Update lib/database.types.ts with new table types
    status: completed
  - id: operator-login
    content: Create operator login page and API route
    status: in_progress
  - id: operator-dashboard
    content: Create operator dashboard with 3 task options (mobile-first)
    status: pending
  - id: print-tickets
    content: Create print tickets page with search, multi-select, and persistent selection
    status: pending
  - id: verify-qr
    content: Create verify QR page with scanner and manual entry
    status: pending
  - id: operator-profile
    content: Create operator profile page with logout
    status: pending
  - id: student-rsvp
    content: Add RSVP button to account page and create RSVP flow pages
    status: pending
  - id: rsvp-api
    content: Create API routes for RSVP confirmation
    status: pending
  - id: test-data
    content: Generate 100 test students, tickets, 90 RSVPs, and 1 operator via SQL
    status: pending
---

# Operator System Implementation Plan

## Database Tables

### 1. `operator_data` Table

```sql
-- columns: id, username, password, station_number, printed_tickets, created_at, updated_at
```

### 2. `rsvp_confirmations` Table

```sql
-- columns: id, full_name, registration_number, email, ticket_reference, event_name, 
--          rsvp_status (pending/ready/printed), printed_by, printed_at, created_at, updated_at
```

---

## File Structure to Create

```
app/
├── operator/
│   ├── login/page.tsx          -- Operator login page
│   └── dashboard/
│       ├── page.tsx            -- Main dashboard (task selection)
│       ├── print-tickets/page.tsx
│       ├── verify-qr/page.tsx
│       └── profile/page.tsx
├── rsvp/
│   ├── page.tsx               -- RSVP confirmation page (student scans QR to get here)
│   └── success/page.tsx       -- Success page with map image
├── api/
│   ├── operator/
│   │   ├── login/route.ts
│   │   ├── rsvp-list/route.ts
│   │   ├── print/route.ts
│   │   └── verify-ticket/route.ts
│   └── rsvp/
│       └── confirm/route.ts
lib/
└── rsvp-qr.ts                 -- RSVP QR code generation
```

---

## Implementation Details

### Student RSVP Flow

1. Add "RSVP" button to ticket card in `app/account/page.tsx` (bottom-right corner)
2. Button opens camera to scan RSVP QR code
3. RSVP QR redirects to `/rsvp?ticket_ref={booking_reference}`
4. Page asks: "Are you ready to RSVP? Are you available at the station?"
5. YES: Verify in `ticket_confirmations` -> Insert into `rsvp_confirmations` -> Show map + "Next"
6. NO: Redirect back to `/account`

### Operator Login (`/operator/login`)

- Simple form: username + password
- Validate against `operator_data` table
- Store operator session in localStorage

### Operator Dashboard (`/operator/dashboard`)

- Header: "Milan 26'"
- Welcome message with operator name
- Three task buttons: Print Tickets, Verify QR, My Profile

### Print Tickets Page

- Search bar (name, reg number, ticket reference)
- List from `rsvp_confirmations` (status = 'ready')
- Multi-select up to 10 (selected items float to top)
- Counter: "X/10 selected | Refresh | Deselect All"
- Persistent selection (localStorage)
- PRINT button -> Update `printed_tickets` count for operator

### Verify QR Page

- "Scan Now" button for camera QR scanner
- Manual entry field for ticket_reference
- Shows matching results from `ticket_confirmations`
- Select adds to Print Tickets selection as "stranded student"

### My Profile Page

- Operator name, station number, printed tickets count
- Logout button

---

## Test Data Generation

- 100 test students in `student_database`
- 100 tickets in `ticket_confirmations` (payment_status = 'completed')
- 90 entries in `rsvp_confirmations` (status = 'ready')
- 1 operator: username: `operator1`, password: `milan2026`, station: `3`

---

## RSVP QR Code

- Static QR pointing to: `https://yourdomain.com/rsvp?source=station_qr`
- Student's logged-in session will identify which ticket to RSVP