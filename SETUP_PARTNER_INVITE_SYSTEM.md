# Partner Invite System Setup Guide

## Overview

This document provides setup instructions for the new partner application management system with cryptographically-signed, time-limited invite codes.

---

## 1. Database Setup

### Run the SQL Schema

Execute the SQL file in your Supabase database:

**File:** `database/partner_applications_schema.sql`

**How to apply:**

1. Log into your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `database/partner_applications_schema.sql`
4. Click "Run"

This creates:
- `partner_applications` table
- Indexes for efficient querying
- Row Level Security policies
- Auto-update timestamp trigger

---

## 2. Environment Variables

The system requires one new environment variable that has already been added to `.env.local`:

```
PARTNER_INVITE_SECRET="ECiOaH3Q1fnYDKODPzQn+ayR23pOpaX9cONVYwPtV/k="
```

**Important:**
- This secret is used to cryptographically sign invite codes
- Keep it secure and never commit it to version control
- If you change this secret, all existing invite codes will be invalidated

---

## 3. System Workflow

### For Prospective Partners:

1. **Apply** at `/partners/apply`
   - Fill out application form (name, email, phone, company, description)
   - Application saved to database with status "pending"
   - Email notification sent to admin

2. **Wait for Approval**
   - Admin reviews application in admin dashboard

3. **Receive Invite Code**
   - If approved, receives email with unique invite code
   - Code format: `PASU-XXXX-XXXX-XXXX`
   - Code expires in 7 days (configurable by admin)

4. **Sign Up** at `/partners/sign-up`
   - Enter email, password, name, and invite code
   - System validates:
     - Code signature is valid
     - Code matches email address
     - Code hasn't expired
   - If valid, account is created

5. **Verify Email**
   - Partner verifies email via Supabase link
   - Partner record automatically created in database

6. **Access Dashboard**
   - Login at `/partners/login`
   - Access full partner dashboard and features

### For Admins:

1. **View Applications** at `/admin/partner-applications`
   - See all applications with filtering
   - Stats dashboard (total, pending, approved, rejected)
   - Search by name, email, or company

2. **Review Application** at `/admin/partner-applications/[id]`
   - View full application details
   - Approve or reject with optional notes

3. **Approval Process**
   - Set invite code validity (1-90 days)
   - Add admin notes
   - Click "Approve"
   - System automatically:
     - Generates cryptographic invite code
     - Sends approval email to applicant
     - Updates application status

4. **Manage Codes**
   - View invite code for approved applications
   - Copy code to clipboard
   - Resend email if needed
   - Regenerate code if expired

---

## 4. Admin Access

### Accessing Admin Dashboard

**Navigation:**
- Visit `/admin/partner-applications`
- Or `/admin/partner-orders`

**Authentication:**
- Must be logged in with Supabase auth
- Email must exist in `admins` table
- Protected by middleware

### Admin Navigation

The new admin layout provides:
- Persistent navigation bar
- Links to Partner Orders and Partner Applications
- Quick "Back to Site" button

---

## 5. Security Features

### Invite Code Security

✅ **Cryptographically Signed**
- Uses HMAC-SHA256 with secret key
- Impossible to forge or tamper with

✅ **Email-Bound**
- Code only works for specific email address
- Cannot be shared or transferred

✅ **Time-Limited**
- Expires after specified days (default: 7)
- Clear expiry date shown to user

✅ **Server-Side Validation**
- All checks performed on server
- Cannot be bypassed by client manipulation

✅ **Constant-Time Comparison**
- Prevents timing attacks
- Secure signature verification

### Code Format

```
PASU-XXXX-XXXX-XXXX
```

Contains (Base64URL encoded):
- Email address
- Expiry timestamp
- HMAC signature

Example:
```
PASU-am9o-bkBl-eGFt-cGxl-LmNv-bXwy-MDI1
```

---

## 6. Email Templates

### Application Received (Sent to Admin)

**From:** `Partner Application <contact@pasuhealth.com>`
**To:** `contact@pasuhealth.com`
**Subject:** "New Partner Application Submission"

Contains:
- Applicant details
- Company information
- Description

### Application Approved (Sent to Partner)

**From:** `PASU Health <contact@pasuhealth.com>`
**To:** Applicant's email
**Subject:** "Welcome to PASU Health Partner Program - Your Invite Code"

Contains:
- Welcome message
- Large, formatted invite code
- Expiry date and time
- Step-by-step signup instructions
- Important notes about code usage
- Partner benefits overview

---

## 7. Testing the System

### Test Workflow

1. **Submit Test Application**
   ```
   Go to: /partners/apply
   Fill in test data
   Check database: SELECT * FROM partner_applications
   ```

2. **Approve Application (Admin)**
   ```
   Go to: /admin/partner-applications
   Click on application
   Set days valid: 7
   Click "Approve Application"
   ```

3. **Check Email**
   ```
   Verify email was sent with invite code
   Code format should be: PASU-XXXX-XXXX-XXXX
   ```

4. **Test Sign-Up**
   ```
   Go to: /partners/sign-up
   Enter details matching application email
   Paste invite code
   Submit form
   ```

5. **Verify Account**
   ```
   Click email verification link
   Check partners table: SELECT * FROM partners
   ```

6. **Test Login**
   ```
   Go to: /partners/login
   Login with credentials
   Access dashboard
   ```

### Test Invalid Scenarios

❌ **Wrong Email**
```
Use invite code with different email
Expected: "This invite code was issued for a different email address"
```

❌ **Expired Code**
```
Approve with 0 days (or modify expiry in database)
Expected: "This invite code has expired. Please contact PASU Health for a new code"
```

❌ **Invalid Format**
```
Enter random code like "INVALID-CODE"
Expected: "Invalid invite code format"
```

❌ **Missing Code**
```
Leave invite code field empty
Expected: "Invite code is required"
```

---

## 8. Troubleshooting

### Issue: Database Error When Submitting Application

**Solution:**
- Verify `partner_applications` table exists
- Check RLS policies are enabled
- Ensure INSERT policy allows anonymous/authenticated users

### Issue: Invite Code Validation Fails

**Solution:**
- Verify `PARTNER_INVITE_SECRET` is set in `.env.local`
- Restart dev server after adding environment variable
- Check code was copied correctly (no extra spaces)

### Issue: Email Not Sending

**Solution:**
- Verify `RESEND_API_KEY` is correct
- Check `CONTACT_EMAIL` is set
- Check Resend dashboard for delivery status
- Look for errors in server logs

### Issue: Admin Pages Return 404

**Solution:**
- Verify you're logged in as an admin user
- Check your email exists in `admins` table
- Clear Next.js cache: `rm -rf .next`

### Issue: Can't Access Admin Dashboard

**Solution:**
```sql
-- Add your email to admins table
INSERT INTO admins (email) VALUES ('your-email@example.com');
```

---

## 9. Configuration Options

### Adjust Default Invite Code Validity

In `app/actions/adminPartnerApplication.ts`:

```typescript
const ApproveApplicationSchema = z.object({
  // Change default from 7 to your preferred default
  daysValid: z.coerce.number().min(1).max(90).default(7),
  // ...
});
```

### Change Email Styling

Edit the HTML template in:
`app/actions/adminPartnerApplication.ts` → `sendApprovalEmail()` function

### Modify Code Format

In `lib/partnerInviteCode.ts` → `formatInviteCode()` function:

```typescript
// Current: PASU-XXXX-XXXX-XXXX (4-char segments)
// Change segment size or prefix as needed
```

---

## 10. Maintenance

### Rotate Secret Key

To invalidate all existing codes:

1. Generate new secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. Update `.env.local`:
   ```
   PARTNER_INVITE_SECRET="new-secret-here"
   ```

3. Restart server

4. All old codes will no longer validate

### Clean Up Old Applications

```sql
-- Archive old rejected applications (optional)
DELETE FROM partner_applications
WHERE status = 'rejected'
AND created_at < NOW() - INTERVAL '90 days';
```

### Monitor Application Stats

```sql
-- View application statistics
SELECT
  status,
  COUNT(*) as count,
  MIN(created_at) as first,
  MAX(created_at) as latest
FROM partner_applications
GROUP BY status;
```

---

## 11. File Summary

### New Files Created (13)

| File | Purpose |
|------|---------|
| `database/partner_applications_schema.sql` | Database schema |
| `types/partnerApplication.ts` | TypeScript types |
| `lib/partnerInviteCode.ts` | Cryptography utility |
| `app/actions/adminPartnerApplication.ts` | Admin server actions |
| `app/admin/layout.tsx` | Admin navigation layout |
| `app/admin/partner-applications/page.tsx` | Applications list page |
| `app/admin/partner-applications/[id]/page.tsx` | Application detail page |
| `components/admin/AdminApplicationTable.tsx` | Applications table |
| `components/admin/ApplicationApprovalForm.tsx` | Approval form |

### Files Modified (4)

| File | Changes |
|------|---------|
| `.env.local` | Added `PARTNER_INVITE_SECRET` |
| `app/actions/partnerApplication.ts` | Added database insert |
| `app/partners/sign-up/page.tsx` | Added invite code field |
| `app/partners/actions.ts` | Added code validation |

---

## 12. Next Steps

After setup:

1. ✅ Run database schema
2. ✅ Verify environment variables
3. ✅ Test complete workflow
4. ✅ Add your email to admins table
5. ✅ Test admin functionality
6. ✅ Submit test application
7. ✅ Approve and generate code
8. ✅ Complete test signup

---

## Support

For issues or questions about this system:

- Review error messages in browser console
- Check server logs for detailed errors
- Verify database tables and RLS policies
- Test with different browsers/incognito mode
- Check Supabase dashboard for auth issues

---

*Generated with Claude Code*
*Last Updated: 2025-11-03*
