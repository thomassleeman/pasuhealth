"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/adminPartnerOrder";
import { type OrderStatus } from "@/types/partnerOrder";

interface StatusUpdateFormProps {
  orderId: string;
  currentStatus: string;
}

export function StatusUpdateForm({
  orderId,
  currentStatus,
}: StatusUpdateFormProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sendNotification, setSendNotification] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const allStatuses: OrderStatus[] = ['pending', 'approved', 'completed', 'paid', 'cancelled'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("newStatus", selectedStatus);
    formData.append("sendNotification", sendNotification.toString());

    const result = await updateOrderStatus(formData);

    if (result.success) {
      setSuccess(true);
      setSelectedStatus("");
      router.refresh();
    } else {
      setError(result.error || "Failed to update status");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">
            Status updated successfully!
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Status
        </label>
        <div className="text-lg font-semibold text-gray-900 capitalize">
          {currentStatus}
        </div>
      </div>

      <div>
        <label
          htmlFor="newStatus"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Update Status To
        </label>
        <select
          id="newStatus"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
          required
        >
          <option value="">-- Select new status --</option>
          {allStatuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          id="sendNotification"
          type="checkbox"
          checked={sendNotification}
          onChange={(e) => setSendNotification(e.target.checked)}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label
          htmlFor="sendNotification"
          className="ml-2 block text-sm text-gray-900"
        >
          Send email notification to partner
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !selectedStatus}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Updating..." : "Update Status"}
      </button>
    </form>
  );
}
