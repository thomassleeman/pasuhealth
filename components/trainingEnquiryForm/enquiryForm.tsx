"use client";
import { useState } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitEnquiryForm } from "@/app/actions/enquiry";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";
import Link from "next/link";

// Define industry options
const industryOptions = [
  { id: "select", name: "Select an industry" },

  // Core sectors
  { id: "agriculture", name: "Agriculture, forestry and fishing" },
  { id: "automotive", name: "Automotive" },
  { id: "construction", name: "Construction" },
  { id: "education", name: "Education" },
  { id: "energy", name: "Energy and utilities" },
  { id: "financial_services", name: "Financial services" },
  { id: "healthcare", name: "Healthcare and social care" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "mining", name: "Mining and quarrying" },

  // Service sectors
  { id: "accommodation", name: "Accommodation and hospitality" },
  { id: "business_services", name: "Business and professional services" },
  { id: "legal", name: "Legal services" },
  { id: "real_estate", name: "Property and real estate" },
  { id: "transport", name: "Transport and logistics" },

  // High-stress service industries
  { id: "accounting", name: "Accounting and bookkeeping" },
  { id: "advertising", name: "Advertising and marketing" },
  { id: "architecture", name: "Architecture and design" },
  { id: "banking", name: "Banking" },
  { id: "call_centers", name: "Call centres and customer service" },
  { id: "consulting", name: "Consulting" },
  { id: "emergency_services", name: "Emergency services" },
  { id: "event_management", name: "Event management" },
  { id: "insurance", name: "Insurance" },
  { id: "recruitment", name: "Recruitment and HR services" },

  // Technology and media
  { id: "technology", name: "Technology and software" },
  { id: "telecommunications", name: "Telecommunications" },
  { id: "media", name: "Media and creative industries" },
  { id: "gaming", name: "Gaming and digital entertainment" },

  // Retail and consumer
  { id: "retail", name: "Retail" },
  { id: "wholesale", name: "Wholesale and distribution" },
  { id: "consumer_goods", name: "Consumer goods and services" },

  // Care and wellness sectors
  { id: "care_homes", name: "Care homes and elderly care" },
  { id: "childcare", name: "Childcare and nurseries" },
  { id: "dental", name: "Dental practices" },
  { id: "pharmacy", name: "Pharmacy" },
  { id: "social_work", name: "Social work and community services" },
  { id: "veterinary", name: "Veterinary services" },

  // Specialized sectors
  { id: "aerospace", name: "Aerospace and defence" },
  { id: "aviation", name: "Airlines and aviation" },
  { id: "beauty_wellness", name: "Beauty and wellness services" },
  { id: "catering", name: "Catering and food service" },
  { id: "courier", name: "Courier and delivery services" },
  { id: "facilities", name: "Facilities management" },
  { id: "fashion", name: "Fashion and textiles" },
  { id: "food_beverage", name: "Food and beverage manufacturing" },
  { id: "funeral", name: "Funeral services" },
  { id: "pharmaceuticals", name: "Pharmaceuticals and life sciences" },
  { id: "security", name: "Security services" },
  { id: "sports", name: "Sports and fitness" },
  { id: "waste", name: "Waste management" },

  // Public and third sector
  { id: "charity", name: "Charity and non-profit" },
  { id: "government", name: "Government and public administration" },
  { id: "local_authority", name: "Local government" },
  { id: "nhs", name: "NHS" },

  // Other
  { id: "other", name: "Other" },
];

// Define hear about us options
const hearAboutUsOptions = [
  { id: "select", name: "Select an option" },
  { id: "event_conference", name: "Event/conference" },
  { id: "media", name: "Media" },
  { id: "pasu_website", name: "Pasu Health website" },
  { id: "search_engine", name: "Search engine" },
  { id: "social_media", name: "Social media" },
  { id: "word_of_mouth", name: "Word of mouth" },
  { id: "worked_before", name: "Worked with Pasu Health before" },
];

// Main form component for training enquiries
export function EnquiryForm({
  success: initialSuccess,
  error: initialError,
}: {
  success?: boolean;
  error?: string;
}) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    success: initialSuccess,
    error: initialError,
    isSubmitted: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form data state
  const [formData, setFormData] = useState({
    // Organisation details
    organisation: "",
    postcode: "",
    sector: "",
    industry: "",
    employeeCount: "",
    locationCount: "",
    hearAboutUs: "",
    hasSpecificBudget: undefined as boolean | undefined,
    isBudgetHolder: undefined as boolean | undefined,
    contactPreference: "",

    // Enquiry
    services: "",
    requirements: "",

    // Personal details
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
  });

  // Selected options for custom selects
  const [selectedIndustry, setSelectedIndustry] = useState(industryOptions[0]);
  const [selectedHearAboutUs, setSelectedHearAboutUs] = useState(
    hearAboutUsOptions[0]
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // Handle single checkboxes (boolean values)
      const checkbox = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checkbox.checked });
    } else {
      // Handle text, select, radio inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function handleSubmit(formDataObj: FormData) {
    const result = await submitEnquiryForm(formDataObj);

    if (result.success) {
      // Update URL to show success
      router.push("/contact-us?success=true");
      setFormState({ success: true, error: undefined, isSubmitted: true });
    } else {
      // Update URL to show error
      router.push(
        `/contact-us?error=${encodeURIComponent(result.error || "")}`
      );
      setFormState({ success: false, error: result.error, isSubmitted: false });
    }
  }

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderOrganisationDetails();
      case 2:
        return renderEnquiryDetails();
      case 3:
        return renderPersonalDetails();
      default:
        return null;
    }
  };

  const renderOrganisationDetails = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">1 of 3 - Organisation details</h2>
        <Link href="/request-a-callback" className="text-emerald-600 text-sm ">
          Short on time?
          <br />{" "}
          <span className="font-semibold hover:underline">
            Request a callback
          </span>
        </Link>
      </div>

      <div className="mb-4">
        <label htmlFor="organisation" className="block text-sm font-medium">
          Organisation <span className="text-red-500">*</span>
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          value={formData.organisation}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="postcode" className="block text-sm font-medium">
          Workplace Postcode <span className="text-red-500">*</span>
        </label>
        <input
          id="postcode"
          name="postcode"
          type="text"
          value={formData.postcode}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <CustomSelect
          label="Industry"
          options={industryOptions}
          selected={selectedIndustry}
          onChange={(option) => {
            setSelectedIndustry(option);
            // Also update the form data
            if (option.id !== "select") {
              setFormData({ ...formData, industry: option.name });
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="employeeCount" className="block text-sm font-medium">
          Approx total number of employees{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          id="employeeCount"
          name="employeeCount"
          type="number"
          value={formData.employeeCount}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          placeholder="Enter a numerical value"
          required
        />
      </div>

      <div className="mb-4">
        <CustomSelect
          label="How did you hear about us?"
          options={hearAboutUsOptions}
          selected={selectedHearAboutUs}
          onChange={(option) => {
            setSelectedHearAboutUs(option);
            // Also update the form data
            if (option.id !== "select") {
              setFormData({ ...formData, hearAboutUs: option.name });
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          How would you prefer us to contact you?
        </label>
        <div className="flex flex-col space-y-2 mt-1">
          {["telephone", "email"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="contactPreference"
                value={option}
                checked={formData.contactPreference === option}
                onChange={() => handleRadioChange("contactPreference", option)}
                className="mr-2 accent-emerald-700 w-4 h-4"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderEnquiryDetails = () => (
    <>
      <h2 className="text-xl font-bold mb-4">2 of 3 - Enquiry</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Which services are you interested in?
          <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col space-y-2 mt-1">
          {[
            "Training",
            "Workplace wellness consutancy",
            "Both",
            "Not sure yet",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="services"
                value={option}
                checked={formData.services === option}
                onChange={() => handleRadioChange("services", option)}
                className="mr-2 accent-emerald-700 w-4 h-4"
                required
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="requirements" className="block text-sm font-medium">
          Tell us more about your requirements.
        </label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          rows={5}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
        ></textarea>
      </div>
    </>
  );

  const renderPersonalDetails = () => (
    <>
      <h2 className="text-xl font-bold mb-4">3 of 3 - Your Details</h2>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium">
          First name <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last name <span className="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-sm font-medium">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-700 outline-none"
        />
      </div>
    </>
  );

  const createFormDataObject = () => {
    const data = new FormData();

    // Add all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        data.append(key, value.toString());
      }
    });

    // Add values from custom selects
    if (selectedIndustry.id !== "select") {
      data.append("industry", selectedIndustry.name);
    }

    if (selectedHearAboutUs.id !== "select") {
      data.append("hearAboutUs", selectedHearAboutUs.name);
    }

    return data;
  };

  return (
    <div className="w-full">
      <FormStatus success={formState.success} error={formState.error} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === totalSteps) {
            handleSubmit(createFormDataObject());
          } else {
            nextStep();
          }
        }}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        {renderStepContent()}

        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {currentStep < totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 text-white rounded-md cursor-pointer"
              >
                Next
              </button>
            ) : (
              <SubmitButton isSubmitted={formState.isSubmitted} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
