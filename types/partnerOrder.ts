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
  organizationName: string;
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
  organizationName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  jobTitle: string;

  // Step 3: Scheduling & Notes
  preferredStartDate: string;
  specialRequirements?: string;
}

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
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  createdAt: Date;
}
