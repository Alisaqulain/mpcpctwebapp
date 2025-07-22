"use client";
import React, { useState } from "react";

export default function TypingTutor() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedSubLanguage, setSelectedSubLanguage] = useState("");
  const [duration, setDuration] = useState(5);
  const [backspace, setBackspace] = useState("OFF");
  const [selectedSection, setSelectedSection] = useState("Home");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); // Only one checkbox selectable

  const mainLanguages = ["Hindi", "English"];
  const subLanguages = ["Ramington Gail", "Inscript"];
  const backspaceOptions = ["OFF", "ON"];
  const durations = [3, 5, 10];
  const Numbers = ["Lession 1", "Lession 2", "Lession 3", "Lession 4", "Lession 5"];
  const sections = ["Home", "Upper", "Lower", "Shift", "Numbers"];

  const sectionContent = {
    Home: ["1.1 ASDF & JKL;", "1.2 GH & '", "1.3 Word Practice"],
    Upper: ["2.1 QWER & UIOP", "2.2 T & Y", "2.3 Word Practice"],
    Lower: ["3.1 ZXCV & NM,.", "3.2 B & /", "3.3 Word Practice"],
    Shift: [
      "4.1 ABDF & JKL;",
      "4.2 GH & '",
      "4.3 Lower Row Word Practice",
      "4.4 QWER & UIOP",
      "4.5 T & Y",
      "4.6 Upper Row Word Practice",
      "4.7 ZXCV & NM,. ",
      "4.8 B & /",
      "4.9 Lower Row Word Practice",
    ],
    Numbers: [
      "5.1 (1,2,3,4) and (7,8,9,0)",
      "5.2 Practice with Shift(!,@,#,$) and (%,^,&,*)",
      "5.3 Word Practice",
      "5.4 (5,6 & -,=)",
      "5.5 Practice with Shift(%,* & -,+)",
      "5.6 Word Practice",
    ],
  };

  return (
    <div className="bg-white font-sans min-h-screen p-4">
      {/* Top Settings Section */}
    <div className="grid grid-cols-3 gap-1 md:gap-4">
  {/* Language Selection */}
  <div className="bg-[#290c52] p-[6px] md:p-4 rounded shadow-md text-white">
    <h2 className="font-bold text-[9px] md:text-lg mb-2 border-b border-white pb-1">
      1. Select Typing Language
    </h2>
    <div className="grid grid-cols-2 gap-1 text-black mb-2">
      {mainLanguages.map((lang) => (
        <label
          key={lang}
          className="bg-white px-1 py-1 rounded flex items-center gap-1 w-full"
        >
          <input
            type="radio"
            name="mainLanguage"
            className="w-3 h-3"
            value={lang}
            checked={selectedLanguage === lang}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setSelectedSubLanguage("");
            }}
          />
          <p className="text-[8px] md:text-sm">{lang}</p>
        </label>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-1 text-black">
      {subLanguages.map((subLang) => {
        const disabled = selectedLanguage !== "Hindi";
        return (
          <label
            key={subLang}
            className={`${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            } bg-white px-1 py-1 rounded flex items-center gap-1 w-full`}
          >
            <input
              type="radio"
              name="subLanguage"
              className="w-3 h-3"
              value={subLang}
              disabled={disabled}
              checked={selectedSubLanguage === subLang}
              onChange={(e) => setSelectedSubLanguage(e.target.value)}
            />
            <p className="text-[7px] md:text-sm">{subLang}</p>
          </label>
        );
      })}
    </div>
  </div>

  {/* Duration */}
  <div className="bg-[#290c52] p-[6px] md:p-4 rounded shadow-md text-white">
    <h2 className="font-bold text-[9px] md:text-lg mb-2 border-b border-white pb-1">
      2. Select Duration in Minutes
    </h2>
    <div className="grid grid-cols-3 gap-1 mt-4">
      {durations.map((time) => (
        <label
          key={time}
          className={`px-1 py-1 rounded text-center font-medium cursor-pointer bg-white text-black border border-gray-400 text-[8px] md:text-base ${
            duration === time ? "bg-blue-200" : ""
          }`}
        >
          <input
            type="radio"
            name="duration"
            value={time}
            className="mr-1"
            onChange={() => setDuration(time)}
            checked={duration === time}
          />
          {time}M
        </label>
      ))}
    </div>
  </div>

  {/* Backspace */}
  <div className="bg-[#290c52] p-[6px] md:p-4 rounded shadow-md text-white">
    <h2 className="font-bold text-[11px] md:text-lg mb-2 border-b border-white pb-1">
      3. Backspace
    </h2>
    <div className="grid grid-cols-2 gap-1 mt-4">
      {backspaceOptions.map((option) => (
        <label
          key={option}
          className={`px-1 py-1 rounded text-center font-medium cursor-pointer bg-white text-black border border-gray-400 text-[8px] md:text-base ${
            backspace === option ? "bg-blue-200" : ""
          }`}
        >
          <input
            type="radio"
            name="backspace"
            value={option}
            className="mr-1"
            onChange={() => setBackspace(option)}
            checked={backspace === option}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
</div>

      {/* Main Content Section */}
      <div className="flex flex-row min-h-screen bg-blue-200 bg-[url('/bg.jpg')]">
        {/* Sidebar Navigation */}
        <div className="w-32 bg-transparent text-white pt-14 space-y-17 text-xl md:text-4xl pl-2 md:pl-10 flex flex-col">
          {sections.map((section) => (
            <p
              key={section}
              onClick={() => {
                setSelectedSection(section);
                setSelectedCheckbox(null); // Clear checkbox on section change
              }}
              className={`pl-2 cursor-pointer px-4 py-2 rounded-md ${
                selectedSection === section ? "border w-70 border-white bg-white text-[#290c52] font-bold" : "border-none"
              }`}
            >
              {sections.indexOf(section) + 1}.{section}
            </p>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white p-6 shadow-md w-[60%] md:w-[70%] mx-auto mt-5 mr-2 md:mr-0">
          <h2 className="text-center font-bold italic mb-4 text-md md:text-5xl">
            {Numbers[sections.indexOf(selectedSection)]} - {selectedSection} Row
          </h2>

          {/* Lesson List with Single Select Checkbox */}
          <ul className="space-y-8 mb-6 ml-0 md:ml-75 mt-10">
            {sectionContent[selectedSection].map((item, idx) => {
              const splitIndex = item.indexOf(" ");
              const lessonNum = item.slice(0, splitIndex);
              const lessonTitle = item.slice(splitIndex + 1);

              return (
                <li key={idx} className="flex items-center gap-4">
  {/* Lesson Number */}
  <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
    {lessonNum}
  </span>

  {/* Checkbox */}
  <input
    type="checkbox"
    className="w-5 h-5 accent-green-500 flex-shrink-0"
    checked={selectedCheckbox === idx}
    onChange={() => setSelectedCheckbox(idx)}
  />

  {/* Lesson Title */}
  <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl flex-1">
    {lessonTitle}
  </span>
</li>

              );
            })}
          </ul>

          <button className="bg-green-500 text-white w-full md:w-[40%] ml-0 md:ml-73 px-4 py-2 rounded mx-auto block">
            <a href="/tips/home">Start Test</a>
          </button>
        </div>
      </div>
    </div>
  );
}
