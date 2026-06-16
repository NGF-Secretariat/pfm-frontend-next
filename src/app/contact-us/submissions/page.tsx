"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, User, Clock, MessageSquare } from "lucide-react";
import contactService from "../../../service/contactService";

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data } = await contactService.getAll();
        if (data?.success) {
          setSubmissions(data.data || []);
        } else {
          setError(data?.message || "Failed to load submissions");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf8] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#012c14]">Contact Us Submissions</h1>
          <p className="mt-2 text-gray-600">
            View all inquiries and messages submitted through the contact form.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <p className="font-semibold">Error Loading Data</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-16 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No submissions yet</h3>
            <p className="text-gray-500 mt-1">When users contact you, their messages will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Sender Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 align-top">
                        <p className="font-medium text-gray-900">
                          {sub.firstName} {sub.lastName}
                        </p>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <a 
                          href={`mailto:${sub.email}`} 
                          className="text-[#1D9E75] hover:text-[#012c14] font-medium transition-colors"
                        >
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-6 py-5 align-top text-gray-500 text-sm whitespace-nowrap">
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(sub.createdAt))}
                        <br />
                        <span className="text-xs text-gray-400">
                          {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(sub.createdAt))}
                        </span>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="text-gray-700 text-sm whitespace-pre-wrap max-w-2xl bg-gray-50 rounded-lg p-3 border border-gray-100">
                          {sub.message}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
