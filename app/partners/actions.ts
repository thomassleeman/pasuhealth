"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { validateInviteCode } from "@/lib/partnerInviteCode";

export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Login error:", error);
    }

    return {
      error: error.message,
    };
  }

  // Check if user is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.email) {
    const { data: admin } = await supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .single();

    // Redirect admins to /admin, others to /partners/dashboard
    revalidatePath("/", "layout");
    if (admin) {
      redirect("/admin");
    }
  }

  revalidatePath("/", "layout");
  redirect("/partners/dashboard");
}

export async function signup(
  prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const inviteCode = formData.get("invite_code") as string;

  // Basic validation
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return {
      error: "All fields are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters long",
    };
  }

  if (!inviteCode) {
    return {
      error: "Invite code is required",
    };
  }

  // Validate invite code cryptographically
  const codeValidation = validateInviteCode(inviteCode, email);
  if (!codeValidation.valid) {
    // Log validation failure details in development
    if (process.env.NODE_ENV === "development") {
      console.error("Invite code validation failed:", {
        inviteCode,
        email,
        error: codeValidation.error,
      });
    }
    return {
      error: codeValidation.error || "Invalid invite code",
    };
  }

  // Check invite code against database
  const { data: application, error: dbError } = await supabase
    .from("partner_applications")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .eq("status", "approved")
    .single();

  if (dbError || !application) {
    return {
      error: "Invalid invite code or application not found",
    };
  }

  // Verify the invite code matches (normalize both codes by removing PASU- and dashes)
  const normalizeCode = (code: string) =>
    code.replace(/PASU-/gi, "").replace(/-/g, "").toUpperCase();

  if (normalizeCode(application.invite_code) !== normalizeCode(inviteCode)) {
    return {
      error: "Invalid invite code",
    };
  }

  // Check if code has expired (database check)
  if (application.code_expires_at) {
    const expiryDate = new Date(application.code_expires_at);
    const now = new Date();
    if (now > expiryDate) {
      return {
        error: "This invite code has expired. Please contact PASU Health for a new code",
      };
    }
  }

  // Check if code has already been used
  if (application.code_used_at) {
    return {
      error: "This invite code has already been used",
    };
  }

  // Construct the redirect URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const emailRedirectTo = siteUrl
    ? `${siteUrl}/auth/callback?next=/partners/dashboard`
    : undefined;

  // Log the configuration in development
  if (process.env.NODE_ENV === "development") {
    console.log("Signup configuration:", {
      email,
      siteUrl,
      emailRedirectTo,
      hasPassword: !!password,
    });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Signup error:", {
        message: error.message,
        status: error.status,
        name: error.name,
        emailRedirectTo,
        siteUrl,
      });
    }

    return {
      error: error.message,
    };
  }

  // Mark invite code as used
  const { error: updateError } = await supabase
    .from("partner_applications")
    .update({
      code_used_at: new Date().toISOString(),
    })
    .eq("id", application.id);

  if (updateError) {
    console.error("Failed to mark invite code as used:", updateError);
    // Don't fail the signup if we can't update the application
    // The user account has been created successfully
  }

  // Redirect to a confirmation page instead of partners dashboard
  revalidatePath("/", "layout");
  redirect("/partners/verify-email");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("partners/error");
  }

  revalidatePath("/", "layout");
  redirect("/partners/login");
}

export async function forgotPassword(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  // Basic validation
  if (!email) {
    return {
      error: "Email is required",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/partners/reset-password`,
  });

  if (error) {
    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Password reset error:", error);
    }

    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function resetPassword(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Basic validation
  if (!password || !confirmPassword) {
    return {
      error: "Both password fields are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters long",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Password update error:", error);
    }

    return {
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect("/partners/login");
}
