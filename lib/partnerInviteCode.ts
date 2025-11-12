import { createHmac, timingSafeEqual } from "crypto";
import type { InviteCodeValidation } from "@/types/partnerApplication";

/**
 * Partner Invite Code Utility
 *
 * Generates and validates cryptographically-signed, time-limited invite codes
 * that are bound to a specific email address.
 *
 * Format: PASU-{base64url payload}::{base64url signature}
 * Payload contains: email|expiryTimestamp
 */

/**
 * Type guard to ensure environment variable is defined
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

const SECRET = assertValue(
  process.env.PARTNER_INVITE_SECRET,
  "PARTNER_INVITE_SECRET environment variable is not set"
);

/**
 * Generates a time-limited invite code for a specific email address
 *
 * @param email - The email address this code is bound to
 * @param daysValid - Number of days until the code expires (default: 7)
 * @returns Formatted invite code string (e.g., "PASU-XXX::YYY")
 */
export function generateInviteCode(
  email: string,
  daysValid: number = 7
): string {
  // Calculate expiry timestamp
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + daysValid);
  const expiryTimestamp = expiryDate.getTime();

  // Create payload: email|timestamp
  const payload = `${email.toLowerCase().trim()}|${expiryTimestamp}`;

  // Generate HMAC signature
  const hmac = createHmac("sha256", SECRET);
  hmac.update(payload);
  const signature = hmac.digest("base64url");

  // Combine payload and signature
  const encodedPayload = Buffer.from(payload).toString("base64url");

  // Format: PASU-{payload}::{signature}
  const formatted = `PASU-${encodedPayload}::${signature}`;

  return formatted;
}

/**
 * Validates an invite code and checks if it matches the provided email
 *
 * @param code - The invite code to validate (with or without PASU- prefix)
 * @param providedEmail - The email address attempting to use this code
 * @returns Validation result with success/error information
 */
export function validateInviteCode(
  code: string,
  providedEmail: string
): InviteCodeValidation {
  try {
    // Remove PASU- prefix if present
    const cleanCode = code.replace(/^PASU-/i, "").trim();

    // Split into payload and signature using :: delimiter
    const parts = cleanCode.split("::");
    if (parts.length !== 2) {
      return {
        valid: false,
        error: "Invalid invite code format",
      };
    }

    const [encodedPayload, providedSignature] = parts;

    // Decode payload
    let payload: string;
    try {
      payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    } catch {
      return {
        valid: false,
        error: "Invalid invite code format",
      };
    }

    const [embeddedEmail, expiryTimestampStr] = payload.split("|");

    if (!embeddedEmail || !expiryTimestampStr) {
      return {
        valid: false,
        error: "Invalid invite code format",
      };
    }

    // Verify signature (constant-time comparison to prevent timing attacks)
    const hmac = createHmac("sha256", SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest("base64url");

    // Convert to buffers for constant-time comparison
    let providedSigBuffer: Buffer;
    let expectedSigBuffer: Buffer;

    try {
      providedSigBuffer = Buffer.from(providedSignature, "base64url");
      expectedSigBuffer = Buffer.from(expectedSignature, "base64url");
    } catch {
      return {
        valid: false,
        error: "Invalid invite code signature",
      };
    }

    if (
      providedSigBuffer.length !== expectedSigBuffer.length ||
      !timingSafeEqual(providedSigBuffer, expectedSigBuffer)
    ) {
      // Log signature mismatch details in development
      if (process.env.NODE_ENV === "development") {
        console.error("Signature verification failed:", {
          payload,
          embeddedEmail,
          providedEmail,
          expiryTimestamp: expiryTimestampStr,
          providedSignature: providedSignature.substring(0, 10) + "...",
          expectedSignature: expectedSignature.substring(0, 10) + "...",
          secretDefined: !!SECRET,
        });
      }
      return {
        valid: false,
        error: "Invalid invite code signature",
      };
    }

    // Check email match (case-insensitive)
    if (embeddedEmail.toLowerCase() !== providedEmail.toLowerCase().trim()) {
      return {
        valid: false,
        error: "This invite code was issued for a different email address",
      };
    }

    // Check expiry
    const expiryTimestamp = parseInt(expiryTimestampStr, 10);
    if (isNaN(expiryTimestamp)) {
      return {
        valid: false,
        error: "Invalid invite code format",
      };
    }

    const expiryDate = new Date(expiryTimestamp);
    const now = new Date();

    if (now > expiryDate) {
      return {
        valid: false,
        error:
          "This invite code has expired. Please contact PASU Health for a new code",
      };
    }

    // All checks passed
    return {
      valid: true,
      email: embeddedEmail,
      expiresAt: expiryDate,
    };
  } catch (error) {
    console.error("Error validating invite code:", error);
    return {
      valid: false,
      error: "Invalid invite code format",
    };
  }
}

/**
 * Extracts information from an invite code without full validation
 * Useful for displaying code details in admin interface
 *
 * @param code - The invite code to decode
 * @returns Decoded information or null if invalid
 */
export function decodeInviteCode(code: string): {
  email: string;
  expiresAt: Date;
} | null {
  try {
    const cleanCode = code.replace(/^PASU-/i, "").trim();
    const parts = cleanCode.split("::");
    if (parts.length !== 2) return null;

    const [encodedPayload] = parts;
    const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const [email, expiryTimestampStr] = payload.split("|");

    if (!email || !expiryTimestampStr) return null;

    const expiryTimestamp = parseInt(expiryTimestampStr, 10);
    if (isNaN(expiryTimestamp)) return null;

    return {
      email,
      expiresAt: new Date(expiryTimestamp),
    };
  } catch {
    return null;
  }
}

// import { createHmac, timingSafeEqual } from "crypto";
// import type { InviteCodeValidation } from "@/types/partnerApplication";

// /**
//  * Partner Invite Code Utility
//  *
//  * Generates and validates cryptographically-signed, time-limited invite codes
//  * that are bound to a specific email address.
//  *
//  * Format: PASU-XXXX-XXXX-XXXX (Base64URL encoded payload + signature)
//  * Payload contains: email|expiryTimestamp
//  */

// /**
//  * Type guard to ensure environment variable is defined
//  */
// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }
//   return v;
// }

// const SECRET = assertValue(
//   process.env.PARTNER_INVITE_SECRET,
//   "PARTNER_INVITE_SECRET environment variable is not set"
// );

// /**
//  * Generates a time-limited invite code for a specific email address
//  *
//  * @param email - The email address this code is bound to
//  * @param daysValid - Number of days until the code expires (default: 7)
//  * @returns Formatted invite code string (e.g., "PASU-XXXX-XXXX-XXXX")
//  */
// export function generateInviteCode(
//   email: string,
//   daysValid: number = 7
// ): string {
//   // Calculate expiry timestamp
//   const expiryDate = new Date();
//   expiryDate.setDate(expiryDate.getDate() + daysValid);
//   const expiryTimestamp = expiryDate.getTime();

//   // Create payload: email|timestamp
//   const payload = `${email.toLowerCase().trim()}|${expiryTimestamp}`;

//   // Generate HMAC signature
//   const hmac = createHmac("sha256", SECRET);
//   hmac.update(payload);
//   const signature = hmac.digest("base64url");

//   // Combine payload and signature
//   const combined = `${Buffer.from(payload).toString("base64url")}.${signature}`;

//   // Format with dashes for readability: PASU-XXXX-XXXX-XXXX
//   const formatted = formatInviteCode(combined);

//   return formatted;
// }

// /**
//  * Validates an invite code and checks if it matches the provided email
//  *
//  * @param code - The invite code to validate (with or without PASU- prefix and dashes)
//  * @param providedEmail - The email address attempting to use this code
//  * @returns Validation result with success/error information
//  */
// export function validateInviteCode(
//   code: string,
//   providedEmail: string
// ): InviteCodeValidation {
//   try {
//     // Remove PASU- prefix and dashes, then restore the dot separator
//     const cleanCode = code
//       .replace(/PASU-/gi, "")
//       .replace(/-/g, "")
//       .replace("::", ".");

//     // Split into payload and signature
//     const parts = cleanCode.split(".");
//     if (parts.length !== 2) {
//       return {
//         valid: false,
//         error: "Invalid invite code format",
//       };
//     }

//     const [encodedPayload, providedSignature] = parts;

//     // Decode payload
//     const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
//     const [embeddedEmail, expiryTimestampStr] = payload.split("|");

//     if (!embeddedEmail || !expiryTimestampStr) {
//       return {
//         valid: false,
//         error: "Invalid invite code format",
//       };
//     }

//     // Verify signature (constant-time comparison to prevent timing attacks)
//     const hmac = createHmac("sha256", SECRET);
//     hmac.update(payload);
//     const expectedSignature = hmac.digest("base64url");

//     // Convert to buffers for constant-time comparison
//     const providedSigBuffer = Buffer.from(providedSignature, "base64url");
//     const expectedSigBuffer = Buffer.from(expectedSignature, "base64url");

//     if (
//       providedSigBuffer.length !== expectedSigBuffer.length ||
//       !timingSafeEqual(providedSigBuffer, expectedSigBuffer)
//     ) {
//       // Log signature mismatch details in development
//       if (process.env.NODE_ENV === "development") {
//         console.error("Signature verification failed:", {
//           payload,
//           embeddedEmail,
//           providedEmail,
//           expiryTimestamp: expiryTimestampStr,
//           providedSignature,
//           expectedSignature,
//           secretDefined: !!SECRET,
//         });
//       }
//       return {
//         valid: false,
//         error: "Invalid invite code signature",
//       };
//     }

//     // Check email match (case-insensitive)
//     if (embeddedEmail.toLowerCase() !== providedEmail.toLowerCase().trim()) {
//       return {
//         valid: false,
//         error: "This invite code was issued for a different email address",
//       };
//     }

//     // Check expiry
//     const expiryTimestamp = parseInt(expiryTimestampStr, 10);
//     const expiryDate = new Date(expiryTimestamp);
//     const now = new Date();

//     if (now > expiryDate) {
//       return {
//         valid: false,
//         error:
//           "This invite code has expired. Please contact PASU Health for a new code",
//       };
//     }

//     // All checks passed
//     return {
//       valid: true,
//       email: embeddedEmail,
//       expiresAt: expiryDate,
//     };
//   } catch (error) {
//     console.error("Error validating invite code:", error);
//     return {
//       valid: false,
//       error: "Invalid invite code format",
//     };
//   }
// }

// /**
//  * Formats a code string with PASU- prefix and dashes for readability
//  * Uses a special delimiter (::) to separate payload and signature to avoid
//  * conflicts with base64url characters (which can contain hyphens)
//  *
//  * @param code - Raw code string (payload.signature)
//  * @returns Formatted code (e.g., "PASU-XXXX-XXXX-XXXX")
//  */
// function formatInviteCode(code: string): string {
//   // Replace the dot separator with a special delimiter that won't be confused with base64url
//   const codeWithDelimiter = code.replace(".", "::");

//   // Add PASU- prefix
//   let formatted = "PASU-";

//   // Add dashes every 4 characters
//   for (let i = 0; i < codeWithDelimiter.length; i += 4) {
//     if (i > 0) formatted += "-";
//     formatted += codeWithDelimiter.substring(i, i + 4);
//   }

//   return formatted;
// }

// /**
//  * Extracts information from an invite code without full validation
//  * Useful for displaying code details in admin interface
//  *
//  * @param code - The invite code to decode
//  * @returns Decoded information or null if invalid
//  */
// export function decodeInviteCode(code: string): {
//   email: string;
//   expiresAt: Date;
// } | null {
//   try {
//     const cleanCode = code
//       .replace(/PASU-/gi, "")
//       .replace(/-/g, "")
//       .replace("::", ".");
//     const parts = cleanCode.split(".");
//     if (parts.length !== 2) return null;

//     const [encodedPayload] = parts;
//     const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
//     const [email, expiryTimestampStr] = payload.split("|");

//     if (!email || !expiryTimestampStr) return null;

//     return {
//       email,
//       expiresAt: new Date(parseInt(expiryTimestampStr, 10)),
//     };
//   } catch {
//     return null;
//   }
// }
