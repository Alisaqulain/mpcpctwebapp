import React from "react";

export default function CpctScoreCard() {
  const data = [
    { key: "A", value: 30 },
    { key: "B", value: 28 },
    { key: "7", value: 29 },
    { key: "j", value: 10 },
  ];

  const maxHeight = 100; // height in px
  return (
      <div>
    <div className="max-w-4xl mx-auto border-4 border-[#290c52] bg-white shadow-xl text-sm font-sans my-5">
      {/* Full-Width Header */}
      <div
        className="w-full px-4 py-2 border"
        style={{
          backgroundColor: "#290c52",
          backgroundImage: "url('/bg.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Left Logo - order changes on mobile */}
          <img
            src="/logor.png"
            alt="MP Logo"
            className="h-20 w-auto md:h-24 md:mt-[-8] md:order-1 order-2"
          />

          {/* Center Title - comes first on mobile */}
          <div className="text-center flex-1 md:-ml-12 order-1 md:order-2">
            <h1
              className="text-3xl md:text-5xl font-extrabold uppercase leading-[1.2] text-white"
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
            <p className="text-lg md:text-2xl text-pink-300 font-semibold">
              (To Help in typing & computer proficiency)
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4 font-semibold text-lg mt-2 py-4 relative">
        {/* Student Photo - position adjusted for mobile */}
        <img
          src="/lo.jpg"
          alt="Student"
          className="w-16 sm:w-24 h-12 sm:h-20 border ml-2 absolute left-0 top-[40] md:top-1/2 transform -translate-y-1/2"
        />
        <p className="uppercase font-bold text-xl md:text-2xl">Result</p>
        <p className="text-xl md:text-2xl">Learning Section</p>
      </div>

      {/* Details Table */}
      <div className="overflow-x-auto text-sm border border-gray-300 w-full max-w-full mx-auto">
        <table className="table-auto w-full border border-black">
          <tbody>
            <tr className="border border-black">
              <td className="border border-black px-2 py-1 font-semibold">Name of Student</td>
              <td className="border border-black px-2 py-1">__________</td>
              <td className="border border-black px-2 py-1 font-semibold">Result Date</td>
              <td className="border border-black px-2 py-1">date & Time</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-2 py-1 font-semibold">Test Language</td>
              <td className="border border-black px-2 py-1">English/Hindi</td>
              <td className="border border-black px-2 py-1 font-semibold">Time Duration</td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-2 py-1 font-semibold">Exercise Name</td>
              <td className="border border-black px-2 py-1" colSpan={3}>__________</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-semibold">Exam Centre Name</td>
              <td className="border border-black px-2 py-1" colSpan={3}>MPCPCT</td>
            </tr>
            <tr>
              <td className="text-center" colSpan={4}>Result</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Result Table */}
      <table className="w-full border text-center">
        <tbody>
          <tr className="font-bold">
            <td className="border p-1 text-left">Gross Speed</td>
            <td className="border p-1">20wpm</td>
          </tr>
          <tr className="font-bold">
            <td className="border p-1 text-left">Accuracy</td>
            <td className="border p-1">96%</td>
          </tr>
          <tr className="font-bold">
            <td className="border p-1 text-left">Net Speed</td>
            <td colSpan="1" className="border p-1">19wpm</td>
          </tr>
        </tbody>
      </table>

      {/* Contact Info */}
      <div className="bg-white p-4 w-full max-w-full text-sm mb-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Difficult Keys in this Exercise</h2>
          <a href="#" className="text-blue-600 text-xs underline">Review</a>
        </div>

        {/* Chart area */}
        <div className="relative h-[140px] border border-black">
          {/* Difficulty zones */}
          <div className="absolute top-0 left-0 w-full h-1/3 border-b border-green-300 flex items-center justify-end pr-2 text-xs text-gray-600">
            Problematic
          </div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 border-b border-green-300 flex items-center justify-end pr-2 text-xs text-gray-600">
            Difficult
          </div>
          <div className="absolute top-2/3 left-0 w-full h-1/3 flex items-center justify-end pr-2 text-xs text-gray-600">
            OK
          </div>

          {/* Bars */}
          <div className="absolute bottom-0 top-40 left-0 w-full flex gap-x-4 sm:gap-x-10 items-end px-2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-blue-400 w-4 sm:w-6"
                  style={{ height: `${(item.value / 100) * maxHeight}px` }}
                ></div>
                <span className="mt-1 text-xs sm:text-base">{item.key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-md border-t pt-4 px-4 font-semibold">
        <p className="mb-2 md:mb-0 text-sm md:text-base">Date of Publication of Result : <span>June 30,2025</span></p>
        <img
          src="/seal.png"
          alt="Seal"
          className="h-20 md:h-30 mx-auto pb-2 md:pb-5"
        />
        <div className="relative mt-2 md:mt-0">
          <img 
            src="/sing.png" 
            alt="Controller" 
            className="h-20 md:h-30 ml-auto  mb-[-35]" 
          />
          <p className="italic text-gray-500 text-sm md:text-base">
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