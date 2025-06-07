"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const items = [
  { label: "Learning", img: "/learn.jpg" },
  { label: "Skill Test", img: "/skill.webp" },
  { label: "Exam Mode", img: "/exam.jpg" },
];

const App = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateMobile = (value) => {
    if (!value) return "Mobile number is required";
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number";
    return "";
  };

  const handleMobileChange = (e) => {
    const val = e.target.value;
    setMobile(val);
    setError(validateMobile(val));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-gray-200 bg-opacity-60">
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-6">
            {/* Left Section */}
            <div className="flex flex-wrap justify-center mt-20 animate-fadeInUp gap-6 w-full">
              {items.map(({ label, img }) => (
                <div
                  key={label}
                  className="w-full sm:w-80 h-64 border-2 border-gray-500 flex flex-col items-center justify-center text-center font-medium bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer rounded-lg p-4"
                >
                  <img
                    src={img}
                    alt={`${label} icon`}
                    className="w-54 h-34 mb-3 object-contain"
                  />
                  <span className="text-lg font-semibold">{label}</span>
                </div>
              ))}
            </div>

            {/* Right Side Login Box */}
            <div className="w-full md:w-64 bg-gray-50 shadow-md p-4 space-y-4 py-20 mr-[-15px] h-[550px] rounded animate-fadeInUp">
              <div className="font-semibold text-2xl mt-[-30px] text-center">
                Existing user
              </div>

              {/* Mobile Input */}
              <input
                type="text"
                placeholder="Mob. No."
                value={mobile}
                onChange={handleMobileChange}
                className={`w-full border px-2 py-1 mt-5 rounded focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-red-400"
                }`}
              />

              {/* Password Input */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 pr-10 ${
                    error
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-red-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

              {/* Login Button */}
              <button
                className="w-full bg-red-600 text-white py-2 cursor-pointer rounded transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!error || mobile.length === 0 || password.length === 0}
              >
                <a href="/login" className="block">
                  Login
                </a>
              </button>

              {/* Register Section */}
              <div className="border-t pt-2 mt-5">
                <div className="text-gray-700 mt-5 text-center">NEW USER</div>
                <button
                  className="w-full mt-3 bg-pink-200 text-red-700 font-semibold py-2 cursor-pointer rounded transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <a href="/signup" className="block">
                    Register Now!
                  </a>
                </button>
              </div>

              {/* Logo */}
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
          <div className="mt-12 mx-auto max-w-3xl bg-black bg-opacity-70 text-white p-4 rounded shadow text-center text-sm italic">
            Basic computer & typing skills are important for Data Entry, IT Operator, Assistant Grade-3, Shorthand, Typist and other similar positions in departments, corporations and agencies under Government of India.
          </div>

          {/* Animation Styles */}
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
      </div>
    </div>
  );
};

export default App;
