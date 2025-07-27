"use client";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => console.error("Profile fetch failed", err));
  }, []);

  if (!user) {
    return <div className="text-center p-10">User not found or not logged in.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
        <div className="group">
          <img
            src={user.profileUrl}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow-lg transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-6">MPCPCT Student</p>

        <div className="mt-6 text-left space-y-4">
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Mobile" value={user.phoneNumber} />
          <InfoRow label="City" value={user.city} />
          <InfoRow label="State" value={user.states} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
