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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!phone || !password) {
      setError("Phone number and Password are required.");
      setIsLoading(false);
      return;
    }

    // Optional: simple phone number validation (basic, can be improved)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number.");
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
        setSuccess("Login successful!");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:py-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to the MPCPCT Website
        </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="mt-2 text-center text-xl text-gray-600">
          Login to connect as Student
        </p>
      </div>
        <div className="mt-8 sm:mt-12 w-full max-w-[320px] sm:max-w-sm">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm text-gray-700">Continue with Google</span>
          </button>

          <div className="flex items-center my-6 sm:my-8">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm"
                required
                pattern="[0-9]{10,15}" // HTML pattern validation
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="(8 or more characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div className="text-right mt-3">
                <a
                  href="/forget"
                  className="text-indigo-600 font-[600] text-[12px] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
             <div className="text-left mt-[-20px] flex items-center gap-0.5">
  <p className="text-[#000] font-[600] text-[12px] m-0">
    Don't have an account
  </p>
  <a
    href="/signup"
    className="text-[#db1414] font-[600] text-[12px] hover:underline"
  >
    Sign Up
  </a>
</div>

            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 sm:mt-10 text-gray-500 bg-[#ccffff] border border-gray-300 rounded-md py-2 text-sm font-semibold hover:bg-[#092536]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center text-sm mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}
