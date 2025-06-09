import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#290c52] text-white px-6 py-10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300">
            <span className="font-mono text-lg">Mpcpct.com</span> is your go-to platform for CPCT exam typing preparation. We offer English and Hindi typing practice, typing tests, MCQ tests, study notes, and a realistic exam mode to boost your confidence. Our goal is to help you improve your skills and pass the CPCT exam with ease.
          </p>
        </div>

        {/* Copyright */}
        <div>
          <h3 className="text-lg font-semibold mb-4">© Copyright - <span className="font-mono text-lg">Mpcpct.com</span></h3>
          <p className="text-gray-300">
            © 2025 <span className="font-mono">Mpcpct.com</span>. All rights reserved. The content, design, and materials on this website—including text, graphics, logos, and software—are the property of <span className="font-mono">Mpcpct.com</span> and protected under Indian and international copyright laws.
          </p>
          <p className="italic text-gray-400 mt-2">
            Unauthorized reproduction, distribution, or modification without prior written permission is strictly prohibited. For inquiries, contact us.
          </p>
        </div>

        {/* Exam Hub */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Exam Preparation Hub</h3>
          <div className="grid grid-cols-2 gap-4">
            {["CPCT", "LDC", "SSC", "RSCIT"].map((exam) => (
              <div
                key={exam}
                className="flex items-center justify-center border border-gray-500 rounded-full px-3 py-5 bg-black"
              >
                <div className="text-center">
                  <span className="block text-lg mt-1">{exam}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Enquiry */}
      <div className="max-w-7xl mx-auto mt-10">
        <h3 className="text-white font-semibold mb-2">Mobile Enquiry</h3>
        <div className="flex w-full max-w-md rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Enter Mobile"
            className="w-full px-4 py-2 text-white outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button className="bg-orange-400 px-6 py-2 text-black font-semibold">
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}
