"use client";

import React, { Suspense } from "react";

import { Navbar } from './components/Navbar'
import Jobdata from './components/Jobdata';


const NurseDashboard = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Jobdata />
      
        <Navbar />
      </Suspense>
    </>
  );
}

export default NurseDashboard

