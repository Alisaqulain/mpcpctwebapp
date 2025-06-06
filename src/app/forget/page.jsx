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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = () => {
    // Add verification logic if needed
    setStep(2);
  };

  const handleChangePassword = () => {
    // Add password change logic here
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {step === 1 ? "Forgot Password" : " Create New Password"}
        </h2>

        {step === 1 && (
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border mt-10 rounded focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded mt-5 focus:outline-none"
              value={formData.phone}
              onChange={handleChange}
            />
            <button
              onClick={handleVerify}
              className="w-full bg-blue-500 mt-5 text-white py-2 rounded transition"
            >
              Verify
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {/* Old Password Field */}
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded mt-10 focus:outline-none"
                value={formData.oldPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute top-1/2 right-3 mt-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? <Eye size={20} /> : <EyeOff  size={20} />}
              </button>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="re-enter new password"
                className="w-full px-4 py-2 border rounded mt-5 focus:outline-none"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 mt-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff  size={20} />}
              </button>
            </div>

            <button
              onClick={handleChangePassword}
              className="w-full bg-green-500 mt-5 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
