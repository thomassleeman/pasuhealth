"use client";

import { useState } from "react";
import { StatusUpdateForm } from "./StatusUpdateForm";
import { OrderEditForm } from "./OrderEditForm";
import { AdminNotesSection } from "./AdminNotesSection";

interface AdminOrderDetailProps {
  order: any;
}

export function AdminOrderDetail({ order }: AdminOrderDetailProps) {
  const [editMode, setEditMode] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    paid: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      {/* Status Update Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Update Order Status
        </h2>
        <StatusUpdateForm orderId={order.id} currentStatus={order.status} />
      </div>

      {/* Order Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Order Information</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {editMode ? "Cancel" : "Edit Details"}
          </button>
        </div>

        {editMode ? (
          <OrderEditForm order={order} onCancel={() => setEditMode(false)} />
        ) : (
          <div className="p-6 space-y-6">
            {/* Training Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Training Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <p className="text-gray-900 mt-1">{order.course_title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Participants
                  </label>
                  <p className="text-gray-900 mt-1">
                    {order.participant_count}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sessions Needed
                  </label>
                  <p className="text-gray-900 mt-1">{order.sessions_needed}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Preferred Start Date
                  </label>
                  <p className="text-gray-900 mt-1">
                    {new Date(order.preferred_start_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Created
                  </label>
                  <p className="text-gray-900 mt-1">
                    {new Date(order.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {order.special_requirements && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Special Requirements
                  </label>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                    {order.special_requirements}
                  </p>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Customer Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    organisation
                  </label>
                  <p className="text-gray-900 mt-1">
                    {order.customer_organisation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Contact Name
                  </label>
                  <p className="text-gray-900 mt-1">
                    {order.customer_first_name} {order.customer_last_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900 mt-1">
                    <a
                      href={`mailto:${order.customer_email}`}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {order.customer_email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900 mt-1">
                    <a
                      href={`tel:${order.customer_phone}`}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {order.customer_phone}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <p className="text-gray-900 mt-1">
                    {order.customer_job_title}
                  </p>
                </div>
              </div>
            </div>

            {/* Partner Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Partner Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Partner Name
                  </label>
                  <p className="text-gray-900 mt-1">
                    {order.partners.first_name} {order.partners.last_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Partner Email
                  </label>
                  <p className="text-gray-900 mt-1">
                    <a
                      href={`mailto:${order.partners.email}`}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {order.partners.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Financial Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Price per Session
                  </label>
                  <p className="text-gray-900 mt-1">
                    £{order.price_per_session.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Total Price
                  </label>
                  <p className="text-gray-900 mt-1 font-semibold">
                    £{order.total_price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Partner Commission (15%)
                  </label>
                  <p className="text-emerald-600 mt-1 font-semibold">
                    £{order.partner_commission.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status History */}
      {order.status_history && order.status_history.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Status History
          </h2>
          <div className="space-y-3">
            {order.status_history.map((entry: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 text-sm border-l-2 border-emerald-600 pl-4 py-2"
              >
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[entry.status as keyof typeof statusColors]
                  }`}
                >
                  {entry.status}
                </span>
                <span className="text-gray-600">
                  {new Date(entry.timestamp).toLocaleString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Notes */}
      <AdminNotesSection orderId={order.id} notes={order.admin_notes} />
    </div>
  );
}
