"use client";
import React from "react";
import { IndianRupee as RupeeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
const ReservationPage = () => {
  const router = useRouter();

  const handlePayClick = () => {
    router.push("/payment-app/debit-card");
  };

   const rander = [{
    nri : "1,999",
    rup : "8,000",
    
  }];

  return (
    <div className="min-h-screen bg-[#fff] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Application submitted message */}
        <div className="bg-[#F7FFEF] text-[#333333] text-center py-8 px-2 rounded-md font-medium text-2xl">
          Full Stack Development Placement Guarantee Course <br />
          <span className="text-sm text-[#13800D]">
            Application submitted! Our counselor will call you shortly
          </span>
        </div>

        {/* Reservation card */}
        <div className="border border-blue-200 rounded-bl-md rounded-br-md">
          <div className="bg-whit rounded-md p-6 space-y-6">
            <h2 className="text-center text-lg text-[#484848]">
              Reserve your seat at <RupeeIcon className="w-4 h-4 inline-block" />{rander[0].nri} only
            </h2>

            <div className="bg-gray-100 p-4 rounded-md text-center space-y-1 text-[#484848] w-[70%] mx-auto">
              <div className="py-2">
                <p className="font-medium">Why reserve your seat now?</p>
                <p className="text-sm">
                  Get <span className="text-green-600 font-semibold"><RupeeIcon className="w-4 h-4 inline-block" />{rander[0].rup}</span> discount on course fee <br />
                  Priority seat in the next batch
                </p>
              </div>
            </div>

            <button
              className="w-[60%] mx-auto bg-[#290c52] text-white py-2 rounded-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
              onClick={handlePayClick}
            >
              Pay <RupeeIcon className="w-4 h-4 inline-block" /> {rander[0].nri}
            </button>

           <div className="flex justify-center">
  <input
    type="text"
    placeholder="Enter your coupon code"
    className="border border-gray-300 rounded-md p-2 w-[70%] text-center focus:outline-none focus:ring-2 focus:ring-[#290c52]"
  />
</div>
   <button
              className="w-[60%] mx-auto bg-green-500 text-white py-2 rounded-sm font-medium flex items-center justify-center gap-1 cursor-pointer"
            
            >
              Apply Now 
            </button>

            <p className="text-xs text-center text-[#666666]">
              The booking amount will be adjusted in the course fee. If not selected, it will be refunded.
            </p>
          </div>

          {/* Countdown offer */}
          <div className="bg-blue-100 text-center text-sm text-[#484848] py-2">
            Offer ends in 04:54s
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
