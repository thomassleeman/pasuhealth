"use client";
import { useState } from "react";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";
import { submitTrainingEnquiryForm } from "@actions/trainingEnquiry";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";

// Define industry options
const industryOptions = [
  { id: "select", name: "Select an industry" },
  { id: "accommodation", name: "Accommodation and food services" },
  {
    id: "extraterritorial",
    name: "Activities of extraterritorial organisations and bodies",
  },
  {
    id: "households",
    name: "Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use",
  },
  { id: "agriculture", name: "Agriculture, forestry and fishing" },
  { id: "animal_welfare", name: "Animal welfare" },
  { id: "arts", name: "Arts, entertainment and recreation" },
  { id: "business", name: "Business administration and support services" },
  { id: "construction", name: "Construction" },
  { id: "education", name: "Education" },
  {
    id: "electricity",
    name: "Electricity, gas, steam and air conditioning supply",
  },
  { id: "environmental", name: "Environmental" },
  { id: "finance", name: "Finance and insurance" },
  { id: "humanitarian", name: "Humanitarian/Human rights" },
  { id: "health", name: "Human health and social work activities" },
  { id: "information", name: "Information and communication" },
  { id: "law", name: "Law" },
  { id: "local", name: "Local Authorities" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "medical", name: "Medical" },
  { id: "mining", name: "Mining and quarrying" },
  { id: "professional", name: "Professional, scientific and technical" },
  {
    id: "public",
    name: "Public administration and defence; compulsory social security",
  },
  { id: "real_estate", name: "Real estate activities" },
  { id: "tech_hardware", name: "Technology (Hardware)" },
  { id: "tech_software", name: "Technology (Software)" },
  { id: "transport", name: "Transport and storage (incl. postal)" },
  {
    id: "water",
    name: "Water supply; sewerage, waste management and remediation activities",
  },
  {
    id: "wholesale",
    name: "Wholesale and retail trade; repair of motor vehicles and motorcycles",
  },
];

// Main form component for training enquiries
export function TrainingEnquiryForm({
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
  const totalSteps = 4;

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
    trainingDelivery: "",
    trainingRequirements: "",

    // Preferences
    contactVia: [] as string[],

    // Personal details
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
  });

  // Selected industry for the custom select
  const [selectedIndustry, setSelectedIndustry] = useState(industryOptions[0]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      if (name === "contactVia") {
        // Handle multi-select checkboxes
        const newContactVia = [...formData.contactVia];
        if (checkbox.checked) {
          newContactVia.push(value);
        } else {
          const index = newContactVia.indexOf(value);
          if (index > -1) {
            newContactVia.splice(index, 1);
          }
        }
        setFormData({ ...formData, contactVia: newContactVia });
      } else {
        // Handle single checkboxes (boolean values)
        setFormData({ ...formData, [name]: checkbox.checked });
      }
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
    const result = await submitTrainingEnquiryForm(formDataObj);

    if (result.success) {
      // Update URL to show success
      router.push("/training-enquiry?success=true");
      setFormState({ success: true, error: undefined, isSubmitted: true });
    } else {
      // Update URL to show error
      router.push(
        `/training-enquiry?error=${encodeURIComponent(result.error || "")}`
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
        return renderPreferences();
      case 4:
        return renderPersonalDetails();
      default:
        return null;
    }
  };

  const renderOrganisationDetails = () => (
    <>
      <h2 className="text-xl font-bold mb-4">1 of 4 - Organisation details</h2>

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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Sector <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4 mt-1">
          {["Public Sector", "Private Sector", "Third Sector"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="sector"
                value={option}
                checked={formData.sector === option}
                onChange={() => handleRadioChange("sector", option)}
                className="mr-2"
                required
              />
              {option}
            </label>
          ))}
        </div>
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
          required={true}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="employeeCount" className="block text-sm font-medium">
          Total number of UK employees <span className="text-red-500">*</span>
        </label>
        <input
          id="employeeCount"
          name="employeeCount"
          type="number"
          value={formData.employeeCount}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter a numerical value"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="locationCount" className="block text-sm font-medium">
          Over how many locations/sites
        </label>
        <input
          id="locationCount"
          name="locationCount"
          type="number"
          value={formData.locationCount}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter a numerical value"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hearAboutUs" className="block text-sm font-medium">
          How did you hear about us? <span className="text-red-500">*</span>
        </label>
        <select
          id="hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select an option</option>
          <option value="Event/ conference">Event/ conference</option>
          <option value="Media">Media</option>
          <option value="Mental Health at Work website">
            Mental Health at Work website
          </option>
          <option value="Mind website">Mind website</option>
          <option value="Search engine">Search engine</option>
          <option value="Social media">Social media</option>
          <option value="Word of mouth">Word of mouth</option>
          <option value="Worked with Mind before">
            Worked with Mind before
          </option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Are you working with a specific budget?
        </label>
        <div className="flex space-x-4 mt-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasSpecificBudget"
              checked={formData.hasSpecificBudget === true}
              onChange={() => handleRadioChange("hasSpecificBudget", true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasSpecificBudget"
              checked={formData.hasSpecificBudget === false}
              onChange={() => handleRadioChange("hasSpecificBudget", false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Are you the budget holder?
        </label>
        <div className="flex space-x-4 mt-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="isBudgetHolder"
              checked={formData.isBudgetHolder === true}
              onChange={() => handleRadioChange("isBudgetHolder", true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="isBudgetHolder"
              checked={formData.isBudgetHolder === false}
              onChange={() => handleRadioChange("isBudgetHolder", false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Would you like a call to discuss your needs in more detail?
        </label>
        <div className="flex flex-col space-y-2 mt-1">
          {[
            "Yes please",
            "No thanks, I know what services I want",
            "No thanks, I'd like to receive information over email",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="contactPreference"
                value={option}
                checked={formData.contactPreference === option}
                onChange={() => handleRadioChange("contactPreference", option)}
                className="mr-2"
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
      <h2 className="text-xl font-bold mb-4">2 of 4 - Enquiry</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Do you know what training delivery you want?
        </label>
        <div className="flex flex-col space-y-2 mt-1">
          {["Virtual training", "Face to face", "Both", "Not sure yet"].map(
            (option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="trainingDelivery"
                  value={option}
                  checked={formData.trainingDelivery === option}
                  onChange={() => handleRadioChange("trainingDelivery", option)}
                  className="mr-2"
                />
                {option}
              </label>
            )
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="trainingRequirements"
          className="block text-sm font-medium"
        >
          Tell us more about your training requirements.
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Do you already know which courses you are interested in? How many
          people are you looking to train? Do you have a specific timeframe?
        </p>
        <textarea
          id="trainingRequirements"
          name="trainingRequirements"
          value={formData.trainingRequirements}
          onChange={handleInputChange}
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
    </>
  );

  const renderPreferences = () => (
    <>
      <h2 className="text-xl font-bold mb-4">3 of 4 - Your Preferences</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">
          Please contact me via:
        </label>
        <div className="flex flex-col space-y-2 mt-1">
          {["Email", "SMS", "Phone"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                name="contactVia"
                value={option}
                checked={formData.contactVia.includes(option)}
                onChange={handleInputChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Your privacy</h3>
        <p className="text-sm mb-2">
          We take your privacy seriously and promise to never sell your data.
          You can find out more about your rights, how we use your personal
          information and how we keep your details safe and secure by reading
          our Privacy Policy or alternatively the Privacy Policy of the local
          Mind affiliate who will contact you about your enquiry.
        </p>
        <p className="text-sm mb-2">
          If we have your postal address, we may contact you by post unless you
          tell us otherwise.
        </p>
      </div>
    </>
  );

  const renderPersonalDetails = () => (
    <>
      <h2 className="text-xl font-bold mb-4">4 of 4 - Your Details</h2>

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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </>
  );

  const createFormDataObject = () => {
    const data = new FormData();

    // Add all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays (like contactVia)
        value.forEach((item) => data.append(key, item));
      } else if (value !== undefined) {
        // Handle all other values
        data.append(key, value.toString());
      }
    });

    // Add the industry value from the custom select
    if (selectedIndustry.id !== "select") {
      data.append("industry", selectedIndustry.name);
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
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {currentStep < totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
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
