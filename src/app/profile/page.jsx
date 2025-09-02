"use client";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log("Fetching profile data...");
        
        const response = await fetch("/api/profile");
        console.log("Profile response status:", response.status);
        
        const data = await response.json();
        console.log("Profile response data:", data);
        
        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          setError(data.error || "Failed to load profile");
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    try {
      const url = localStorage.getItem('lastResultHtmlUrl');
      if (url) setResultUrl(url);
    } catch {}
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <a 
              href="/login" 
              className="block w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Go to Login
            </a>
            <a 
              href="/signup" 
              className="block w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
          <div className="text-gray-500 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <a 
            href="/login" 
            className="block w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
        <div className="group">
          <img
            src={user.profileUrl || "/user.jpg"}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow-lg transform transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/user.jpg";
            }}
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

        {resultUrl && (
          <div className="mt-6">
            <a href={resultUrl} target="_blank" rel="noreferrer" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">View Last Result PDF</a>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="text-gray-800">{value || "Not provided"}</span>
    </div>
  );
}
