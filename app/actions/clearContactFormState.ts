// app/actions/clearFormState.ts
"use server";

import { cookies } from "next/headers";

export async function clearFormState() {
  const cookieStore = await cookies();
  cookieStore.delete("formState");
}
