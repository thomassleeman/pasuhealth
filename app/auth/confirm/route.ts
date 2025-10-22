import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/partners/dashboard";

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && data.user) {
      // Create partner record after email confirmation
      const { error: partnerError } = await supabase.from("partners").insert({
        user_id: data.user.id,
        email: data.user.email,
        first_name: data.user.user_metadata.first_name,
        last_name: data.user.user_metadata.last_name,
      });

      if (partnerError) {
        // Log error but don't block the user
        if (process.env.NODE_ENV === "development") {
          console.error("Error creating partner record:", partnerError);
        }
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/partners/error");
}
