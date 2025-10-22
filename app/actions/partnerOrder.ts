"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema
const PartnerOrderSchema = z.object({
  partnerId: z.string().min(1, { message: "Partner ID is required" }),
  courseSlug: z.string().min(1, { message: "Course selection is required" }),
  courseTitle: z.string().min(1, { message: "Course title is required" }),
  participantCount: z.coerce
    .number()
    .min(1, { message: "At least 1 participant is required" }),
  organisationName: z
    .string()
    .min(1, { message: "organisation name is required" }),
  contactFirstName: z
    .string()
    .min(1, { message: "Contact first name is required" }),
  contactLastName: z
    .string()
    .min(1, { message: "Contact last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  preferredStartDate: z.string().min(1, { message: "Start date is required" }),
  specialRequirements: z.string().optional(),
  sessionsNeeded: z.coerce.number(),
  pricePerSession: z.coerce.number(),
  totalPrice: z.coerce.number(),
  partnerCommission: z.coerce.number(),
});

export async function submitPartnerOrder(formData: FormData) {
  try {
    // Extract all form data
    const dataForValidation: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      dataForValidation[key] = value;
    }

    // Validate form data
    const validatedFields = PartnerOrderSchema.parse(dataForValidation);

    // Initialize Supabase client
    const supabase = await createClient();

    // Get partner details
    const { data: partner } = await supabase
      .from("partners")
      .select("first_name, last_name, email")
      .eq("user_id", validatedFields.partnerId)
      .single();

    // Save order to Supabase
    const { data: order, error: dbError } = await supabase
      .from("partner_orders")
      .insert({
        partner_id: validatedFields.partnerId,
        course_slug: validatedFields.courseSlug,
        course_title: validatedFields.courseTitle,
        customer_organisation: validatedFields.organisationName,
        customer_first_name: validatedFields.contactFirstName,
        customer_last_name: validatedFields.contactLastName,
        customer_email: validatedFields.email,
        customer_phone: validatedFields.phone,
        customer_job_title: validatedFields.jobTitle,
        participant_count: validatedFields.participantCount,
        sessions_needed: validatedFields.sessionsNeeded,
        price_per_session: validatedFields.pricePerSession,
        total_price: validatedFields.totalPrice,
        partner_commission: validatedFields.partnerCommission,
        preferred_start_date: validatedFields.preferredStartDate,
        special_requirements: validatedFields.specialRequirements || null,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return {
        success: false,
        error: "Failed to save order. Please try again.",
      };
    }

    // Prepare email content for admin
    const adminHtmlContent = `
      <h1>New Partner Training Order</h1>

      <h2>Partner Details</h2>
      <p><strong>Partner:</strong> ${partner?.first_name || ""} ${partner?.last_name || ""}</p>
      <p><strong>Partner Email:</strong> ${partner?.email || "N/A"}</p>

      <h2>Training Details</h2>
      <p><strong>Course:</strong> ${validatedFields.courseTitle}</p>
      <p><strong>Number of Participants:</strong> ${validatedFields.participantCount}</p>
      <p><strong>Sessions Needed:</strong> ${validatedFields.sessionsNeeded}</p>
      <p><strong>Price per Session:</strong> £${validatedFields.pricePerSession.toFixed(2)}</p>
      <p><strong>Total Price:</strong> £${validatedFields.totalPrice.toFixed(2)}</p>
      <p><strong>Partner Commission (15%):</strong> £${validatedFields.partnerCommission.toFixed(2)}</p>
      <p><strong>Preferred Start Date:</strong> ${validatedFields.preferredStartDate}</p>

      <h2>Customer Details</h2>
      <p><strong>organisation:</strong> ${validatedFields.organisationName}</p>
      <p><strong>Contact Name:</strong> ${validatedFields.contactFirstName} ${validatedFields.contactLastName}</p>
      <p><strong>Email:</strong> ${validatedFields.email}</p>
      <p><strong>Phone:</strong> ${validatedFields.phone}</p>
      <p><strong>Job Title:</strong> ${validatedFields.jobTitle}</p>

      ${
        validatedFields.specialRequirements
          ? `<h2>Special Requirements</h2>
      <p>${validatedFields.specialRequirements}</p>`
          : ""
      }

      <p><em>Order ID: ${order.id}</em></p>
    `;

    const adminTextContent = `
      New Partner Training Order

      PARTNER DETAILS
      Partner: ${partner?.first_name || ""} ${partner?.last_name || ""}
      Partner Email: ${partner?.email || "N/A"}

      TRAINING DETAILS
      Course: ${validatedFields.courseTitle}
      Number of Participants: ${validatedFields.participantCount}
      Sessions Needed: ${validatedFields.sessionsNeeded}
      Price per Session: £${validatedFields.pricePerSession.toFixed(2)}
      Total Price: £${validatedFields.totalPrice.toFixed(2)}
      Partner Commission (15%): £${validatedFields.partnerCommission.toFixed(2)}
      Preferred Start Date: ${validatedFields.preferredStartDate}

      CUSTOMER DETAILS
      organisation: ${validatedFields.organisationName}
      Contact Name: ${validatedFields.contactFirstName} ${validatedFields.contactLastName}
      Email: ${validatedFields.email}
      Phone: ${validatedFields.phone}
      Job Title: ${validatedFields.jobTitle}

      ${
        validatedFields.specialRequirements
          ? `SPECIAL REQUIREMENTS\n${validatedFields.specialRequirements}\n\n`
          : ""
      }
      Order ID: ${order.id}
    `;

    // Send email to admin
    const adminResponse = await resend.emails.send({
      from: "Partner Orders <orders@pasuhealth.com>",
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Partner Training Order - ${validatedFields.courseTitle}`,
      text: adminTextContent,
      html: adminHtmlContent,
    });

    if (adminResponse.error) {
      console.error("Admin email error:", adminResponse.error);
    }

    // Prepare email content for partner
    const partnerHtmlContent = `
      <h1>Order Submission Confirmed</h1>

      <p>Thank you for submitting a training order. We've received your order details and will review it shortly.</p>

      <h2>Order Summary</h2>
      <p><strong>Course:</strong> ${validatedFields.courseTitle}</p>
      <p><strong>Participants:</strong> ${validatedFields.participantCount}</p>
      <p><strong>Sessions:</strong> ${validatedFields.sessionsNeeded}</p>
      <p><strong>Total Price:</strong> £${validatedFields.totalPrice.toFixed(2)}</p>
      <p><strong>Your Commission:</strong> £${validatedFields.partnerCommission.toFixed(2)}</p>

      <h2>Customer</h2>
      <p><strong>organisation:</strong> ${validatedFields.organisationName}</p>
      <p><strong>Contact:</strong> ${validatedFields.contactFirstName} ${validatedFields.contactLastName}</p>

      <p>We'll be in touch soon to confirm the details.</p>

      <p><em>Order Reference: ${order.id}</em></p>
    `;

    // Send confirmation email to partner
    if (partner?.email) {
      await resend.emails.send({
        from: "PASU Health <orders@pasuhealth.com>",
        to: partner.email,
        subject: "Training Order Submitted",
        html: partnerHtmlContent,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Partner order error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.errors);
      return {
        success: false,
        error: "Please check your form entries and try again",
      };
    }

    return {
      success: false,
      error: "Failed to submit order. Please try again.",
    };
  }
}
