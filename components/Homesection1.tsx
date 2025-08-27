"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join Australia’s most trusted platform for healthcare professionals.  
            Create your profile, connect with recruiters, and get hired faster.
          </p>
          <div className="mt-6 flex flex-row sm:flex-row gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition"
            >
              Get Hired Now
            </Link>
            <Link
              href="/sigin"
              className="px-8 py-3 bg-white-600 text-black rounded-full text-lg font-medium hover:bg-black-700 transition"
            >
              Hire Nurses
            </Link>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center">
          <Image
          priority
          width={500}
          height={500}
            src="/assets/nurse.png"
            alt="Nurse Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
