// components/Header.js
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
    // Close all dropdowns when toggling mobile nav
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
          <h1 className="text-3xl md:text-7xl font-bold uppercase md:mt-10 leading-5">MPCPCT</h1>
          <p className="text-lg md:text-3xl text-gray-600 md:mt-10 font-semibold">
            (To Help in typing & computer proficiency)
          </p>
        </div>

        <div className="z-10 text-right text-sm">
          {/* Language Switch or Extra Logo */}
        </div>
      </div>

      {/* Mobile Nav Toggle Button */}
      <div className="md:hidden bg-[#290c52] flex justify-between items-center px-4 py-2">
        <span className="text-white font-medium">Menu</span>
        <button 
          onClick={toggleMobileNav}
          className="text-white focus:outline-none"
        >
          {mobileNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block bg-[#290c52] text-white relative z-50">
        <ul className="flex justify-center flex-wrap px-4 py-2 md:py-4 text-sm md:text-md font-medium gap-4 md:gap-28 relative">
          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/">Home</a></li>

          {/* Course Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("course")}
              className="hover:bg-blue-700 px-3 py-1 rounded"
            >
              Course
            </button>
            {openDropdown === "course" && (
              <ul className="absolute left-0 top-full mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Learning Skill</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Test</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Exam Mode</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Topic Wise MCQ</li>
              </ul>
            )}
          </li>

          {/* Download Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("download")}
              className="hover:bg-blue-700 px-3 py-1 rounded"
            >
              Download
            </button>
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

      {/* Navigation - Mobile */}
      {mobileNavOpen && (
        <nav className="md:hidden bg-[#290c52] text-white relative z-40">
          <ul className="flex flex-col px-4 py-2 text-sm font-medium">
            <li className="hover:bg-blue-700 px-3 py-2 rounded"><a href="/">Home</a></li>

            {/* Course Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("course")}
                className="w-full text-left hover:bg-blue-700 px-3 py-2 rounded"
              >
                Course
              </button>
              {openDropdown === "course" && (
                <ul className="bg-white text-black rounded shadow-md ml-4 my-1">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">learning-skill test</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"> exam mode</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Topic wise MCQ</li>
                </ul>
              )}
            </li>

            {/* Download Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("download")}
                className="w-full text-left hover:bg-blue-700 px-3 py-2 rounded"
              >
                Download
              </button>
              {openDropdown === "download" && (
                <ul className="bg-white text-black rounded shadow-md ml-4 my-1">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Admit Card</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Syllabus PDF</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Results</li>
                </ul>
              )}
            </li>

            <li className="hover:bg-blue-700 px-3 py-2 rounded">About us</li>
            <li className="hover:bg-blue-700 px-3 py-2 rounded">Contact Us</li>
          </ul>
        </nav>
      )}

      {/* Highlight Bar */}
      <div className="bg-pink-200 relative overflow-hidden h-14">
        {/* Fixed Label */}
        <div className="absolute left-0 md:left-90 top-1/2 transform -translate-y-1/2 z-10">
          <span className="bg-black text-white text-xs px-2 py-2 rounded">HIGHLIGHTS</span>
        </div>

        {/* Scrolling Text (inline animation style) */}
        <div className="flex items-center whitespace-nowrap text-md font-semibold text-gray-800">
          <div className="w-full md:w-[50%] py-4 mx-auto">
            <span className="w-full md:w-[50%] py-2">
              <marquee behavior="scroll" direction="left">
                • CPCT Scorecard is valid for 07 years from the date of exam <span className="pl-15">  • Basic Computer & Typing skill are important for data entry </span> <span className="pl-15"> • IT Operator</span>   <span className="pl-15"> • Assistant Grade 3</span>   <span className="pl-15"> • Shorthand</span>   <span className="pl-15"> • Typist</span> and other similar positions in the departments <span className="pl-15"> • corporation and agencies under government of India.</span>
              </marquee>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}