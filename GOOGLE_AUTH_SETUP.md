# 🔐 Google Auth Setup Guide

For the "Sign in with Google" button to work, you must configure **Google Cloud** and **Supabase**.
Follow these exact steps. It takes about 5 minutes.

## 1. Get Google Cloud Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "Milan Fest").
3. Search for **"OAuth consent screen"** in the top bar.
   - Select **External**.
   - Fill in App Name ("Milan"), User Support Email, and Developer Email.
   - Click "Save and Continue" through scopes and test users (you can leave defaults).
   - **Publish** the App (Make it production ready, otherwise only test emails work).
4. Go to **Credentials** (left sidebar).
5. Click **+ Create Credentials** → **OAuth client ID**.
6. Application Type: **Web application**.
7. Name: "Supabase Login".
8. **Authorized Redirect URIs**:
   - You need your Supabase Callback URL here.
   - Go to your Supabase Dashboard → Authentication → Providers → Google (Expand it) → Copy the **Callback URL** (it looks like `https://yoursite.supabase.co/auth/v1/callback`).
   - Paste that URL into Google Cloud's "Authorized redirect URIs".
9. Click **Create**.
10. Copy the **Client ID** and **Client Secret**.

## 2. Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication** → **Providers**.
3. Click **Google** to expand it.
4. **Enable** the "Google enabled" toggle.
5. Paste the **Client ID** and **Client Secret** you just got from Google.
6. Click **Save**.

## 3. Allowed Redirect URLs (Critical)

1. In Supabase, go to **Authentication** → **URL Configuration**.
2. Under **Redirect URLs**, you must add your local development URL.
3. Add: `http://localhost:3000/login`
4. Click **Save**.

## ✅ Verification

1. Restart your development server (`npm run dev`).
2. Go to `http://localhost:3000/login`.
3. Open Developer Console (F12). You should see `✅ Supabase initialized in REAL mode`.
4. Click "Sign in with Google".
5. It should redirect to Google, ask for permission, and redirect back.

### Troubleshooting

- **Error: "Provider is not enabled"**: You didn't enable Google in Supabase (Step 2.4).
- **Error: "redirect_uri_mismatch"**: The URL in Google Cloud Web Client (Step 1.8) doesn't exactly match the Supabase Callback URL.
