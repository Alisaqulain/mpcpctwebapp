"use client";
import React, { useState } from "react";

const App = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const validateMobile = (value) => {
    if (!value) return "Mobile number is required";
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number";
    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setMobile(val);
    const validationError = validateMobile(val);
    setError(validationError);
  };

  return (
    <div className="p-4">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row justify-between mt-6 gap-6">
        {/* Left Side Boxes */}
        <div className="flex flex-wrap justify-center mt-20 animate-fadeInUp gap-4 gap-x-15 w-full">
          {["Learning", "Skill Test", "Exam Mode"].map((item) => (
            <div
              key={item}
              className="w-full sm:w-80 h-64 border-2 border-gray-500 flex items-center justify-center text-center font-medium
                         bg-white
                         transition-transform duration-300 ease-in-out
                         hover:scale-105 hover:shadow-lg cursor-pointer
                         rounded"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right Side Login Box */}
        <div className="w-full md:w-64 bg-gray-50 shadow-md p-4 space-y-4 py-20  mr-[-15px] h-[520px] rounded animate-fadeInUp">
          <div className="font-semibold text-3xl mt-[-30px] text-center">
            Existing user
          </div>
          <input
            type="text"
            placeholder="Mob. No."
            value={mobile}
            onChange={handleChange}
            className={`w-full border px-2 py-1 mt-5 rounded focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-red-400"
            }`}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          <button
            className="w-full bg-red-600 text-white py-2 cursor-pointer rounded
                       transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!error || mobile.length === 0}
          >
            <a href="/login" className="block">
              Login
            </a>
          </button>
          <div className="border-t pt-2 mt-5">
            <div className="text-gray-700 mt-5 text-center">NEW USER</div>
            <button className="w-full mt-3 bg-pink-200 text-red-700 font-semibold py-2 cursor-pointer rounded
                               transition-transform duration-300 ease-in-out
                               hover:scale-105 hover:shadow-lg">
              <a href="/signup" className="block">
                Register Now!
              </a>
            </button>
          </div>
          <div>
            <img
              src="/mpc.png"
              alt="MPCPCT Logo"
              className="w-20 h-20 mx-auto mt-5"
            />
            <p className="text-center text-sm text-gray-600 mt-2">
              MPCPCT - Empowering Education
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 mx-auto max-w-3xl bg-black text-white p-4 rounded shadow text-center text-sm italic">
        basic Computer & Typing skill are important for data entry/It operator/
        Assistant Grade 3/Shorthand/ Typist and other similar positions in the
        departments, corporation and agencies under government of India
      </div>

      {/* Tailwind Animation styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default App;
