import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    setOpenDropdown(null);
  };

  return (
    <header className="border-b shadow-sm relative">
      {/* Top Section */}
      <div className="bg-white flex items-center justify-between px-4 py-4 relative">
        <div className="z-10 md:block hidden">
          <img src="/logor.png" alt="CPCT Logo" className="w-50 ml-35" />
        </div>

        <div className="md:absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-7xl font-bold uppercase md:mt-10 leading-5 text-[#290c52]">MPCPCT</h1>
          <p className="text-lg md:text-3xl text-gray-600 md:mt-10 font-semibold">
            (To Help in typing & computer proficiency)
          </p>
        </div>

        <div className="z-10 text-right text-sm">
          {/* Optional right side content */}
        </div>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden bg-[#290c52] flex justify-between items-center px-4 py-2">
        <span className="text-white font-medium">Menu</span>
        <button onClick={toggleMobileNav} className="text-white focus:outline-none">
          {mobileNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#290c52] text-white relative z-50">
        <ul className="flex justify-center flex-wrap px-4 py-2 md:py-4 text-sm md:text-md font-medium gap-4 md:gap-28 relative">
          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/">Home</a></li>
          <li className="relative">
            <button onClick={() => toggleDropdown("course")} className="hover:bg-blue-700 px-3 py-1 rounded">Course</button>
            {openDropdown === "course" && (
              <ul className="absolute left-0 top-full mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Learning Skill</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Test</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Exam Mode</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Topic Wise MCQ</li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button onClick={() => toggleDropdown("download")} className="hover:bg-blue-700 px-3 py-1 rounded">Download</button>
            {openDropdown === "download" && (
              <ul className="absolute left-0 top-full mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Video Notes</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Notes Pdf</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Syllabus PDF</li>
              </ul>
            )}
          </li>
          <li className="hover:bg-blue-700 px-3 py-1 rounded">About us</li>
          <li className="hover:bg-blue-700 px-3 py-1 rounded">Contact Us</li>
        </ul>
      </nav>

      {/* Mobile Sidebar with Transition */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-[#290c52] text-white z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileNav}>
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/user.jpg"
            alt="User"
            className="w-24 h-24 rounded-full border-2 border-white mb-2"
          />
          <p className="text-lg font-semibold">User</p>
        </div>

        <ul className="mt-6 space-y-2 px-4">
          <li className="border-b py-2"><a href="/">HOME</a></li>

          <li>
            <button onClick={() => toggleDropdown("learning")} className="w-full border-b pt-5 text-left py-2 flex justify-between items-center">
              LEARNING <span>▾</span>
            </button>
            {openDropdown === "learning" && (
              <ul className="pl-4 space-y-1 pt-4 text-sm text-gray-300">
                <li>Module 1</li>
                <li>Module 2</li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={() => toggleDropdown("typing")} className="w-full pt-5 border-b text-left py-2 flex justify-between items-center">
              <a href="/typing"> Skill Test</a> <span>▾</span>
            </button>
            {openDropdown === "typing" && (
              <ul className="pl-4 space-y-1 pt-5 text-sm text-gray-300">
                <li>Typing Test</li>
                <li>Accuracy Test</li>
              </ul>
            )}
          </li>

          <li className="border-b pt-5 py-2">EXAM MODE</li>

          <li>
            <button onClick={() => toggleDropdown("notes")} className="w-full pt-5 border-b text-left py-2 flex justify-between items-center">
              NOTES <span>▾</span>
            </button>
            {openDropdown === "notes" && (
              <ul className="pl-4 space-y-1 pt-5 text-sm text-gray-300">
                <li>Video Notes</li>
                <li>PDF Notes</li>
              </ul>
            )}
          </li>

          <li className="border-b pt-5 py-2">MCQ TEST</li>
        </ul>

        <div className="flex justify-center gap-4 mt-15 px-4">
          <button className="bg-white text-black px-4 py-2 rounded"><a href="/login">Log in</a></button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded"><a href="/signup">Free Registration</a></button>
        </div>
      </div>

      {/* Highlight Bar */}
      <div className="bg-pink-200 relative overflow-hidden h-14">
        <div className="absolute left-0 md:left-90 top-1/2 transform -translate-y-1/2 z-10">
          <span className="bg-black text-white text-xs px-2 py-2 rounded">HIGHLIGHTS</span>
        </div>
        <div className="flex items-center whitespace-nowrap text-md font-semibold text-gray-800">
          <div className="w-full md:w-[50%] py-4 mx-auto">
            <span className="w-full md:w-[50%] py-2">
              <marquee behavior="scroll" direction="left">
                • CPCT Scorecard is valid for 07 years from the date of exam <span className="pl-15">• Basic Computer & Typing skill are important for data entry</span> <span className="pl-15">• IT Operator</span> <span className="pl-15">• Assistant Grade 3</span> <span className="pl-15">• Shorthand</span> <span className="pl-15">• Typist</span> and other similar positions in the departments <span className="pl-15">• corporation and agencies under government of India.</span>
              </marquee>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
