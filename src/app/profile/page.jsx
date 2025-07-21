import React from "react";

export default function ProfilePage() {
  const user = {
    name: "Mohd. Anas",
    email: "anas@example.com",
    mobile: "+91 9876543210",
    planExpiry: "2025-12-31",
    city: "Mumbai",
    state: "Maharashtra",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-4">
      <div
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center transform transition-all duration-700"
        style={{
          animation: "fadeIn 0.6s ease-out",
        }}
      >
        <div className="group">
          <img
            src={user.image}
            alt="User"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow-lg transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-6">MPCPCT Student</p>

        <div className="mt-6 text-left space-y-4">
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Mobile" value={user.mobile} />
          <InfoRow label="City" value={user.city} />
          <InfoRow label="State" value={user.state} />
          <InfoRow label="Plan Expiry" value={user.planExpiry} isExpiry />
        </div>
      </div>

      {/* Inline CSS keyframe animation inside JSX */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ label, value, isExpiry = false }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className={isExpiry ? "text-red-600 font-semibold" : "text-gray-800"}>
        {value}
      </span>
    </div>
  );
}
