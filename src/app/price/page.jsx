"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("learning");
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const plans = {
    learning: {
      basic: { price: 299, duration: 30, name: "Learning Basic", features: ["Access to all learning content", "30 days validity", "Email support"] },
      premium: { price: 599, duration: 90, name: "Learning Premium", features: ["All Basic features", "90 days validity", "Priority support", "Download certificates"] },
      lifetime: { price: 1999, duration: 36500, name: "Learning Lifetime", features: ["All Premium features", "Lifetime access", "Premium support", "All future updates"] }
    },
    skill: {
      basic: { price: 199, duration: 30, name: "Skill Basic", features: ["Access to skill tests", "30 days validity", "Basic analytics"] },
      premium: { price: 499, duration: 90, name: "Skill Premium", features: ["All Basic features", "90 days validity", "Advanced analytics", "Progress tracking"] },
      lifetime: { price: 1499, duration: 36500, name: "Skill Lifetime", features: ["All Premium features", "Lifetime access", "Unlimited skill tests", "All future updates"] }
    },
    exam: {
      basic: { price: 399, duration: 30, name: "Exam Basic", features: ["Access to exam mode", "30 days validity", "Basic results"] },
      premium: { price: 799, duration: 90, name: "Exam Premium", features: ["All Basic features", "90 days validity", "Detailed analytics", "Performance insights"] },
      lifetime: { price: 2499, duration: 36500, name: "Exam Lifetime", features: ["All Premium features", "Lifetime access", "Unlimited exams", "All future updates"] }
    }
  };

  const handleSubscribe = async () => {
    try {
      // For now, redirect to a payment page
      // You can integrate with Razorpay, Stripe, etc.
      router.push(`/payment?type=${selectedType}&plan=${selectedPlan}`);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock premium content and accelerate your learning journey
          </p>
        </div>

        {/* Content Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {["learning", "skill", "exam"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  selectedType === type
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans[selectedType]).map(([planKey, plan]) => (
            <div
              key={planKey}
              className={`bg-white rounded-2xl shadow-xl p-8 transition-all hover:scale-105 ${
                selectedPlan === planKey
                  ? "ring-4 ring-purple-500 border-purple-500"
                  : "border border-gray-200"
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-purple-600 mb-1">
                  ₹{plan.price}
                </div>
                <div className="text-gray-500">
                  {plan.duration === 36500 ? "Lifetime" : `${plan.duration} days`}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(planKey)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  selectedPlan === planKey
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {selectedPlan === planKey ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-all hover:scale-105"
          >
            Subscribe Now - ₹{plans[selectedType][selectedPlan].price}
          </button>
        </div>

        {/* Free Trial Info */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            <strong>Free Trial:</strong> Try one lesson/exam for free in each category!
          </p>
          <p className="text-sm mt-2">
            Already have access? <a href="/profile" className="text-purple-600 hover:underline">Check your subscription</a>
          </p>
        </div>
      </div>
    </div>
  );
}
