export interface TrainingCourse {
  title: string;
  slug: {
    current: string;
  };
  maxParticipants: number;
  pricing: {
    pricePerParticipant: number;
    groupDiscounts?: string;
    pricingNotes?: string;
  };
  duration?: string;
  platform?: string;
}

export interface CustomerDetails {
  organisationName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  jobTitle: string;
}

export interface OrderCalculation {
  participantCount: number;
  sessionsNeeded: number;
  pricePerSession: number;
  totalPrice: number;
  partnerCommission: number;
}

export interface PartnerOrderFormData {
  // Step 1: Training Selection
  courseSlug: string;
  participantCount: number;

  // Step 2: Customer Details
  organisationName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  jobTitle: string;

  // Step 3: Scheduling & Notes
  preferredStartDate: string;
  specialRequirements?: string;
}

export type OrderStatus =
  | "pending"
  | "approved"
  | "completed"
  | "paid"
  | "cancelled";

export interface PartnerOrder {
  id?: string;
  partnerId: string;
  courseSlug: string;
  courseTitle: string;
  customerDetails: CustomerDetails;
  participantCount: number;
  sessionsNeeded: number;
  pricePerSession: number;
  totalPrice: number;
  partnerCommission: number;
  preferredStartDate: string;
  specialRequirements?: string;
  status: OrderStatus;
  createdAt: Date;
  adminNotes?: string;
  statusHistory?: StatusHistoryEntry[];
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  updatedBy?: string;
}

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["approved", "cancelled"],
  approved: ["completed", "cancelled"],
  completed: ["paid", "cancelled"],
  paid: [],
  cancelled: [],
};
