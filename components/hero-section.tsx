"use client";
import React from "react";
import { SearchBar } from "@/components/ui/search-bar";



export const HeroSection = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"

      style={{
        background:
          "linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(238, 174, 202, 0.14) 72%, rgba(39, 93, 245, 0.11) 100%)"
      }}
    >
      {/* Content */}
      <div className="flex flex-col justify-center items-center min-h-screen px-3 md:px-8 space-y-8 w-full mx-auto ">

        {/* Headline */}
        <div className="text-center space-y-4 fade-in w-full max-w-5xl ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ">
            Find Your Nursing Job in
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ">
            Australia
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray max-w-4xl mx-auto">
           Vfind helps nurses and healthcare professionals find the right jobs, while making it easier for aged care providers to hire the right people—fast, secure, and reliable.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-lg md:max-w-2xl slide-up">
          <SearchBar />
        </div>

      </div>
    </section>
  );
};
