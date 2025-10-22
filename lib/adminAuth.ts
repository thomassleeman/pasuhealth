import { createClient } from "@/utils/supabase/server";

/**
 * Check if the current user is an admin
 * Admins are identified by their email in the admins table
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || !user.email) {
      return false;
    }

    // Check if user's email is in admins table
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .single();

    if (adminError || !admin) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Admin check error:", error);
    return false;
  }
}

/**
 * Get admin user info if the current user is an admin
 * Returns null if not an admin
 */
export async function getAdminUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get admin user error:", error);
    return null;
  }
}
