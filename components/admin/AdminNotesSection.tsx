"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAdminNote } from "@/app/actions/adminPartnerOrder";

interface AdminNotesSectionProps {
  orderId: string;
  notes?: string | null;
}

export function AdminNotesSection({ orderId, notes }: AdminNotesSectionProps) {
  const router = useRouter();
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("note", newNote);

    const result = await addAdminNote(formData);

    if (result.success) {
      setNewNote("");
      router.refresh();
    } else {
      setError(result.error || "Failed to add note");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Notes</h2>

      {/* Existing Notes */}
      {notes ? (
        <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {notes}
          </pre>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6 italic">No notes yet</p>
      )}

      {/* Add New Note */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="newNote"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Add Note
          </label>
          <textarea
            id="newNote"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            placeholder="Add internal notes about this order..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !newNote.trim()}
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Note..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}
