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

        <div className="md:absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:ml-0 ml-8">
          <h1
            className="text-3xl md:text-7xl font-extrabold uppercase md:mt-0 leading-[1.2] text-transparent bg-clip-text bg-center bg-cover"
            style={{
              backgroundImage: "url('/bg.jpg')",
            }}
          >
            MPCPCT
          </h1>
         <p className="text-sm md:text-3xl text-gray-600 md:mt-0 font-semibold">
  <span className="hidden md:inline">(</span>
  To Help in typing & computer proficiency
  <span className="hidden md:inline">)</span>
</p>

        </div>

        <div className="z-10 text-right text-sm"></div>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden bg-[#290c52] flex justify-between items-center px-4 py-2">
        <span className="text-white font-medium"><a href="/">Home </a></span>
         <a href="/profile"><div className="items-center pl-60">
            <img src="/lo.jpg" className="w-8 h-8 rounded-full border" />
            {/* <p className="pl-2.5 text-[10px]">view</p> */}
          </div></a>
        <button onClick={toggleMobileNav} className="text-white focus:outline-none">
          {mobileNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-[#290c52] text-white relative z-50">
        <ul className="flex justify-center flex-wrap px-4 py-2 md:py-4 text-sm md:text-md font-medium gap-4 md:gap-18 relative">
          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/">Home</a></li>
          <li className="relative">
  <button
    onClick={() => toggleDropdown("course")}
    className="hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-1"
  >
    Course
    <span
      className={`transform transition-transform duration-300 ${
        openDropdown === "course" ? "rotate-180" : "rotate-0"
      } text-lg`}
    >
      ▾
    </span>
  </button>

  {/* Dropdown menu */}
  <ul
    className={`absolute left-0 top-full mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50 transition-all duration-300 origin-top transform ${
      openDropdown === "course"
        ? "scale-100 opacity-100"
        : "scale-95 opacity-0 pointer-events-none"
    }`}
  >
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/learning">Learning</a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/skill_test">Skill Test</a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/exam">Exam Mode</a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/">Topic Wise MCQ</a>
    </li>
  </ul>
</li>

         <li className="relative">
  <button
    onClick={() => toggleDropdown("download")}
    className="hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-1"
  >
    Download
    <span
      className={`transform transition-transform duration-300 ${
        openDropdown === "download" ? "rotate-180" : "rotate-0"
      } text-lg`}
    >
      ▾
    </span>
  </button>

  {/* Dropdown Menu */}
  <ul
    className={`absolute left-0 top-full mt-2 bg-white text-black rounded shadow-md min-w-[160px] z-50 transition-all duration-300 origin-top transform ${
      openDropdown === "download"
        ? "scale-100 opacity-100"
        : "scale-95 opacity-0 pointer-events-none"
    }`}
  >
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/notes">Video Notes</a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/notes">Pdf Notes</a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      <a href="/notes">Syllabus PDF</a>
    </li>
  </ul>
</li>

          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/about-us">About us</a></li>
          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/payment-app">Payment</a></li>
          <li className="hover:bg-blue-700 px-3 py-1 rounded"><a href="/contact-us">Contact Us</a></li>
         <a href="/profile"> <div className="items-center absolute right-40 top-1">
            <img src="/lo.jpg" className="w-11 h-11 rounded-full border" />
            <p className="pl-2.5 text-[10px]">view</p>
          </div></a>
        </ul>
      </nav>

      {/* Mobile Sidebar Navigation */}
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
            <button onClick={() => toggleDropdown("mobileCourse")} className="w-full border-b pt-5 text-left py-2 flex justify-between items-center">
              <span>COURSE</span> <span className="text-3xl">▾</span>
            </button>
            {openDropdown === "mobileCourse" && (
              <ul className="pl-4 space-y-1 pt-4 text-sm text-gray-300">
                <li><a href="/learning">Learning</a></li>
                <li><a href="/skill_test">Skill Test</a></li>
                <li><a href="/exam">Exam Mode</a></li>
                <li><a href="/">Topic Wise MCQ</a></li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={() => toggleDropdown("mobileDownload")} className="w-full border-b pt-5 text-left py-2 flex justify-between items-center">
              <span>DOWNLOAD</span> <span className="text-3xl">▾</span>
            </button>
            {openDropdown === "mobileDownload" && (
              <ul className="pl-4 space-y-1 pt-4 text-sm text-gray-300">
                <li><a href="/notes">Video Notes</a></li>
                <li><a href="/notes">Pdf Notes</a></li>
                <li><a href="/notes">Syllabus PDF</a></li>
              </ul>
            )}
          </li>

          <li className="border-b pt-5 py-2"><a href="/about-us">ABOUT US</a></li>
          <li className="border-b pt-5 py-2"><a href="/payment-app">PAYMENT</a></li>
          <li className="border-b pt-5 py-2"><a href="/contact-us">CONTACT US</a></li>
        </ul>

        <div className="justify-center mt-10 px-4">
          <button className="bg-white text-black px-4 py-2 rounded"><a href="/login">Log in</a></button>
          <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"><a href="/signup">Free Registration</a></button>
        </div>
      </div>

      {/* Highlight Bar */}
      <div className="bg-pink-200 relative overflow-hidden h-14">
        <div className="absolute left-0 md:left-63 top-1/2 transform -translate-y-1/2 z-10">
          <span className="bg-black text-white text-xs px-2 py-2 rounded">HIGHLIGHTS</span>
        </div>
        <div className="flex items-center whitespace-nowrap text-md font-semibold text-gray-800">
          <div className="w-full md:w-[50%] py-4 mx-auto">
            <span className="w-full md:w-[50%] py-2">
              <marquee behavior="scroll" direction="left">
                • CPCT Scorecard is valid for 07 years from the date of exam <span className="pl-15">• Basic Computer & Typing skill are important for data entry</span> <span className="">\ IT Operator</span> <span className="">\ Assistant Grade 3</span> <span className="">\ Shorthand</span> <span className="">\ Typist</span> and other similar positions in the departments <span className="">\ corporation and agencies under government of India.</span>
              </marquee>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
