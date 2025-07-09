import { useForm } from "react-hook-form";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { ContactFormData } from "@/types/riskChecker";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onBack: () => void;
  initialData?: Partial<ContactFormData>;
}

// Move ContactForm outside as a separate component
const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      company: initialData?.company || "",
      role: initialData?.role || "",
      phone: initialData?.phone || "",
    },
  });

  // Progress bar component (you'll need to pass progress as prop or calculate here)
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Assessment Progress</span>
        <span>85% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: "85%" }}
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
            <UserGroupIcon className="h-5 w-5" />
            <span>Contact Details</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Detailed Assessment Report
          </h2>
          <p className="text-gray-600">
            Please provide your contact information to receive your
            comprehensive workplace mental health risk assessment report and
            recommendations.
          </p>
        </div>

        <ProgressBar />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 1, message: "First name is required" },
                })}
                className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                  errors.firstName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 1, message: "Last name is required" },
                })}
                className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                  errors.lastName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                errors.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              {...register("company", {
                required: "Company name is required",
                minLength: { value: 1, message: "Company name is required" },
              })}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                errors.company
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Role *
            </label>
            <input
              type="text"
              {...register("role", {
                required: "Your role is required",
                minLength: { value: 1, message: "Your role is required" },
              })}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                errors.role
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              }`}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex-1 px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                isValid
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Generate My Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
