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
