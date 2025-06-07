"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10-15 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
      valid = false;
    } else if (formData.newPassword === formData.oldPassword) {
      newErrors.newPassword = "New password must be different from current password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({ ...errors, oldPassword: "", newPassword: "" });
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log("Password change submitted:", formData);
      alert("Password changed successfully!");
      // Reset form and return to step 1
      setFormData({
        email: "",
        phone: "",
        oldPassword: "",
        newPassword: "",
      });
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center">
          {step === 1 ? "Forgot Password" : "Create New Password"}
        </h2>

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleVerify} noValidate>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
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

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300`}
                placeholder="Phone Number"
                required
                pattern="\d{10,15}"
                aria-describedby="phone-error"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Phone Number
              </label>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="phone-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-3 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200"
              aria-label="Verify"
            >
              Verify
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6" onSubmit={handleChangePassword} noValidate>
            {/* Old Password */}
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.oldPassword ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-12`}
                placeholder="Current Password"
                required
                aria-describedby="oldPassword-error"
              />
              <label
                htmlFor="oldPassword"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                Current Password
              </label>
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.oldPassword && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="oldPassword-error">
                  {errors.oldPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`peer w-full bg-transparent border-2 ${errors.newPassword ? "border-red-500" : "border-gray-200"} rounded-lg py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-12`}
                placeholder="New Password"
                required
                aria-describedby="newPassword-error"
              />
              <label
                htmlFor="newPassword"
                className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                New Password (8+ characters)
              </label>
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500 animate-fade-in" id="newPassword-error">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-3 text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-200"
              aria-label="Change Password"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}