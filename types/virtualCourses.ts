// types/virtualCourse.ts

import { Image as SanityImage } from "sanity";

// Type for the Pricing information
export interface VirtualCoursePricing {
  pricePerParticipant?: number;
  groupDiscounts?: boolean;
  pricingNotes?: string;
}

// Type for Virtual Course Materials
export interface VirtualCourseMaterial {
  title: string;
  description?: string;
  fileType: "pdf" | "video" | "audio" | "worksheet" | "other";
}

// Type for Testimonials
export interface VirtualCourseTestimonial {
  quote: string;
  author: string;
  company?: string;
}

// Type for SEO
export interface VirtualCourseSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

// Business targeting types
export type BusinessTargetType =
  | "small-business"
  | "enterprise"
  | "startup"
  | "healthcare"
  | "education"
  | "technology"
  | "all";

// Main Virtual Course Type matching your Sanity schema
export interface VirtualCourse {
  _id: string;
  _type: "virtualCourse";
  title: string;
  slug: SanitySlug;
  headerImage: SanityImage;
  forWho: string;
  duration: string;
  aims: string;
  outline: string[];
  platform?: string;
  businessTargeting?: BusinessTargetType[];
  pricing?: VirtualCoursePricing;
  materials?: VirtualCourseMaterial[];
  testimonials?: VirtualCourseTestimonial[];
  seo?: VirtualCourseSEO;
}

// Type for the simplified version used in cards/listings
export interface VirtualCourseCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  headerImage: SanityImage;
  duration: string;
  outline: string; // Used as description in the card
}
