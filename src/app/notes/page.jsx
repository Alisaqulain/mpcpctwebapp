"use client";
import React from "react";

export default function ExamSection() {
  return (
    <div className="min-h-screen flex justify-center bg-[#fff] px-4 py-10">
      <div className="w-full max-w-4xl border border-gray-300 px-4 sm:px-6 md:px-10 lg:px-15 pt-10 sm:pt-14 md:pt-20 rounded-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[#290c52]">
          Important Notes
        </h1>

        {/* Exam Card (Only One) */}
        <div className="relative border border-gray-200 rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#290c52] hover:text-white transition-colors duration-300">
          {/* Title */}
          <div className="text-md font-medium pl-2 sm:pl-4">
            Unit 1 : What is Computer
          </div>

          {/* Download Button */}
          <button className="relative bg-pink-300 hover:bg-yellow-500 text-black px-6 py-3 mx-auto md:mx-0 text-sm font-semibold rounded-md shadow-md">
            <a href="#">Download</a>
          </button>
        </div>
      </div>
    </div>
  );
}
