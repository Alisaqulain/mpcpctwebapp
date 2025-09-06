"use client";
import React, { useState } from "react";

export default function ExamSection() {
  const [activeTab, setActiveTab] = useState("exam");

  const tabs = [
    { id: "notes", label: "CPCT" },
    { id: "paperset", label: "RSCIT" },
    { id: "test", label: "CCC" },
    { id: "exam", label: "TOPIC WISE" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">Exam Mode</h1>

        {/* Tab Navigation */}
        <div className="flex border border-gray-300 rounded-full overflow-hidden shadow-sm mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-1/4 py-2 text-[10px] md:text-sm font-medium transition-colors duration-300 border-l border-gray-300 ${
                activeTab === tab.id
                  ? "bg-[#290c52] text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Exam Card */}
        {activeTab === "exam" && (
          <div className="relative border border-gray-200 rounded-xl shadow-md p-4 flex justify-between items-center hover:bg-[#290c52] hover:text-white transition-colors duration-300">
            {/* Red corner ribbon */}
            <div className="absolute top-[-7] left-[-9]">
              <img src="/newr.png"
               alt="" className="w-18 h-14" />
            </div>

            {/* Title */}
            <div className="text-md font-medium pl-4">May 2025 - Paper 1</div>

            {/* Start Exam Button */}
             <button className="relative bg-pink-300 hover:bg-yellow-500 text-black px-4  md:px-6 py-3 text-sm font-semibold rounded-md shadow-md">
             <a href="/exam/exam-login"> Start Exam</a>
             <img src="/new1.png" alt="" className="w-12 h-14 top-[-16] right-[-12] absolute" />
            </button>
          </div>
        )}
        {/* Exam Card */}
        {activeTab === "test" && (
          <div className="relative border border-gray-200 rounded-xl shadow-md p-4 flex justify-between items-center hover:bg-[#290c52] hover:text-white transition-colors duration-300">
            {/* Red corner ribbon */}
            <div className="absolute top-[-7] left-[-9]">
              <img src="/newr.png"
               alt="" className="w-18 h-14" />
            </div>

            {/* Title */}
            <div className="text-md font-medium pl-4">May 2025 - Paper 1</div>

            {/* Start Exam Button */}
            <button className="relative bg-pink-300 hover:bg-yellow-500 text-black px-4  md:px-6  py-3 text-sm font-semibold rounded-md shadow-md">
             <a href="/result/ccc"> Start Exam</a>
             <img src="/new1.png" alt="" className="w-12 h-14 top-[-16] right-[-12] absolute" />
            </button>
          </div>
        )}
        {/* Exam Card */}
        {activeTab === "paperset" && (
          <div className="relative border border-gray-200 rounded-xl shadow-md p-4 flex justify-between items-center hover:bg-[#290c52] hover:text-white transition-colors duration-300">
            {/* Red corner ribbon */}
            <div className="absolute top-[-7] left-[-9]">
              <img src="/newr.png"
               alt="" className="w-18 h-14" />
            </div>

            {/* Title */}
            <div className="text-md font-medium pl-4">May 2025 - Paper 1</div>

            {/* Start Exam Button */}
           <button className="relative bg-pink-300 hover:bg-yellow-500 text-black  px-4  md:px-6  py-3 text-sm font-semibold rounded-md shadow-md">
             <a href="/result/rscit"> Start Exam</a>
             <img src="/new1.png" alt="" className="w-12 h-14 top-[-16] right-[-12] absolute" />
            </button>
          </div>
        )}
        {/* Exam Card */}
        {activeTab === "notes" && (
          <div className="relative border border-gray-200 rounded-xl shadow-md p-4 flex justify-between items-center hover:bg-[#290c52] hover:text-white transition-colors duration-300">
            {/* Red corner ribbon */}
            <div className="absolute top-[-7] left-[-9]">
              <img src="/newr.png"
               alt="" className="w-18 h-14" />
            </div>

            {/* Title */}
            <div className="text-md font-medium pl-4">May 2025 - Paper 1</div>

            {/* Start Exam Button */}
            <button className="relative bg-pink-300 hover:bg-yellow-500 text-black  px-4  md:px-6  py-3 text-sm font-semibold rounded-md shadow-md">
             <a href="/result/topic"> Start Exam</a>
             <img src="/new1.png" alt="" className="w-12 h-14 top-[-16] right-[-12] absolute" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
