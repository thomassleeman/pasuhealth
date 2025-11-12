# Partner Signup Email Error - Debugging Guide

## Error
```
Error [AuthApiError]: Error sending confirmation email
status: 500,
code: 'unexpected_failure'
```

## Root Causes & Solutions

### 1. Check Environment Variables (Most Likely Issue)

**Required Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL
```

**How to Check:**
1. Create a `.env.local` file in your project root (if it doesn&apos;t exist)
2. Add the variables above
3. For local development, use `http://localhost:3000`
4. For production, use your actual domain (e.g., `https://pasuhealth.com`)

**Important:**
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- You need to restart your dev server after adding/changing .env.local
- Check your deployment platform (Vercel/etc.) has these variables set

---

### 2. Configure Supabase Email Settings

#### Option A: Use Supabase&apos;s Built-in Email (Recommended for Development)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Email Templates**
4. Verify the "Confirm signup" template is enabled

**Note:** Supabase provides 4 free emails per hour for development. This is usually sufficient for testing.

#### Option B: Configure Custom SMTP (Recommended for Production)

1. Go to **Project Settings** → **Auth** → **SMTP Settings**
2. Enable Custom SMTP
3. Enter your SMTP provider details:
   - Host (e.g., smtp.gmail.com, smtp.sendgrid.net)
   - Port (usually 587 for TLS or 465 for SSL)
   - Username
   - Password
   - Sender email and name

**Popular SMTP Providers:**
- SendGrid (free tier: 100 emails/day)
- Mailgun (free tier: 1000 emails/month)
- Gmail (requires app password)
- Resend (since you already use it for contact forms)

---

### 3. Whitelist Redirect URLs in Supabase

1. Go to **Authentication** → **URL Configuration**
2. Add your redirect URLs to **Redirect URLs**:
   - Local: `http://localhost:3000/auth/callback`
   - Production: `https://pasuhealth.com/auth/callback`
   - Production: `https://www.pasuhealth.com/auth/callback` (if using www)

**Important:** The redirect URL must EXACTLY match what&apos;s in your code. Check the logs after our fix to see what URL is being used.

---

### 4. Disable Email Confirmation (Temporary Workaround)

If you want to test signup without email confirmation:

1. Go to **Authentication** → **Providers** → **Email**
2. Disable "Confirm email"

**Warning:** This is NOT recommended for production as it allows anyone to sign up without verifying their email.

---

## Testing the Fix

### Step 1: Check the Logs

After the code changes, try signing up again and check your terminal for:

```
Signup configuration: {
  email: 'test@example.com',
  siteUrl: 'http://localhost:3000',  // Should NOT be undefined!
  emailRedirectTo: 'http://localhost:3000/auth/callback?next=/partners/dashboard',
  hasPassword: true
}
```

**If siteUrl is `undefined`:**
- Your `NEXT_PUBLIC_SITE_URL` is not set
- Add it to `.env.local` and restart dev server

**If you see an error with full details:**
- Check the `status` and `message` fields
- This will tell you exactly what Supabase is complaining about

### Step 2: Check Supabase Logs

1. Go to Supabase Dashboard → **Logs** → **Auth Logs**
2. Look for the signup attempt
3. Check for any specific error messages

### Step 3: Test Email Sending

You can test if Supabase can send emails at all:

1. Go to **Authentication** → **Users**
2. Click "Invite user"
3. Enter a test email
4. If this fails, it&apos;s definitely a Supabase email configuration issue

---

## Quick Checklist

- [ ] `.env.local` file exists with `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- [ ] Dev server restarted after adding environment variables
- [ ] Redirect URL whitelisted in Supabase Dashboard
- [ ] Email template enabled in Supabase (or email confirmation disabled for testing)
- [ ] SMTP configured (if using custom SMTP)
- [ ] Check Supabase Auth logs for specific errors

---

## Common Error Messages & Solutions

### "Invalid redirect URL"
- Add the URL to Supabase → Auth → URL Configuration → Redirect URLs

### "SMTP configuration error"
- Check SMTP settings in Supabase
- Verify credentials are correct
- Try using Supabase&apos;s built-in email instead

### "Rate limit exceeded"
- Supabase free tier: 4 emails per hour
- Wait or upgrade plan / configure custom SMTP

### "Email not found" / "Template error"
- Enable the "Confirm signup" email template in Supabase

---

## Need More Help?

1. Check the improved logs in your terminal after trying signup again
2. Check Supabase Dashboard → Logs → Auth Logs
3. Share the specific error message from the logs (with sensitive data removed)
