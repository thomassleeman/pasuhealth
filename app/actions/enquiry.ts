"use server";

import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const TrainingEnquirySchema = z.object({
  // Organisation details
  organisation: z.string().min(1, { message: "Organisation is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  // sector: z.string().min(1, { message: "Sector is required" }),
  industry: z.string().optional(),
  employeeCount: z
    .string()
    .min(1, { message: "Number of employees is required" }),
  // locationCount: z.string().optional(),
  hearAboutUs: z.string(),
  // .min(1, { message: "Please tell us how you heard about us" }),
  // hasSpecificBudget: z.boolean().optional(),
  // isBudgetHolder: z.boolean().optional(),
  contactPreference: z.string().optional(),

  // Enquiry
  services: z.string().optional(),
  requirements: z.string().optional(),

  // Preferences
  contactVia: z.array(z.string()).optional().or(z.string().optional()),

  // Personal details
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
});

export async function submitEnquiryForm(formData: FormData) {
  try {
    // Get contactVia entries and convert to string array
    const contactViaEntries = formData
      .getAll("contactVia")
      .map((value) => value.toString());

    // Define a type for our validation data
    type ValidationData = {
      organisation?: string;
      postcode?: string;
      sector?: string;
      industry?: string;
      employeeCount?: string;
      locationCount?: string;
      hearAboutUs?: string;
      hasSpecificBudget?: boolean;
      isBudgetHolder?: boolean;
      contactPreference?: string;
      services?: string;
      requirements?: string;
      contactVia?: string[];
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      email?: string;
      phone?: string;
      [key: string]: string | boolean | string[] | undefined;
    };

    // Prepare data for validation
    const dataForValidation: ValidationData = {};

    // Add all form fields to the validation object
    for (const [key, value] of formData.entries()) {
      if (key === "contactVia") continue; // Skip contactVia as we handle it separately

      // Convert 'true' and 'false' strings to booleans for specific fields
      if (key === "hasSpecificBudget" || key === "isBudgetHolder") {
        dataForValidation[key] = value === "true";
      } else {
        dataForValidation[key] = value.toString();
      }
    }

    // Add contactVia as a string array
    dataForValidation.contactVia = contactViaEntries;

    // Validate form data
    const validatedFields = TrainingEnquirySchema.parse(dataForValidation);

    // Prepare email content
    const htmlContent = `
      <h1>New Enquiry Submission</h1>
      
      <h2>Organisation Details</h2>
      <p><strong>Organisation:</strong> ${validatedFields.organisation}</p>
      <p><strong>Workplace Postcode:</strong> ${validatedFields.postcode}</p>
      <p><strong>Industry:</strong> ${validatedFields.industry}</p>
      <p><strong>Total UK Employees:</strong> ${validatedFields.employeeCount}</p>
      <p><strong>How they heard about us:</strong> ${validatedFields.hearAboutUs}</p>
      <p><strong>Contact preference:</strong> ${validatedFields.contactPreference || "Not specified"}</p>
      
      <h2>Enquiry Details</h2>
      <p><strong>Training or consultancy?:</strong> ${validatedFields.services || "Not specified"}</p>
      <p><strong>Requirement details:</strong> ${validatedFields.requirements || "Not specified"}</p>
      
      <h2>Personal Details</h2>
      <p><strong>Name:</strong> ${validatedFields.firstName} ${validatedFields.lastName}</p>
      <p><strong>Job Title:</strong> ${validatedFields.jobTitle}</p>
      <p><strong>Email:</strong> ${validatedFields.email}</p>
      <p><strong>Phone:</strong> ${validatedFields.phone || "Not provided"}</p>
    `;

    const textContent = `
      New Enquiry Submission
      
      ORGANISATION DETAILS
      Organisation: ${validatedFields.organisation}
      Workplace Postcode: ${validatedFields.postcode}
      Industry: ${validatedFields.industry}
      Total UK Employees: ${validatedFields.employeeCount}
      How they heard about us: ${validatedFields.hearAboutUs}
      Contact preference: ${validatedFields.contactPreference || "Not specified"}
      
      ENQUIRY DETAILS
      Training or consultancy?: ${validatedFields.services || "Not specified"}
      Requirement details: ${validatedFields.requirements || "Not specified"}
      
      PERSONAL DETAILS
      Name: ${validatedFields.firstName} ${validatedFields.lastName}
      Job Title: ${validatedFields.jobTitle}
      Email: ${validatedFields.email}
      Phone: ${validatedFields.phone || "Not provided"}
    `;

    // Send email with Resend
    const response = await resend.emails.send({
      from: "Pasuhealth.com Enquiry <contactpage@pasuhealth.com>",
      to: process.env.CONTACT_EMAIL as string,
      subject: "New Contact Page Submission",
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
    console.error("Training enquiry form error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.errors);
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
