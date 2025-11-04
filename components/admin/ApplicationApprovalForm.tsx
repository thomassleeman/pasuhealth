"use client";

import { useState, useTransition } from "react";
import {
  approvePartnerApplication,
  rejectPartnerApplication,
  regenerateInviteCode,
  resendInviteCode,
} from "@/app/actions/adminPartnerApplication";
import type { PartnerApplication } from "@/types/partnerApplication";

interface ApplicationApprovalFormProps {
  application: PartnerApplication;
}

export default function ApplicationApprovalForm({
  application,
}: ApplicationApprovalFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [daysValid, setDaysValid] = useState(7);
  const [adminNotes, setAdminNotes] = useState("");
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const isPending_status = application.status === "pending";
  const isApproved = application.status === "approved";
  const isRejected = application.status === "rejected";

  // Check if code is expired
  const isCodeExpired = application.code_expires_at
    ? new Date(application.code_expires_at) < new Date()
    : false;

  const handleApprove = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("applicationId", application.id);
      formData.append("daysValid", daysValid.toString());
      formData.append("adminNotes", adminNotes);

      const result = await approvePartnerApplication(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Application approved and invite code sent!",
        });
        setGeneratedCode(result.inviteCode || null);
        setShowInviteCode(true);
        setAdminNotes("");
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to approve application",
        });
      }
    });
  };

  const handleReject = () => {
    if (!confirm("Are you sure you want to reject this application?")) {
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("applicationId", application.id);
      formData.append("adminNotes", adminNotes);

      const result = await rejectPartnerApplication(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Application rejected",
        });
        setAdminNotes("");
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to reject application",
        });
      }
    });
  };

  const handleRegenerate = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("applicationId", application.id);
      formData.append("daysValid", daysValid.toString());

      const result = await regenerateInviteCode(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: "New invite code generated and sent!",
        });
        setGeneratedCode(result.inviteCode || null);
        setShowInviteCode(true);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to regenerate code",
        });
      }
    });
  };

  const handleResend = () => {
    startTransition(async () => {
      const result = await resendInviteCode(application.id);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Invite code email resent successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to resend email",
        });
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage({
      type: "success",
      text: "Invite code copied to clipboard!",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Pending Application - Approval Form */}
      {isPending_status && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Review Application
          </h3>

          <div className="space-y-4">
            {/* Days Valid */}
            <div>
              <label
                htmlFor="daysValid"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Invite Code Validity (days)
              </label>
              <input
                type="number"
                id="daysValid"
                min="1"
                max="90"
                value={daysValid}
                onChange={(e) => setDaysValid(parseInt(e.target.value) || 7)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                How many days until the invite code expires (1-90 days)
              </p>
            </div>

            {/* Admin Notes */}
            <div>
              <label
                htmlFor="adminNotes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Admin Notes (optional)
              </label>
              <textarea
                id="adminNotes"
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                placeholder="Internal notes about this application..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleApprove}
                disabled={isPending}
                className="flex-1 py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? "Processing..." : "Approve Application"}
              </button>
              <button
                onClick={handleReject}
                disabled={isPending}
                className="flex-1 py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? "Processing..." : "Reject Application"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approved Application - Invite Code Display */}
      {isApproved && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invite Code
            </h3>

            {/* Display Invite Code */}
            <div
              className={`p-6 rounded-lg mb-4 ${
                isCodeExpired
                  ? "bg-red-50 border-2 border-red-200"
                  : "bg-emerald-50 border-2 border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-3xl font-bold text-gray-900 tracking-wider font-mono">
                  {showInviteCode || generatedCode
                    ? generatedCode || application.invite_code
                    : "••••-••••-••••-••••"}
                </p>
                <button
                  onClick={() => setShowInviteCode(!showInviteCode)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {showInviteCode ? "Hide" : "Show"}
                </button>
              </div>

              {application.code_expires_at && (
                <p
                  className={`text-sm ${isCodeExpired ? "text-red-700 font-semibold" : "text-gray-600"}`}
                >
                  {isCodeExpired ? (
                    <>
                      <strong>Expired:</strong>{" "}
                      {formatDate(application.code_expires_at)}
                    </>
                  ) : (
                    <>
                      <strong>Expires:</strong>{" "}
                      {formatDate(application.code_expires_at)}
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {!isCodeExpired && (
                <>
                  <button
                    onClick={() =>
                      copyToClipboard(application.invite_code || "")
                    }
                    disabled={isPending}
                    className="flex-1 py-2 px-4 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    Copy Code
                  </button>
                  <button
                    onClick={handleResend}
                    disabled={isPending}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    {isPending ? "Sending..." : "Resend Email"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Regenerate Section */}
          {isCodeExpired && (
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Generate New Code
              </h4>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="newDaysValid"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Code Validity (days)
                  </label>
                  <input
                    type="number"
                    id="newDaysValid"
                    min="1"
                    max="90"
                    value={daysValid}
                    onChange={(e) =>
                      setDaysValid(parseInt(e.target.value) || 7)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={handleRegenerate}
                  disabled={isPending}
                  className="w-full py-2 px-4 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {isPending ? "Generating..." : "Generate New Code & Send Email"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejected Application */}
      {isRejected && (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Application Rejected
          </h3>
          <p className="text-sm text-red-700">
            This application was rejected on{" "}
            {application.reviewed_at && formatDate(application.reviewed_at)}
          </p>
        </div>
      )}
    </div>
  );
}
