
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    states: "",
    city: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          // User is logged in, redirect to profile
          router.push("/profile");
          return;
        }
      } catch (err) {
        // Ignore errors, user is not logged in
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Get the redirect URL from query parameters
  const redirectUrl = searchParams.get("redirect") || "/profile";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword || !formData.states || !formData.city) {
      setError("All fields are required.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed.");
        setIsLoading(false);
      } else {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-600">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-[#290c52]">
            Create Account
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Join MPCPCT today...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300"
              placeholder="Full Name"
              required
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              Full Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          {/* Phone Number Input */}
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300"
              placeholder="Phone Number"
              required
              pattern="[0-9]{10}"
            />
            <label
              htmlFor="phoneNumber"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              Phone Number
            </label>
          </div>

          {/* State Input */}
          <div className="relative">
            <input
              type="text"
              id="states"
              name="states"
              value={formData.states}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300"
              placeholder="State"
              required
            />
            <label
              htmlFor="states"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              State
            </label>
          </div>

          {/* City Input */}
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300"
              placeholder="City"
              required
            />
            <label
              htmlFor="city"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              City
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300 pr-12"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500 transition-all duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="peer px-4 py-3 w-full bg-transparent border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-transparent transition-all duration-300 pr-12"
              placeholder="Confirm Password"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-blue-600"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500 transition-all duration-200"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Bottom Links */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href={`/login${redirectUrl !== "/profile" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="text-blue-600 hover:text-blue-400 hover:underline transition-all duration-200"
              >
                Login
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#290c52] text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
            aria-label={isLoading ? "Creating account..." : "Create Account"}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-50"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.2A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Feedback messages */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-600 animate-fade">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 text-center text-sm text-green-600 animate-fade">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
