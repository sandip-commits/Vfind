"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [] = useState(false);
  // const [isEmployerDropdownOpen, setIsEmployerDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isForEmployersDropdownOpen, setIsForEmployersDropdownOpen] = useState(false);

  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-2">
        <div className="flex justify-between h-15  ">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                VFind
              </span>
            </Link>
          </div>

          {/* Logo */}
          <div className="flex items-center">


            {/* Desktop Navigation */}
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <Link
                href="/blogs"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Resources
              </Link>

              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/browse-jobs"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* For Seekers */}
            <div className="relative">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="flex items-center text-black px-4 py-2 text-sm font-medium"
              >
                For Seekers
                <ChevronDown
                  className={`ml-2 w-4 h-4 text-red-500 transition-transform duration-300 ${isAuthDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isAuthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-45 bg-white rounded-md shadow-lg border z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/signin"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Create an Account
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* For Employers */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsForEmployersDropdownOpen(!isForEmployersDropdownOpen)
                }
                className="flex items-center text-black px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                For Employers
                <ChevronDown
                  className={`ml-2 w-4 h-4 text-red-500 transition-transform duration-300 ${isForEmployersDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isForEmployersDropdownOpen && (
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg border z-50 mt-2">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/employerloginpage"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/foremployer"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Create an Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/foremployer"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Post a Free Jobs
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile / Tablet menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900">
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/browse-jobs"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              Browse jobs
            </Link>

            {/* For Seekers */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="bg-blue-600 text-white w-full text-left flex justify-between items-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"

              >
                For Seekers
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${isAuthDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isAuthDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/signin"
                    className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 "
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600"
                  >
                    Create an Account
                  </Link>
                </div>
              )}
            </div>

            {/* For Employers */}
            <div className="px-4 py-2">
              <button
                onClick={() =>
                  setIsForEmployersDropdownOpen(!isForEmployersDropdownOpen)
                }
                className="bg-blue-600 text-white w-full text-left flex justify-between items-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                For Employers
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${isForEmployersDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isForEmployersDropdownOpen && (
                <div className="pl-4 mt-2 space-y-2 ">
                  <Link
                    href="/employerloginpage"
                    className="block  px-2 py-1  text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/foremployer"
                    className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600"
                  >
                    Create an Account
                  </Link>
                  <Link
                    href="/foreemployer"
                    className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600"
                  >
                    Post a Free Jobs
                  </Link>
                </div>
              )}
            </div>


          </div>
        )}
      </div>
    </nav>
  );
}
