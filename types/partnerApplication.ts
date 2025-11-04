// Types for partner application management system

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface PartnerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_name?: string;
  description: string;
  status: ApplicationStatus;
  invite_code?: string;
  code_expires_at?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerApplicationWithReviewer extends PartnerApplication {
  reviewer?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface InviteCodeValidation {
  valid: boolean;
  error?: string;
  email?: string;
  expiresAt?: Date;
}
