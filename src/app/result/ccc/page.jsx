import React from "react";

export default function CpctScoreCard() {
  return (
      <div>
    <div className="max-w-4xl mx-auto border border-[#290c52] shadow-xl text-sm font-sans bg-white my-5">
      {/* Full-Width Header */}
      <div
        className="w-full px-2 sm:px-4 py-2 border"
        style={{
          backgroundColor: "#290c52",
          backgroundImage: "url('/bg.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          {/* Left Logo - shown on top on mobile, left on desktop */}
          <img
            src="/logor.png"
            alt="MP Logo"
            className="h-16 sm:h-24 w-auto mt-1 sm:mt-0 order-1 sm:order-none"
          />

          {/* Center Title */}
          <div className="text-center flex-1 sm:-ml-12 order-3 sm:order-none mt-2 sm:mt-0">
            <h1
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase leading-[1.2] text-white"
              style={{
                textShadow: `
                  0 0 10px black,
                  1px 1px 0 #39245f,
                  2px 2px 0 #341f57,
                  3px 3px 0 #2d1a4e,
                  4px 4px 0 #241244,
                  5px 5px 6px rgba(0, 0, 0, 0.4)
                `,
                letterSpacing: '2px',
              }}
            >
              MPCPCT
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl text-pink-300 font-semibold">
              (To Help in typing & computer proficiency)
            </p>
          </div>

          {/* Empty div to balance flex on mobile */}
          <div className="order-2 sm:order-none sm:h-24 w-0 sm:w-auto"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4 font-semibold text-lg mt-2 py-4 relative">
        {/* Student Photo */}
        <img
          src="/lo.jpg"
          alt="Student"
          className="w-16 sm:w-24 h-12 sm:h-20 border ml-2 absolute left-0 top-[19] md:top-1/2 transform -translate-y-1/2"
        />
        <p className="uppercase font-semibold text-xl sm:text-2xl">Result</p>
        <p className="text-xl sm:text-2xl">CCC Examination 2025-26</p>
      </div>

      {/* Details Table */}
      <div className="overflow-x-auto text-xs sm:text-sm border border-gray-300 w-full max-w-full mx-auto">
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr className="border border-black">
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Name of Student</td>
              <td className="border border-black px-1 sm:px-2 py-1">__________</td>
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Result Date</td>
              <td className="border border-black px-1 sm:px-2 py-1">date & Time</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Roll No</td>
              <td className="border border-black px-1 sm:px-2 py-1">-------</td>
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Time Duration</td>
              <td className="border border-black px-1 sm:px-2 py-1"></td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Subject Name</td>
              <td className="border border-black px-1 sm:px-2 py-1" colSpan={3}>__________</td>
            </tr>
            <tr>
              <td className="border border-black px-1 sm:px-2 py-1 font-semibold">Exam Centre Name</td>
              <td className="border border-black px-1 sm:px-2 py-1" colSpan={3}>MPCPCT</td>
            </tr>
            <tr>
              <td className="text-center" colSpan={4}>Result</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Result Table */}
      <div className="overflow-x-auto">
          <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">Sections</th>
            <th className="border p-1">Maximum Marks</th>
            <th className="border p-1">Minimum Pass Marks</th>
            <th className="border p-1">Obtained Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-1 text-left font-semibold">CCC Marks</td>
            <td className="border p-1">70</td>
            <td className="border p-1">28</td>
            <td className="border p-1">42</td>
          </tr>
          {/* <tr>
            <td className="border p-1 text-left">Internal Marks</td>
            <td className="border p-1">30</td>
            <td className="border p-1">12</td>
            <td className="border p-1">27</td>
          </tr> */}
          <tr className="font-bold">
            <td className="border p-1 text-left">Total</td>
            <td colSpan="3" className="border p-1 text-left">69/100</td>
          </tr>
          <tr className="font-bold">
            <td className="border p-1 text-left">Grade</td>
            <td colSpan="3" className="border p-1 text-left">A+</td>
          </tr>
          <tr className="font-bold">
            <td className="border p-1 text-left">Final Result </td>
            <td colSpan="3" className=" p-1 text-left text-green-600">PASS</td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* Contact Info */}
      <div className="text-xs">
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-black font-semibold">
      <tbody>
        <tr className="text-sm sm:text-lg">
          <td className="border p-1 text-center px-2 sm:px-20" colSpan={2}>For Queries about CCC Result</td>
          <td className="border border-l p-1 text-center" colSpan={5}>CCC Qualifying Criteria</td>
        </tr>
        <tr>
          <td className="border p-1 text-left text-xs sm:text-[15px] pl-1 sm:pl-2" colSpan={2}>INCHARGE RSCIT Examination</td>
          <td className="border p-1 text-[15px] text-center" colSpan={5}>Grade Legend</td>
        </tr>
        <tr>
          <td className="border p-1 text-left text-xs sm:text-[15px] pl-1 sm:pl-2" colSpan={2}>Website MPCPCT.Com</td>
          <td className="border p-1 px-3">S</td>
          <td className="border p-1 text-center">A</td>
          <td className="border p-1 text-center">B</td>
          <td className="border p-1 text-center">C</td>
          <td className="border p-1 text-center">D</td>
        </tr>
        <tr>
          <td className="border p-1 text-left text-xs sm:text-[15px] pl-1 sm:pl-2" colSpan={2}>Add:A.B Road SJR 465001(M.P.)<br/>Email:mpcpct111@gmail.com</td>
          <td className="border p-1">85%</td>
          <td className="border p-1">75% - 64%</td>
          <td className="border p-1">65% - 74%</td>
          <td className="border p-1">55% - 64%</td>
          <td className="border p-1">50% - 54%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm border-t pt-2 sm:pt-4 px-2 sm:px-4 font-semibold">
        <p className="mb-2 sm:mb-0">Date of Publication of Result : <span>June 30,2025</span></p>
        <img
          src="/seal.png"
          alt="Seal"
          className="h-16 sm:h-20 md:h-24 mx-auto pb-1 sm:pb-2 md:pb-5"
        />
        <div className="relative mt-1 sm:mt-0">
          <img 
            src="/sing.png" 
            alt="Controller" 
            className="h-16 sm:h-20 md:h-24 ml-auto mb-[-20px] sm:mb-[-35px]" 
          />
          <p className="italic text-gray-500 text-xs sm:text-sm">
            Head of Examinations
          </p>
        </div>
      </div>
      </div>
      <button className="bg-red-600 hover:bg-blue-700 text-white font-medium px-4 py-2 mb-2 ml-35 sm:ml-40 md:ml-70 lg:ml-80 xl:ml-156">
  <a href="/">Go To Home</a>
</button>

    </div>
  );
}