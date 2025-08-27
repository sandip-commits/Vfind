"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "../../../../../components/loading";
import { MapPin, DollarSignIcon, Clock, Briefcase, ArrowLeft } from "lucide-react";

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  minPay: string;
  maxPay: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  experienceMin: string;
  experienceMax: string;
  updated_at: string;
  company?: string;
  shift?: string;
  contact_email?: string;
}

export default function JobApplicationPage() {
  const router = useRouter();
  const { id } = useParams(); // grab id from URL
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      router.push("/dashboard/nurseProfile");
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:W58sMfI8/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data: Job = await res.json();
        setJob(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, router]);

  if (loading) return <Loader loading={true} message="Fetching job data..." />;
  if (error || !job)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error || "Job not found."}</p>
          <button
            className="mt-2 text-blue-600 hover:text-blue-800"
            onClick={() => router.push("/dashboard/nurseProfile")}
          >
            ← Back to job listings
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Jobs
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white bg-opacity-10 rounded-md p-3">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">{job.title}</h1>
              <p className="text-blue-100">{job.company || "Healthcare Provider"}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start">
              <DollarSignIcon className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Salary Range</p>
                <p className="text-sm text-gray-500">${job.minPay} - ${job.maxPay}/hr</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Job Type</p>
                <p className="text-sm text-gray-500">{job.type}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Experience Required</p>
                <p className="text-sm text-gray-500">
                  {job.experienceMin} - {job.experienceMax} years
                </p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              {job.description.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Apply for this position</h2>
            {job.contact_email ? (
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800">
                  To apply, send your resume to{" "}
                  <a href={`mailto:${job.contact_email}`} className="font-medium underline">
                    {job.contact_email}
                  </a>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                  <input
                    type="file"
                    className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Submit Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
