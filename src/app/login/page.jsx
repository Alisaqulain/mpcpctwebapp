"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!phone || !password) {
      setError("Phone number and password are required.");
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number (10-15 digits).");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        password,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        setSuccess("Login successful! Redirecting...");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
     
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#290c52] tracking-tight">
            Welcome to MPCPCT
          </h2>
          <p className="mt-2 text-gray-600 text-lg font-medium">
            Sign in to connet with us 
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Input */}
          <div className="relative">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="peer w-full bg-transparent border-2 border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300"
              placeholder="Phone Number"
              required
              pattern="[0-9]{10,15}"
              aria-describedby="phone-error"
            />
            <label
              htmlFor="phone"
              className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Phone Number
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent border-2 border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-12"
              placeholder="Password"
              required
              aria-describedby="password-error"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="flex items-center gap-2">
              <p className="text-gray-600">No account?</p>
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-all duration-300"
              >
                Sign Up
              </a>
            </div>
            <a
              href="/forget"
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-all duration-300"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#290c52] text-white rounded-lg py-3 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200"
            aria-label={isLoading ? "Logging in" : "Login"}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Feedback Messages */}
        {error && (
          <p
            className="text-red-500 text-center text-sm mt-4 animate-fade-in"
            id="phone-error password-error"
          >
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center text-sm mt-4 animate-fade-in">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}