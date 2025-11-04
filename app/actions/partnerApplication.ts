"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const PartnerApplicationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  companyName: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing what you do" }),
});

export async function submitPartnerApplication(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = PartnerApplicationSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      companyName: formData.get("companyName"),
      description: formData.get("description"),
    });

    const supabase = await createClient();

    // Check if email already has an existing partner account
    const { data: existingUser, error: userCheckError } = await supabase.rpc(
      'check_email_exists',
      { email_to_check: validatedFields.email }
    );

    if (userCheckError) {
      console.error("Error checking for existing user:", userCheckError);
      // Continue with application even if check fails - better than blocking legitimate users
    } else if (existingUser) {
      return {
        success: false,
        error: "An account with this email address already exists. Please log in to your partner account.",
      };
    }

    // Check if there's already a pending or approved application with this email
    const { data: existingApplication, error: appCheckError } = await supabase
      .from("partner_applications")
      .select("id, status")
      .eq("email", validatedFields.email)
      .in("status", ["pending", "approved"])
      .maybeSingle();

    if (appCheckError && appCheckError.code !== "PGRST116") {
      console.error("Error checking for existing application:", appCheckError);
      return {
        success: false,
        error: "Failed to process application. Please try again.",
      };
    }

    if (existingApplication) {
      if (existingApplication.status === "pending") {
        return {
          success: false,
          error: "You already have a pending application. Please wait for admin review.",
        };
      } else if (existingApplication.status === "approved") {
        return {
          success: false,
          error: "Your application has been approved. Please check your email for the invite code to create your account.",
        };
      }
    }

    // Prepare email content
    const htmlContent = `
      <h1>New Partner Application</h1>

      <h2>Applicant Details</h2>
      <p><strong>Name:</strong> ${validatedFields.name}</p>
      <p><strong>Email:</strong> ${validatedFields.email}</p>
      <p><strong>Phone:</strong> ${validatedFields.phone}</p>
      <p><strong>Company Name:</strong> ${validatedFields.companyName || "Not provided"}</p>

      <h2>Description</h2>
      <p>${validatedFields.description}</p>
    `;

    const textContent = `
      New Partner Application

      APPLICANT DETAILS
      Name: ${validatedFields.name}
      Email: ${validatedFields.email}
      Phone: ${validatedFields.phone}
      Company Name: ${validatedFields.companyName || "Not provided"}

      DESCRIPTION
      ${validatedFields.description}
    `;

    // Save application to database
    const { data: application, error: dbError } = await supabase
      .from("partner_applications")
      .insert({
        name: validatedFields.name,
        email: validatedFields.email,
        phone: validatedFields.phone,
        company_name: validatedFields.companyName || null,
        description: validatedFields.description,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return {
        success: false,
        error: "Failed to save application. Please try again.",
      };
    }

    // Send email notification with Resend
    const response = await resend.emails.send({
      from: "Partner Application <contact@pasuhealth.com>",
      to: process.env.CONTACT_EMAIL as string,
      subject: "New Partner Application Submission",
      text: textContent,
      html: htmlContent,
    });

    // Check for error in the response
    if (response.error) {
      console.error("Resend error:", response.error);
      // Application is saved, so we still return success but log the email error
      console.error(
        "Application saved but email notification failed:",
        response.error
      );
    }

    // Return success with application ID
    return { success: true, applicationId: application.id };
  } catch (error) {
    // Log the actual error for debugging
    console.error("Partner application form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      // Get the first validation error message
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    // Handle other errors
    return {
      success: false,
      error: "Failed to send application. Please try again.",
    };
  }
}
