"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/adminAuth";
import { type OrderStatus } from "@/types/partnerOrder";
import { revalidatePath } from "next/cache";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schemas
const UpdateStatusSchema = z.object({
  orderId: z.string().uuid(),
  newStatus: z.enum(["pending", "approved", "completed", "paid", "cancelled"]),
  sendNotification: z.boolean().default(true),
});

const UpdateOrderDetailsSchema = z.object({
  orderId: z.string().uuid(),
  customerorganisation: z.string().optional(),
  customerFirstName: z.string().optional(),
  customerLastName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  customerJobTitle: z.string().optional(),
  participantCount: z.number().optional(),
  preferredStartDate: z.string().optional(),
  specialRequirements: z.string().optional(),
});

const AddAdminNoteSchema = z.object({
  orderId: z.string().uuid(),
  note: z.string().min(1),
});

/**
 * Update order status with validation and email notification
 */
export async function updateOrderStatus(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return {
        success: false,
        error: "Unauthorized: Admin access required",
      };
    }

    // Validate input
    const validatedFields = UpdateStatusSchema.parse({
      orderId: formData.get("orderId"),
      newStatus: formData.get("newStatus"),
      sendNotification: formData.get("sendNotification") === "true",
    });

    const supabase = await createClient();

    // Get current order
    const { data: order, error: fetchError } = await supabase
      .from("partner_orders")
      .select("*, partners!inner(first_name, last_name, email)")
      .eq("id", validatedFields.orderId)
      .single();

    if (fetchError || !order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    // Update status history
    const statusHistory = order.status_history || [];
    statusHistory.push({
      status: validatedFields.newStatus,
      timestamp: new Date().toISOString(),
    });

    // Update order
    const { error: updateError } = await supabase
      .from("partner_orders")
      .update({
        status: validatedFields.newStatus,
        status_history: statusHistory,
      })
      .eq("id", validatedFields.orderId);

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        error: "Failed to update order status",
      };
    }

    // Send email notification to partner if requested
    if (validatedFields.sendNotification && order.partners?.email) {
      await sendStatusUpdateEmail(
        order,
        validatedFields.newStatus as OrderStatus
      );
    }

    revalidatePath("/admin/partner-orders");
    revalidatePath("/partners/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Update status error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
      };
    }

    return {
      success: false,
      error: "Failed to update order status",
    };
  }
}

/**
 * Update order details
 */
export async function updateOrderDetails(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return {
        success: false,
        error: "Unauthorized: Admin access required",
      };
    }

    const dataForValidation: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (value !== "") {
        dataForValidation[key] = value;
      }
    }

    // Validate input
    const validatedFields = UpdateOrderDetailsSchema.parse(dataForValidation);

    const supabase = await createClient();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (validatedFields.customerorganisation)
      updateData.customer_organisation = validatedFields.customerorganisation;
    if (validatedFields.customerFirstName)
      updateData.customer_first_name = validatedFields.customerFirstName;
    if (validatedFields.customerLastName)
      updateData.customer_last_name = validatedFields.customerLastName;
    if (validatedFields.customerEmail)
      updateData.customer_email = validatedFields.customerEmail;
    if (validatedFields.customerPhone)
      updateData.customer_phone = validatedFields.customerPhone;
    if (validatedFields.customerJobTitle)
      updateData.customer_job_title = validatedFields.customerJobTitle;
    if (validatedFields.participantCount)
      updateData.participant_count = validatedFields.participantCount;
    if (validatedFields.preferredStartDate)
      updateData.preferred_start_date = validatedFields.preferredStartDate;
    if (validatedFields.specialRequirements !== undefined)
      updateData.special_requirements = validatedFields.specialRequirements;

    // Update order
    const { error: updateError } = await supabase
      .from("partner_orders")
      .update(updateData)
      .eq("id", validatedFields.orderId);

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        error: "Failed to update order details",
      };
    }

    revalidatePath(`/admin/partner-orders/${validatedFields.orderId}`);
    revalidatePath("/partners/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Update details error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
      };
    }

    return {
      success: false,
      error: "Failed to update order details",
    };
  }
}

/**
 * Add admin note to order
 */
export async function addAdminNote(formData: FormData) {
  try {
    // Check admin authorization
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return {
        success: false,
        error: "Unauthorized: Admin access required",
      };
    }

    // Validate input
    const validatedFields = AddAdminNoteSchema.parse({
      orderId: formData.get("orderId"),
      note: formData.get("note"),
    });

    const supabase = await createClient();

    // Get current notes
    const { data: order, error: fetchError } = await supabase
      .from("partner_orders")
      .select("admin_notes")
      .eq("id", validatedFields.orderId)
      .single();

    if (fetchError || !order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    // Append new note with timestamp
    const timestamp = new Date().toISOString();
    const newNote = `[${new Date(timestamp).toLocaleString("en-GB")}]\n${validatedFields.note}`;
    const updatedNotes = order.admin_notes
      ? `${order.admin_notes}\n\n${newNote}`
      : newNote;

    // Update order
    const { error: updateError } = await supabase
      .from("partner_orders")
      .update({ admin_notes: updatedNotes })
      .eq("id", validatedFields.orderId);

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        error: "Failed to add note",
      };
    }

    revalidatePath(`/admin/partner-orders/${validatedFields.orderId}`);

    return { success: true };
  } catch (error) {
    console.error("Add note error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
      };
    }

    return {
      success: false,
      error: "Failed to add note",
    };
  }
}

/**
 * Send status update email to partner
 */
async function sendStatusUpdateEmail(order: any, newStatus: OrderStatus) {
  const partner = order.partners;

  if (!partner?.email) {
    return;
  }

  const statusMessages = {
    approved: {
      subject: "Order Approved - Work Confirmed",
      message: `Great news! We've confirmed your training order with ${order.customer_organisation}.`,
      details: "We'll be in touch soon to coordinate the training delivery.",
    },
    completed: {
      subject: "Training Completed - Payment Received",
      message: `The training for ${order.customer_organisation} has been successfully delivered and payment has been received from the client.`,
      details:
        "Your commission will be processed and paid out according to our payment schedule.",
    },
    paid: {
      subject: "Commission Paid",
      message: `Your commission of £${order.partner_commission.toFixed(2)} for the ${order.course_title} training with ${order.customer_organisation} has been paid.`,
      details: "Thank you for your partnership!",
    },
    cancelled: {
      subject: "Order Cancelled",
      message: `The training order for ${order.customer_organisation} has been cancelled.`,
      details:
        "If you have any questions about this cancellation, please contact us.",
    },
    pending: {
      subject: "Order Status Update",
      message: `Your order status has been updated to pending.`,
      details: "",
    },
  };

  const statusInfo = statusMessages[newStatus];

  const htmlContent = `
    <h1>${statusInfo.subject}</h1>

    <p>${statusInfo.message}</p>

    ${statusInfo.details ? `<p>${statusInfo.details}</p>` : ""}

    <h2>Order Details</h2>
    <p><strong>Course:</strong> ${order.course_title}</p>
    <p><strong>organisation:</strong> ${order.customer_organisation}</p>
    <p><strong>Participants:</strong> ${order.participant_count}</p>
    <p><strong>Total Price:</strong> £${order.total_price.toFixed(2)}</p>
    <p><strong>Your Commission:</strong> £${order.partner_commission.toFixed(2)}</p>

    <p><em>Order Reference: ${order.id}</em></p>

    <p>View your orders at your <a href="https://pasuhealth.com/partners/dashboard">partner dashboard</a>.</p>
  `;

  try {
    await resend.emails.send({
      from: "PASU Health <orders@pasuhealth.com>",
      to: partner.email,
      subject: `Partner Order Update: ${statusInfo.subject}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}
