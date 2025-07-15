"use server";

import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const CallbackRequestSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  organisation: z.string().min(1, { message: "Organisation is required" }),
  telephone: z.string().min(1, { message: "Telephone number is required" }),
});

export async function submitCallbackRequest(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = CallbackRequestSchema.parse({
      name: formData.get("name"),
      organisation: formData.get("organisation"),
      telephone: formData.get("telephone"),
    });

    // Prepare email content
    const htmlContent = `
      <h1>New Callback Request</h1>
      
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${validatedFields.name}</p>
      <p><strong>Organisation:</strong> ${validatedFields.organisation}</p>
      <p><strong>Telephone:</strong> ${validatedFields.telephone}</p>
      
      <p><em>Please contact this person as soon as possible to arrange a callback.</em></p>
    `;

    const textContent = `
      New Callback Request
      
      CONTACT DETAILS
      Name: ${validatedFields.name}
      Organisation: ${validatedFields.organisation}
      Telephone: ${validatedFields.telephone}
      
      Please contact this person as soon as possible.
    `;

    // Send email with Resend
    const response = await resend.emails.send({
      from: "Callback Request <contact@pasuhealth.com>",
      to:
        (process.env.TRAINING_EMAIL as string) ||
        (process.env.CONTACT_EMAIL as string), // Fallback to contact email if training email not set
      subject: "New Callback Request",
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
    console.error("Callback request error:", error);

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
      error: "Failed to send request. Please try again.",
    };
  }
}
