"use client";

import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">🚧 Still Developing</h1>
        <p className="text-lg text-gray-600 mb-6">
          This page is currently under development. We are working hard to bring it to you soon!
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
