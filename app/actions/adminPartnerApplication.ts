"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { generateInviteCode } from "@/lib/partnerInviteCode";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schemas
const ApproveApplicationSchema = z.object({
  applicationId: z.string().uuid(),
  daysValid: z.coerce.number().min(1).max(90).default(7),
  adminNotes: z.string().optional(),
});

const RejectApplicationSchema = z.object({
  applicationId: z.string().uuid(),
  adminNotes: z.string().optional(),
});

const RegenerateCodeSchema = z.object({
  applicationId: z.string().uuid(),
  daysValid: z.coerce.number().min(1).max(90).default(7),
});

/**
 * Approves a partner application and generates an invite code
 */
export async function approvePartnerApplication(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate input
    const validatedFields = ApproveApplicationSchema.parse({
      applicationId: formData.get("applicationId"),
      daysValid: formData.get("daysValid") || 7,
      adminNotes: formData.get("adminNotes"),
    });

    const supabase = await createClient();

    // Get admin user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Get application details
    const { data: application, error: fetchError } = await supabase
      .from("partner_applications")
      .select("*")
      .eq("id", validatedFields.applicationId)
      .single();

    if (fetchError || !application) {
      return { success: false, error: "Application not found" };
    }

    if (application.status !== "pending") {
      return {
        success: false,
        error: "Application has already been reviewed",
      };
    }

    // Generate invite code
    const inviteCode = generateInviteCode(
      application.email,
      validatedFields.daysValid
    );

    // Calculate expiry timestamp
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validatedFields.daysValid);

    // Update application in database
    const { error: updateError } = await supabase
      .from("partner_applications")
      .update({
        status: "approved",
        invite_code: inviteCode,
        code_expires_at: expiryDate.toISOString(),
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        admin_notes: validatedFields.adminNotes || null,
      })
      .eq("id", validatedFields.applicationId);

    if (updateError) {
      console.error("Database update error:", updateError);
      return { success: false, error: "Failed to approve application" };
    }

    // Send approval email with invite code
    const emailSent = await sendApprovalEmail(
      application.name,
      application.email,
      inviteCode,
      expiryDate,
      validatedFields.daysValid
    );

    if (!emailSent) {
      console.error("Failed to send approval email");
      // Application is still approved, just log the email error
    }

    revalidatePath("/admin/partner-applications");
    revalidatePath(`/admin/partner-applications/${validatedFields.applicationId}`);

    return { success: true, inviteCode };
  } catch (error) {
    console.error("Error approving application:", error);

    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data" };
    }

    return { success: false, error: "Failed to approve application" };
  }
}

/**
 * Rejects a partner application
 */
export async function rejectPartnerApplication(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate input
    const validatedFields = RejectApplicationSchema.parse({
      applicationId: formData.get("applicationId"),
      adminNotes: formData.get("adminNotes"),
    });

    const supabase = await createClient();

    // Get admin user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Update application in database
    const { error: updateError } = await supabase
      .from("partner_applications")
      .update({
        status: "rejected",
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        admin_notes: validatedFields.adminNotes || null,
      })
      .eq("id", validatedFields.applicationId);

    if (updateError) {
      console.error("Database update error:", updateError);
      return { success: false, error: "Failed to reject application" };
    }

    revalidatePath("/admin/partner-applications");
    revalidatePath(`/admin/partner-applications/${validatedFields.applicationId}`);

    return { success: true };
  } catch (error) {
    console.error("Error rejecting application:", error);

    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data" };
    }

    return { success: false, error: "Failed to reject application" };
  }
}

/**
 * Resends the invite code email
 */
export async function resendInviteCode(applicationId: string) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createClient();

    // Get application details
    const { data: application, error: fetchError } = await supabase
      .from("partner_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      return { success: false, error: "Application not found" };
    }

    if (application.status !== "approved" || !application.invite_code) {
      return { success: false, error: "No invite code available to resend" };
    }

    const expiryDate = new Date(application.code_expires_at);
    const now = new Date();
    const daysValid = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Send email
    const emailSent = await sendApprovalEmail(
      application.name,
      application.email,
      application.invite_code,
      expiryDate,
      daysValid
    );

    if (!emailSent) {
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error resending invite code:", error);
    return { success: false, error: "Failed to resend invite code" };
  }
}

/**
 * Regenerates an invite code (if expired or needed)
 */
export async function regenerateInviteCode(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate input
    const validatedFields = RegenerateCodeSchema.parse({
      applicationId: formData.get("applicationId"),
      daysValid: formData.get("daysValid") || 7,
    });

    const supabase = await createClient();

    // Get application details
    const { data: application, error: fetchError } = await supabase
      .from("partner_applications")
      .select("*")
      .eq("id", validatedFields.applicationId)
      .single();

    if (fetchError || !application) {
      return { success: false, error: "Application not found" };
    }

    if (application.status !== "approved") {
      return {
        success: false,
        error: "Can only regenerate codes for approved applications",
      };
    }

    // Generate new invite code
    const inviteCode = generateInviteCode(
      application.email,
      validatedFields.daysValid
    );

    // Calculate new expiry timestamp
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validatedFields.daysValid);

    // Update database with new code
    const { error: updateError } = await supabase
      .from("partner_applications")
      .update({
        invite_code: inviteCode,
        code_expires_at: expiryDate.toISOString(),
      })
      .eq("id", validatedFields.applicationId);

    if (updateError) {
      console.error("Database update error:", updateError);
      return { success: false, error: "Failed to regenerate code" };
    }

    // Send email with new code
    const emailSent = await sendApprovalEmail(
      application.name,
      application.email,
      inviteCode,
      expiryDate,
      validatedFields.daysValid
    );

    if (!emailSent) {
      console.error("Failed to send email with new code");
    }

    revalidatePath(`/admin/partner-applications/${validatedFields.applicationId}`);

    return { success: true, inviteCode };
  } catch (error) {
    console.error("Error regenerating invite code:", error);

    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input data" };
    }

    return { success: false, error: "Failed to regenerate invite code" };
  }
}

/**
 * Adds admin notes to an application
 */
export async function addApplicationNote(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return { success: false, error: "Unauthorized" };
    }

    const applicationId = formData.get("applicationId") as string;
    const note = formData.get("note") as string;

    if (!applicationId || !note) {
      return { success: false, error: "Missing required fields" };
    }

    const supabase = await createClient();

    // Get existing notes
    const { data: application } = await supabase
      .from("partner_applications")
      .select("admin_notes")
      .eq("id", applicationId)
      .single();

    // Append new note with timestamp
    const timestamp = new Date().toISOString();
    const newNote = `[${timestamp}] ${note}`;
    const updatedNotes = application?.admin_notes
      ? `${application.admin_notes}\n\n${newNote}`
      : newNote;

    // Update database
    const { error: updateError } = await supabase
      .from("partner_applications")
      .update({ admin_notes: updatedNotes })
      .eq("id", applicationId);

    if (updateError) {
      console.error("Database update error:", updateError);
      return { success: false, error: "Failed to add note" };
    }

    revalidatePath(`/admin/partner-applications/${applicationId}`);

    return { success: true };
  } catch (error) {
    console.error("Error adding note:", error);
    return { success: false, error: "Failed to add note" };
  }
}

/**
 * Helper function to send approval email with invite code
 */
async function sendApprovalEmail(
  name: string,
  email: string,
  inviteCode: string,
  expiryDate: Date,
  daysValid: number
): Promise<boolean> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pasuhealth.com";
    const formattedExpiry = expiryDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #065f46;">Welcome to the PASU Health Partner Program!</h1>

        <p>Hi ${name},</p>

        <p>Great news! Your application to become a PASU Health partner has been <strong>approved</strong>.</p>

        <h2 style="color: #065f46;">Your Invite Code</h2>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #059669;">
          <p style="font-size: 28px; font-weight: bold; color: #065f46; margin: 0; letter-spacing: 2px;">
            ${inviteCode}
          </p>
        </div>

        <p><strong>This code expires on:</strong> ${formattedExpiry}</p>

        <h2 style="color: #065f46;">Next Steps</h2>

        <ol style="line-height: 1.8;">
          <li>Visit: <a href="${siteUrl}/partners/sign-up" style="color: #059669;">${siteUrl}/partners/sign-up</a></li>
          <li>Enter your email address: <strong>${email}</strong></li>
          <li>Enter your invite code shown above</li>
          <li>Complete your account setup</li>
        </ol>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 0;"><strong>Important:</strong> This invite code is unique to your email address and cannot be shared. It will expire in ${daysValid} day${daysValid !== 1 ? "s" : ""}.</p>
        </div>

        <p>Once you've created your account, you'll be able to:</p>
        <ul style="line-height: 1.8;">
          <li>Submit training orders for your clients</li>
          <li>Earn 15% commission on all completed orders</li>
          <li>Track order status and commissions</li>
          <li>Access our full course catalog and pricing</li>
        </ul>

        <p>If you have any questions, please contact us at <a href="mailto:contact@pasuhealth.com" style="color: #059669;">contact@pasuhealth.com</a></p>

        <p style="margin-top: 30px;">Welcome aboard!<br><strong>The PASU Health Team</strong></p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

        <p style="font-size: 12px; color: #6b7280;">
          PASU Health - Workplace Mental Health and Wellbeing<br>
          <a href="${siteUrl}" style="color: #059669;">pasuhealth.com</a>
        </p>
      </div>
    `;

    const textContent = `
Welcome to the PASU Health Partner Program!

Hi ${name},

Great news! Your application to become a PASU Health partner has been approved.

YOUR INVITE CODE
${inviteCode}

This code expires on: ${formattedExpiry}

NEXT STEPS
1. Visit: ${siteUrl}/partners/sign-up
2. Enter your email address: ${email}
3. Enter your invite code shown above
4. Complete your account setup

IMPORTANT: This invite code is unique to your email address and cannot be shared. It will expire in ${daysValid} day${daysValid !== 1 ? "s" : ""}.

Once you've created your account, you'll be able to:
- Submit training orders for your clients
- Earn 15% commission on all completed orders
- Track order status and commissions
- Access our full course catalog and pricing

If you have any questions, please contact us at contact@pasuhealth.com

Welcome aboard!
The PASU Health Team

PASU Health - Workplace Mental Health and Wellbeing
${siteUrl}
    `;

    const response = await resend.emails.send({
      from: "PASU Health <contact@pasuhealth.com>",
      to: email,
      subject: "Welcome to PASU Health Partner Program - Your Invite Code",
      text: textContent,
      html: htmlContent,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending approval email:", error);
    return false;
  }
}
