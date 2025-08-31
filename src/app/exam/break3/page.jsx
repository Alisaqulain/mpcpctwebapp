"use client";
import React, { useState, useEffect } from "react";

export default function BreakScreen() {
  const [seconds, setSeconds] = useState(60);
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Retrieve exam login data from localStorage
    const storedData = localStorage.getItem('examLoginData');
    if (storedData) {
      try {
        setExamData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing exam data:', error);
      }
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center mt-[-110]">
      <div className="w-full bg-[#290c52] text-yellow-400 text-left px-4 py-2 font-bold text-lg">
        MPCPCTMASTER 2025
      </div>

      <div className="flex flex-col items-center py-10 space-y-2 w-full">
        <img
          src="/lo.jpg"
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />
        <p className="text-xl font-semibold">{examData?.name || "anas"}</p>
        {examData && (
          <div className="text-xs text-center text-gray-600">
            <p>{examData.mobile}</p>
            <p>{examData.city}</p>
          </div>
        )}
        <div className="mt-4 text-center">
        <p className="text-base font-semibold">
          <span className="italic">Test End -</span>{" "}
          <span className="text-gray-600 italic">Cpctmaster.com</span>
        </p>

        <p className="mt-4 text-sm text-gray-800">
          Results Declared. Click the{' '}
          <span className="font-semibold">'Show Result'</span> button to view your full
          assessment.
        </p>

        <p className="text-sm mt-1 text-red-400 italic">
          This mock test is provided by{" "}
          <a href="https://cpctmaster.com" className="text-blue-600 underline" target="_blank" rel="noreferrer">
            cpctmaster.com
          </a>{" "}
          and does not guarantee similar performance or outcomes in actual examinations.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded">
         <a href="/result/topic"> Show Full Result </a>
        </button>
       
      </div>

      </div>
    </div>
  );
}
