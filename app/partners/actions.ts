"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

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
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    return {
      error: "All fields are required",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    // Log detailed error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Signup error:", error);
    }

    return {
      error: error.message,
    };
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
