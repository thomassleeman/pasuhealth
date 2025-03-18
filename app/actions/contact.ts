"use server";

import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" }),
});

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = ContactFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    // Send email with Resend
    const response = await resend.emails.send({
      from: "Contact Form <contact@pasuhealth.com>",
      to: process.env.CONTACT_EMAIL as string,
      subject: "New Contact Form Submission",
      text: `
        Name: ${validatedFields.name}
        Email: ${validatedFields.email}
        Message: ${validatedFields.message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${validatedFields.name}</p>
        <p><strong>Email:</strong> ${validatedFields.email}</p>
        <p><strong>Message:</strong> ${validatedFields.message}</p>
      `,
    });

    // Check for error in the response
    if (response.error) {
      console.error("Resend error:", response.error);
      return { success: false, error: response.error.message };
    }

    // Return success instead of redirecting
    return { success: true };
  } catch (error) {
    // Log the actual error for debugging
    console.error("Contact form error:", error);

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
      error: "Failed to send message. Please try again.",
    };
  }
}
