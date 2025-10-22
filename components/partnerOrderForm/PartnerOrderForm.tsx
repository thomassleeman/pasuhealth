"use client";

import { useState, useEffect } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitPartnerOrder } from "@/app/actions/partnerOrder";
import { useRouter } from "next/navigation";
import type { TrainingCourse } from "@/types/partnerOrder";

interface PartnerOrderFormProps {
  courses: TrainingCourse[];
  partnerId: string;
  success?: boolean;
  error?: string;
}

export function PartnerOrderForm({
  courses,
  partnerId,
  success: initialSuccess,
  error: initialError,
}: PartnerOrderFormProps) {
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
    courseSlug: "",
    participantCount: 0,
    organizationName: "",
    contactFirstName: "",
    contactLastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    preferredStartDate: "",
    specialRequirements: "",
  });

  // Selected course and calculations
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(
    null
  );
  const [orderCalculation, setOrderCalculation] = useState<{
    sessionsNeeded: number;
    pricePerSession: number;
    totalPrice: number;
    partnerCommission: number;
  } | null>(null);

  useEffect(() => {
    if (formData.courseSlug) {
      const course = courses.find((c) => c.slug.current === formData.courseSlug);
      setSelectedCourse(course || null);
    }
  }, [formData.courseSlug, courses]);

  useEffect(() => {
    if (selectedCourse && formData.participantCount > 0) {
      const maxParticipants = selectedCourse.maxParticipants;
      const pricePerSession =
        selectedCourse.pricing.pricePerParticipant * maxParticipants;
      const sessionsNeeded = Math.ceil(
        formData.participantCount / maxParticipants
      );
      const totalPrice = sessionsNeeded * pricePerSession;
      const partnerCommission = totalPrice * 0.15;

      setOrderCalculation({
        sessionsNeeded,
        pricePerSession,
        totalPrice,
        partnerCommission,
      });
    } else {
      setOrderCalculation(null);
    }
  }, [selectedCourse, formData.participantCount]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
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
    const result = await submitPartnerOrder(formDataObj);

    if (result.success) {
      router.push("/partners/dashboard/new-order?success=true");
      setFormState({ success: true, error: undefined, isSubmitted: true });
    } else {
      router.push(
        `/partners/dashboard/new-order?error=${encodeURIComponent(
          result.error || ""
        )}`
      );
      setFormState({ success: false, error: result.error, isSubmitted: false });
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderTrainingSelection();
      case 2:
        return renderCustomerDetails();
      case 3:
        return renderSchedulingAndNotes();
      default:
        return null;
    }
  };

  const renderTrainingSelection = () => (
    <>
      <h2 className="text-xl font-bold mb-4">1 of 3 - Training Selection</h2>

      <div className="mb-4">
        <label htmlFor="courseSlug" className="block text-sm font-medium mb-2">
          Select Course <span className="text-red-500">*</span>
        </label>
        <select
          id="courseSlug"
          name="courseSlug"
          value={formData.courseSlug}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        >
          <option value="">-- Select a course --</option>
          {courses.map((course) => (
            <option key={course.slug.current} value={course.slug.current}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Course Details</h3>
          <div className="text-sm space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Price per session:</span> £
              {(
                selectedCourse.pricing.pricePerParticipant *
                selectedCourse.maxParticipants
              ).toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Max participants per session:</span>{" "}
              {selectedCourse.maxParticipants}
            </p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="participantCount"
          className="block text-sm font-medium mb-2"
        >
          Number of Participants <span className="text-red-500">*</span>
        </label>
        <input
          id="participantCount"
          name="participantCount"
          type="number"
          min="1"
          value={formData.participantCount || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          placeholder="Enter number of participants"
          required
        />
      </div>

      {orderCalculation && (
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Sessions needed:</span>{" "}
              {orderCalculation.sessionsNeeded}
            </p>
            <p>
              <span className="font-medium">Total price:</span> £
              {orderCalculation.totalPrice.toFixed(2)}
            </p>
            <p className="text-emerald-700 font-semibold">
              Your commission: £{orderCalculation.partnerCommission.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );

  const renderCustomerDetails = () => (
    <>
      <h2 className="text-xl font-bold mb-4">2 of 3 - Customer Details</h2>

      <div className="mb-4">
        <label
          htmlFor="organizationName"
          className="block text-sm font-medium mb-2"
        >
          Organization Name <span className="text-red-500">*</span>
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          value={formData.organizationName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="contactFirstName"
            className="block text-sm font-medium mb-2"
          >
            Contact First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contactFirstName"
            name="contactFirstName"
            type="text"
            value={formData.contactFirstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactLastName"
            className="block text-sm font-medium mb-2"
          >
            Contact Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contactLastName"
            name="contactLastName"
            type="text"
            value={formData.contactLastName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        />
      </div>
    </>
  );

  const renderSchedulingAndNotes = () => (
    <>
      <h2 className="text-xl font-bold mb-4">3 of 3 - Scheduling & Notes</h2>

      <div className="mb-4">
        <label
          htmlFor="preferredStartDate"
          className="block text-sm font-medium mb-2"
        >
          Preferred Start Date <span className="text-red-500">*</span>
        </label>
        <input
          id="preferredStartDate"
          name="preferredStartDate"
          type="date"
          value={formData.preferredStartDate}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="specialRequirements"
          className="block text-sm font-medium mb-2"
        >
          Special Requirements / Notes
        </label>
        <textarea
          id="specialRequirements"
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleInputChange}
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          placeholder="Any special requirements or notes for this training order..."
        ></textarea>
      </div>

      {orderCalculation && selectedCourse && (
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold mb-2">Final Order Summary</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Course:</span>{" "}
              {selectedCourse.title}
            </p>
            <p>
              <span className="font-medium">Participants:</span>{" "}
              {formData.participantCount}
            </p>
            <p>
              <span className="font-medium">Sessions:</span>{" "}
              {orderCalculation.sessionsNeeded}
            </p>
            <p>
              <span className="font-medium">Total Price:</span> £
              {orderCalculation.totalPrice.toFixed(2)}
            </p>
            <p className="text-emerald-700 font-semibold">
              Your Commission: £{orderCalculation.partnerCommission.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );

  const createFormDataObject = () => {
    const data = new FormData();

    // Add partner ID
    data.append("partnerId", partnerId);

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    // Add course title
    if (selectedCourse) {
      data.append("courseTitle", selectedCourse.title);
    }

    // Add calculation data
    if (orderCalculation) {
      data.append(
        "sessionsNeeded",
        orderCalculation.sessionsNeeded.toString()
      );
      data.append(
        "pricePerSession",
        orderCalculation.pricePerSession.toString()
      );
      data.append("totalPrice", orderCalculation.totalPrice.toString());
      data.append(
        "partnerCommission",
        orderCalculation.partnerCommission.toString()
      );
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
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {currentStep < totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition"
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
