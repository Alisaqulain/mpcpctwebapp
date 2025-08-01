
"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
    states: "",
    city: "",
    profile: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
    states: "",
    city: "",
    profile: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name] || errors.general) {
      setErrors({ ...errors, [name]: "", general: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.rePassword) {
      newErrors.rePassword = "Please re-enter your password";
      valid = false;
    } else if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.states) {
      newErrors.states = "State is required";
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }

    if (!formData.profile) {
      newErrors.profile = "Profile picture is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("rePassword", formData.rePassword);
    data.append("states", formData.states);
    data.append("city", formData.city);
    data.append("profile", formData.profile);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || { general: result.error || "Failed to create account" });
        setIsLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        redirect: false,
        phone: result.phone,
        password: formData.password,
      });

      if (signInResult?.error) {
        setErrors({ general: "Failed to sign in after signup. Please try logging in manually." });
        setIsLoading(false);
        return;
      }

      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        rePassword: "",
        states: "",
        city: "",
        profile: null,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ general: "An error occurred. Please try again." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <h2 className="text-4xl font-extrabold text-[#290c52] tracking-tight text-center">
              Welcome to MPCPCT
            </h2>
            <p className="mt-2 text-center text-lg font-medium text-gray-600">
              Sign up to connect with us
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.name ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="Name"
                required
                aria-describedby="name-error"
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Name
              </label>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.phoneNumber ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="Phone Number"
                required
                pattern="\d{10}"
                aria-describedby="phoneNumber-error"
              />
              <label
                htmlFor="phoneNumber"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Phone Number
              </label>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="phoneNumber-error">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.email ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="Email"
                required
                aria-describedby="email-error"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Email
              </label>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.password ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-12`}
                placeholder="Password"
                required
                aria-describedby="password-error"
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Password (8+ characters)
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="password-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="rePassword"
                name="rePassword"
                type={showRePassword ? "text" : "password"}
                value={formData.rePassword}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.rePassword ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-12`}
                placeholder="Re-enter Password"
                required
                aria-describedby="rePassword-error"
              />
              <label
                htmlFor="rePassword"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Re-enter Password
              </label>
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                aria-label={showRePassword ? "Hide password" : "Show password"}
              >
                {showRePassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.rePassword && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="rePassword-error">
                  {errors.rePassword}
                </p>
              )}
            </div>

            <div className="relative">
              <select
                id="states"
                name="states"
                value={formData.states}
                onChange={handleChange}
                className={`peer w-full mt-3 bg-transparent border-2 ${errors.states ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:border-indigo-500 transition-all duration-300 appearance-none`}
                required
                aria-describedby="states-error"
              >
                <option value="" disabled>Select a state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <label
                htmlFor="states"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                State
              </label>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {errors.states && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="states-error">
                  {errors.states}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.city ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="City"
                required
                aria-describedby="city-error"
              />
              <label
                htmlFor="city"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                City
              </label>
              {errors.city && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="city-error">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="profile"
                name="profile"
                type="file"
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.profile ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                required
                aria-describedby="profile-error"
              />
              <label
                htmlFor="profile"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Profile Picture
              </label>
              {errors.profile && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="profile-error">
                  {errors.profile}
                </p>
              )}
            </div>

            {errors.general && (
              <p className="mt-1 text-sm text-red-500 animate-fade-in" id="general-error">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#290c52] text-white rounded-lg py-3 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200"
              aria-label={isLoading ? "Creating account" : "Create Account"}
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
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-medium">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-all duration-300"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
