"use client";
import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loading";

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

export default function JobData() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minExperience, setMinExperience] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://x8ki-letl-twmt.n7.xano.io/api:W58sMfI8/jobs"
        );
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data); // initial
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Open job in new tab
  const handleViewDetails = (job: Job) => {
    const url = `/nurseProfile/jobapplicationpage/${job.id}`;
    window.open(url, "_blank");
  };

  // Filter Logic
  useEffect(() => {
    let temp = [...jobs];

    if (locationFilter) {
      temp = temp.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      temp = temp.filter((job) => job.type === typeFilter);
    }

    if (minExperience) {
      temp = temp.filter(
        (job) => parseInt(job.experienceMin) >= parseInt(minExperience)
      );
    }

    setFilteredJobs(temp);
  }, [locationFilter, typeFilter, minExperience, jobs]);

  if (loading) return <Loader loading={true} />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-8 container mx-auto">
      {/* Left Filter Sidebar */}
      <div className="md:w-1/4 w-full h-fit rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Job Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Casual">Open to any</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Minimum Experience (Years)</label>
          <input
            type="number"
            min="0"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <button
          onClick={() => {
            setLocationFilter("");
            setTypeFilter("");
            setMinExperience("");
          }}
          className="w-full bg-gray-200 hover:bg-gray-300 rounded p-2 mt-2 text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Right Job Cards */}
      <div className="md:w-3/4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600 col-span-full">No jobs match the selected filters.</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company || "Healthcare Facility"}</p>

                <div className="mt-4 space-y-2">
                  <p>{job.location}</p>
                  <p>${job.minPay} - ${job.maxPay}/hr</p>
                  <p>{job.experienceMin}+ years experience</p>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(job)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                View Details & Apply
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
