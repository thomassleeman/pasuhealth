"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  PartnerApplication,
  ApplicationStatus,
} from "@/types/partnerApplication";

interface AdminApplicationTableProps {
  applications: PartnerApplication[];
}

export default function AdminApplicationTable({
  applications,
}: AdminApplicationTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    (searchParams.get("status") as ApplicationStatus) || "all"
  );

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleFilterChange = (newStatus: ApplicationStatus | "all") => {
    setStatusFilter(newStatus);
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  const getStatusBadgeClass = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <label htmlFor="status" className="sr-only">
              Filter by status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) =>
                handleFilterChange(e.target.value as ApplicationStatus | "all")
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600">
          Showing {filteredApplications.length} of {applications.length}{" "}
          applications
        </p>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/partner-applications/${application.id}`
                      )
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {application.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {application.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {application.company_name || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(application.status)}`}
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/admin/partner-applications/${application.id}`
                          );
                        }}
                        className="text-emerald-600 hover:text-emerald-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
