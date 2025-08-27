"use client";
import React from "react";

interface LoaderProps {
  loading?: boolean;
  error?: string | null;
  message?: string;
}

export default function Loader({ loading = false, error = null, message = "Loading..." }: LoaderProps) {
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-4xl mx-auto mt-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    );
  }

  return null;
}


// use these for loder
{/* <Loader loading={loading} error={error} /> */}
{/* <Loader loading={true} message="Fetching jobs..." /> */}
{/* <Loader error="Failed to fetch jobs. Please try again later." /> */}

