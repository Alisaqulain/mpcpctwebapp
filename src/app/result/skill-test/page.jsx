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
<div
  className="max-w-4xl mx-auto border-4 border-[#290c52] bg-white shadow-xl text-sm font-sans my-5"

>   {/* Full-Width Header */}
<div
  className="w-full px-4 py-2 border"
  style={{
    backgroundColor: "#290c52",
    backgroundImage: "url('/bg.jpg')",
    backgroundRepeat: "repeat", // or 'no-repeat', 'round', etc.
    backgroundSize: "cover",    // or 'contain', 'auto', etc.
  }}
>        <div className="flex items-center justify-between w-full">
          {/* Left Logo */}
          <img
            src="/logor.png"
            alt="MP Logo"
            className="h-24 w-35 mt-[-8]"
          />

          {/* Center Title */}
          <div className="text-center flex-1 -ml-12">
        <h1
  className="text-3xl md:text-5xl font-extrabold uppercase md:mt-0 leading-[1.2] text-white"
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

           <p className="text-lg md:text-2xl text-pink-300 md:mt-0 font-semibold">
            (To Help in typing & computer proficiency)
          </p>
          </div>

         
        
        </div>
      </div>
      

      {/* Title */}
      <div className="text-center mb-4 font-semibold text-lg mt-2 py-4">
          {/* Student Photo */}
          <img
            src="/lo.jpg"
            alt="Student"
            className="w-24 h-20 border ml-2 absolute top-90 md:top-109"
          />
        <p className="uppercase font-bold text-2xl">Result </p>
        <p className="text-3xl md:text-2xl pt-10 md:pt-0">Skill Test Examination 2025 - 26</p>
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
          <tr  className="font-bold">
            <td className="border p-1 text-left " >Gross Speed</td>
            <td className="border p-1">20wpm</td>
            <td className="border p-1">Total Type Word</td>
            <td className="border p-1">320</td>
           
       
          </tr>
          <tr  className="font-bold">
            <td className="border p-1 text-left">Correct Word</td>
            <td className="border p-1">280</td>
            <td className="border p-1">Wrong Words</td>
            <td className="border p-1">12</td>

          </tr>
          <tr className="font-bold">
            <td className="border p-1 text-left">Net Speed</td>
            <td colSpan="1" className="border p-1">19wpm</td>
            <td colSpan="1" className="border p-1">Accuracy</td>
            <td colSpan="1" className="border p-1">88%</td>
          </tr>

           <tr className="p-1 font-bold">
        <td className="text-center border" colSpan={2}>Final Result</td>
        <td className="" colSpan={3}><span className="text-left pr-5 ml-[-120]">Fail</span>  (Minimum Passing Net Speed of 30 Word per Minute)</td>
      </tr>
        </tbody>
      </table>

      

      {/* Final Result
      <div className="grid grid-cols-2 gap-4 mb-4 px-4">
        <p><strong>Final Result:</strong> <span className="text-green-600">PASS</span></p>
        <p><strong>Result Date:</strong> 09-06-2025</p>
      </div> */}

      {/* Contact Info */}
     <div className="bg-white p-4 w-full max-w-full  text-sm mb-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">Total Errors :  <span>08 Typed [Record]</span></h2>
        <a href="#" className=" text-md">Remarks :  <span className="text-red-500">Fair</span></a>

      </div>
        <p className="text-xl">THGe [The],Pastiemj [Pastime],IHN [In], IS [States], d[1800s.],Periou [Period], Unoque [Unique], Flavor [Flaver]</p>

     
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
