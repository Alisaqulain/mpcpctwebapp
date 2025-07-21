"use client";
import React, { useState, useEffect, useRef } from "react";

export default function CPCTPage() {
  const [section, setSection] = useState("COMPUTER PROFICIENCY");
  const [timeLeft, setTimeLeft] = useState(74 * 60 + 18);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [selectedTest, setSelectedTest] = useState("CPCT Actual");
  const audioRef = useRef(null);

  // Load tick sound after user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      audioRef.current = new Audio("/tick.wav");
      audioRef.current.volume = 0.2;
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);
    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play sound each second
  useEffect(() => {
    if (isSoundOn && audioRef.current && timeLeft > 0) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Sound error:", err);
      });
    }
  }, [timeLeft, isSoundOn]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const testTypes = ["CPCT Actual", "English Typing", "हिंदी टाइपिंग"];

  const questions = {
    "COMPUTER PROFICIENCY": {
      question: "The term EDVAC stands for:",
      options: [
        "Electronic Data Variable Automatic Computer",
        "Electronic Discrete Variable Automatic Computer",
        "Electronic Distinct Variable Automatic Computer",
        "Electronic Disk Variable Automatic Computer",
      ],
    },
    "READING COMPREHENSION": {
      passage: `बहुत समय पहले, एक बड़े जंगल के पास बसे एक छोटे से गाँव में बहुत समय पहले, एक बड़े जंगल के पास बसे एक छोटे से गाँव में...`,
      question: "Who is the author of 'Wings of Fire'?",
      options: [
        "A. P. J. Abdul Kalam",
        "Rabindranath Tagore",
        "Jawaharlal Nehru",
        "R. K. Narayan",
      ],
    },
    "QUANTITATIVE APTITUDE": {
      question: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
    },
    "GENERAL MENTAL ABILITY": {
      question: "If CAT = 24 and DOG = 26, then BAT = ?",
      options: ["22", "24", "26", "28"],
    },
    "GENERAL AWARENESS": {
      question: "Who is the current president of India?",
      options: [
        "Narendra Modi",
        "Droupadi Murmu",
        "Ram Nath Kovind",
        "Pratibha Patil",
      ],
    },
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white relative">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-1 left-2 z-50 bg-[#290c52] text-white p-2 rounded"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white w-64 overflow-y-auto">
          <div className="p-4 text-sm h-full">
            <div className="flex flex-col items-center py-6">
              <img src="/lo.jpg" className="w-24 h-24 rounded-full border-2" />
              <p className="mt-2 font-semibold text-blue-800">Anas</p>
              <hr className="border w-full mt-2" />
            </div>
            <div className="text-xs grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 bg-green-400 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
                <p>Answered</p>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-10 h-8 bg-red-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">1</span>
                <p>Not Answered</p>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-8 h-8 bg-gray-400 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">51</span>
                <p>Not Visited</p>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-12 h-8 bg-purple-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
                <p>Marked for Review</p>
              </div>
              <div className="flex items-center col-span-2">
                <span className="inline-block w-8 h-8 bg-indigo-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
                <p>Answered & Marked for Review</p>
              </div>
            </div>

            <h2 className="font-bold mb-2 text-white-50 text-center bg-[#290c52] text-[12px] text-white py-2">General IT Skills & Networking</h2>
            <h2 className="font-bold mb-2 text-white-50">Choose a Question</h2>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center text-black text-sm font-semibold border border-black ${
                    i === 0 ? "bg-red-600" : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          
            <button className="bg-[#290c52] hover:bg-cyan-700 text-white px-12 py-3 ml-2 mt-1 text-[13px] rounded">
              <a href="/exam/exam-result">Submit Section</a>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 w-full bg-[#290c52] text-white flex justify-between items-center px-4 py-2 text-sm z-30">
          <div className="font-semibold">MPCPCT 2025</div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 pr-4">
              <img src="/lo.jpg" className="w-8 h-8 rounded-full border" />
            </div>
            <span className="cursor-pointer underline hidden sm:inline text-[12px] p-2">View Instructions</span>
            <span className="cursor-pointer underline hidden sm:inline text-[12px]">Question Paper</span>
          </div>
        </div>

        {/* Test Type Dropdown (Mobile) */}
        <div className="lg:hidden bg-white-50 border-b border-gray-300 px-4 py-4 mt-10">
          <div className="relative">
            <button 
              className="w-full bg-[#290c52] text-white font-semibold px-4 py-3 border-2 border-gray-300 rounded text-left flex justify-between items-center"
              onClick={() => setShowTestDropdown(!showTestDropdown)}
            >
              <span>{selectedTest}</span>
              <span>{showTestDropdown ? "▲" : "▼"}</span>
            </button>
            {showTestDropdown && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg">
                {testTypes.map((test) => (
                  <button
                    key={test}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      selectedTest === test ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      setSelectedTest(test);
                      setShowTestDropdown(false);
                    }}
                  >
                    {test}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Test Type Tabs (Desktop) */}
        <div className="hidden lg:flex bg-white-50 border-b border-gray-300 px-4 py-4 gap-2 text-xs mt-10 overflow-x-auto">
          {testTypes.map((test) => (
            <button
              key={test}
              className={`${
                selectedTest === test
                  ? "bg-[#290c52] text-white font-semibold px-2 py-3 border-2 border-gray-300 rounded"
                  : "border px-2 py-2 rounded border-gray-300"
              } whitespace-nowrap`}
              onClick={() => setSelectedTest(test)}
            >
              {test}
            </button>
          ))}
        </div>

        {/* Section Dropdown (Mobile) */}
        <div className="lg:hidden border-b px-4 py-3 border-y-gray-200 bg-[#fff]">
          <div className="relative">
            <button 
              className="w-full bg-white text-blue-700 px-4 py-3 border border-gray-300 rounded text-left flex justify-between items-center"
              onClick={() => setShowSectionDropdown(!showSectionDropdown)}
            >
              <span>{section}</span>
              <span>{showSectionDropdown ? "▲" : "▼"}</span>
            </button>
            {showSectionDropdown && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                {Object.keys(questions).map((sec) => (
                  <button
                    key={sec}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      section === sec ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      setSection(sec);
                      setShowSectionDropdown(false);
                    }}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end mt-2">
            <button onClick={() => setIsSoundOn(!isSoundOn)} title={isSoundOn ? "Mute" : "Unmute"}>
              {isSoundOn ? "🔊" : "🔇"}
            </button>
            <span className="text-lg ml-2">Time Left: <b className="bg-blue-400 text-black px-3">{formatTime(timeLeft)}</b></span>
          </div>
        </div>

        {/* Section Nav (Desktop) */}
        <div className="hidden lg:flex border-b px-4 py-0 border-y-gray-200 bg-[#fff] text-xs overflow-x-auto">
          {Object.keys(questions).map((sec) => (
            <button
              key={sec}
              onClick={() => setSection(sec)}
              className={`${
                section === sec
                  ? "bg-[#290c52] text-white border-gray-300"
                  : "bg-white text-blue-700 border-r border-gray-300 px-4"
              } px-2 py-3 whitespace-nowrap`}
            >
              {sec}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 whitespace-nowrap">
            <button onClick={() => setIsSoundOn(!isSoundOn)} title={isSoundOn ? "Mute" : "Unmute"}>
              {isSoundOn ? "🔊" : "🔇"}
            </button>
            <span className="text-lg">Time Left: <b className="bg-blue-400 text-black px-3 mr-5">{formatTime(timeLeft)}</b></span>
          </div>
          
        </div>
        <div className="flex gap-2 h-20 overflow-x-auto md:hidden ml-5">
  {Array.from({ length: 16 }, (_, i) => (
    <div
      key={i}
      className={`min-w-[2rem] h-8 flex items-center justify-center text-black text-sm font-semibold border border-black ${
        i === 0 ? "bg-red-600" : "bg-gray-300"
      }`}
    >
      {i + 1}
    </div>
  ))}
</div>



        {/* Question Panel */}
        <div className="flex-grow p-4 overflow-auto bg-white-50 mt-[-30] md:mt-0">
          <div className="bg-[#290c52] text-white text-sm px-4 py-3 rounded-t flex justify-between flex-wrap gap-2">
            <span>Question Type: MCQ</span>
            <div className="flex items-center gap-2">
              <p>View in:</p>
              <select className="text-black text-xs bg-white">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

          <div className="border border-gray-300 rounded-b">
            <div className="bg-white-50 px-4 py-3 border-b text-sm font-semibold flex flex-col sm:flex-row justify-between">
              <span>Question No. 1</span>
              <span className="mt-1 sm:mt-0">Marks for correct answer: 1 | Negative Marks: <span className="text-red-500">0</span></span>
            </div>

            {section === "READING COMPREHENSION" ? (
              <div className="flex flex-col lg:flex-row p-4 gap-x-6 gap-y-10">
                <div className="lg:w-2/3 text-sm border-r pr-4 max-h-72 overflow-y-auto">
                  <h3 className="font-bold mb-2">Passage:</h3>
                  <p>{questions[section].passage}</p>
                </div>
                <div className="lg:w-1/3 text-xl">
                  <p className="mb-4">{questions[section].question}</p>
                  {questions[section].options.map((opt, i) => (
                    <label key={i} className="flex items-start gap-x-2 gap-y-6">
                      <input type="radio" name="q1" className="mt-1" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-xl mb-28">
                <p className="mb-4">{questions[section].question}</p>
                {questions[section].options.map((opt, i) => (
                  <label key={i} className="flex items-start gap-2">
                    <input type="radio" name="q1" className="mt-1" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center bg-white-50 px-4 py-3 border-t flex-wrap gap-2">
          <div className="space-x-2">
            <button className="px-4 py-2 absolute md:relative mb-[-30] ml-38 md:ml-0 md:mb-0 bg-blue-600 text-white rounded text-sm whitespace-nowrap">
              Mark for Review & Next
            </button>
            <button className="px-4 py-2  bg-red-500 text-white rounded text-sm whitespace-nowrap">
              Clear Response
            </button>
          </div>
          <div className="space-x-20 md:space-x-2">
            <button className="bg-blue-400 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded whitespace-nowrap">
              Previous
            </button>
            <button className="bg-green-600 hover:bg-cyan-700 text-white px-6 py-2 text-sm rounded whitespace-nowrap">
              Save & Next
            </button>
          </div>
          <button className="bg-green-800 hover:bg-cyan-700 text-white px-12 py-2 ml-2 text-[13px] rounded w-[80%] md:hidden">
  <a href="/exam/exam-result">Submit Section</a>
</button>

        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-full lg:w-60 bg-blue-50 border-l shadow-lg max-h-[100vh] overflow-y-auto sticky top-0 mt-3">
        <div className="p-4 text-sm h-full">
          <div className="flex flex-col items-center py-6">
            <img src="/lo.jpg" className="w-24 h-24 rounded-full border-2" />
            <p className="mt-2 font-semibold text-blue-800">Anas</p>
            <hr className="border w-full mt-2" />
          </div>
          <div className="text-xs grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 bg-green-400 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
              <p>Answered</p>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-15 h-8 bg-red-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">1</span>
              <p>Not Answered</p>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 bg-gray-400 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">51</span>
              <p>Not Visited</p>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-14 h-8 bg-purple-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
              <p>Marked for Review</p>
            </div>
            <div className="flex items-center col-span-2">
              <span className="inline-block w-8 h-8 bg-indigo-600 mr-2 rounded-sm text-center items-center justify-center pt-1 text-white text-[20px]">0</span>
              <p>Answered & Marked for Review</p>
            </div>
          </div>

          <h2 className="font-bold mb-2 text-white-50 text-center bg-[#290c52] text-[12px] text-white py-2">General IT Skills & Networking</h2>
          <h2 className="font-bold mb-2 text-white-50">Choose a Question</h2>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex items-center justify-center text-black text-sm font-semibold border border-black ${
                  i === 0 ? "bg-red-600" : "bg-gray-300"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        
          <button className="bg-green-800 hover:bg-cyan-700 text-white px-12 py-2 ml-2 mt-[-4] text-[13px] rounded">
            <a href="/exam/exam-result">Submit Section</a>
          </button>
        </div>
      </div>
    </div>
  );
}