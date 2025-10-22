"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderDetails } from "@/app/actions/adminPartnerOrder";
import { type OrderStatus } from "@/types/partnerOrder";

interface OrderData {
  id: string;
  customer_organisation: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  customer_job_title: string;
  participant_count: number;
  preferred_start_date: string;
  special_requirements?: string;
  status: OrderStatus;
}

interface OrderEditFormProps {
  order: OrderData;
  onCancel: () => void;
}

export function OrderEditForm({ order, onCancel }: OrderEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerorganisation: order.customer_organisation,
    customerFirstName: order.customer_first_name,
    customerLastName: order.customer_last_name,
    customerEmail: order.customer_email,
    customerPhone: order.customer_phone,
    customerJobTitle: order.customer_job_title,
    participantCount: order.participant_count,
    preferredStartDate: order.preferred_start_date,
    specialRequirements: order.special_requirements || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("orderId", order.id);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    const result = await updateOrderDetails(data);

    if (result.success) {
      router.refresh();
      onCancel();
    } else {
      setError(result.error || "Failed to update order");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Customer Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Customer Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              organisation
            </label>
            <input
              type="text"
              name="customerorganisation"
              value={formData.customerorganisation}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="customerFirstName"
              value={formData.customerFirstName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="customerLastName"
              value={formData.customerLastName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="customerJobTitle"
              value={formData.customerJobTitle}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Training Details */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Training Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participant Count
            </label>
            <input
              type="number"
              name="participantCount"
              value={formData.participantCount}
              onChange={handleChange}
              min="1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Start Date
            </label>
            <input
              type="date"
              name="preferredStartDate"
              value={formData.preferredStartDate}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requirements
            </label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
