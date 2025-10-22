"use server";

import { z } from "zod";
import { Resend } from "resend";

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

    // Send email with Resend
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
      return { success: false, error: response.error.message };
    }

    // Return success
    return { success: true };
  } catch (error) {
    // Log the actual error for debugging
    console.error("Partner application form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please check your form entries and try again",
      };
    }

    // Handle other errors
    return {
      success: false,
      error: "Failed to send application. Please try again.",
    };
  }
}
