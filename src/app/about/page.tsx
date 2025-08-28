"use client";

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">About VFind</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        VFind is a modern job-matching platform designed to simplify the hiring
        process. Our mission is to connect talented job seekers with employers
        who are searching for the right skills. Whether you are a recent
        graduate looking for your first role or a company searching for top
        talent, VFind provides the tools and features to make the process smooth
        and transparent.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        What We Offer
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Seamless job search with category, skill, and location filters</li>
        <li>Employer dashboards to post and manage job openings</li>
        <li>Secure login/signup for seekers and employers</li>
        <li>Personalized recommendations for better matches</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        Our Vision
      </h2>
      <p className="text-gray-700 leading-relaxed">
        At VFind, we envision a future where hiring is faster, fairer, and more
        accessible. By leveraging technology, we aim to reduce the gap between
        employers and job seekers, making career opportunities more reachable
        for everyone.
      </p>
    </section>
  );
}
