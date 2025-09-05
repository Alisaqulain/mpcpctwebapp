"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  
  const type = searchParams.get("type");
  const plan = searchParams.get("plan");

  const plans = {
    learning: {
      basic: { price: 299, duration: 30, name: "Learning Basic" },
      premium: { price: 599, duration: 90, name: "Learning Premium" },
      lifetime: { price: 1999, duration: 36500, name: "Learning Lifetime" }
    },
    skill: {
      basic: { price: 199, duration: 30, name: "Skill Basic" },
      premium: { price: 499, duration: 90, name: "Skill Premium" },
      lifetime: { price: 1499, duration: 36500, name: "Skill Lifetime" }
    },
    exam: {
      basic: { price: 399, duration: 30, name: "Exam Basic" },
      premium: { price: 799, duration: 90, name: "Exam Premium" },
      lifetime: { price: 2499, duration: 36500, name: "Exam Lifetime" }
    }
  };

  const selectedPlan = plans[type]?.[plan];

  useEffect(() => {
    if (!type || !plan || !selectedPlan) {
      router.push("/price");
    }
  }, [type, plan, selectedPlan, router]);

  const handlePayment = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      // For now, simulate payment success
      // In production, integrate with Razorpay/Stripe
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          plan,
          amount: selectedPlan.price,
          duration: selectedPlan.duration,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Payment successful! Your subscription is now active.");
        router.push("/profile");
      } else {
        const error = await response.json();
        alert(`Payment failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Plan</h1>
          <p className="text-gray-600 mb-4">Please select a valid plan from the pricing page.</p>
          <button
            onClick={() => router.push("/price")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Go to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600">
              You're about to subscribe to {selectedPlan.name}
            </p>
          </div>

          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {selectedPlan.duration === 36500 ? "Lifetime" : `${selectedPlan.duration} days`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Content Type:</span>
                <span className="font-medium capitalize">{type}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-purple-600">₹{selectedPlan.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Razorpay (Credit/Debit Cards, UPI, Net Banking)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Cash on Delivery (Coming Soon)</span>
              </label>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-8">
            <label className="flex items-start">
              <input type="checkbox" className="mr-3 mt-1" required />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 rounded-lg text-xl font-semibold shadow-lg transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ₹${selectedPlan.price}`
            )}
          </button>

          {/* Back Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/price")}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
