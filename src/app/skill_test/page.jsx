"use client";
import React, { useState } from "react";

export default function TypingTutor() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [duration, setDuration] = useState(5);
  const [selected, setSelected] = useState("Exercise103");
  const [selectedExam, setSelectedExam] = useState("Most Exams");

  const languages = [
    "Hindi",
    "English",
    "Raavi Punjabi",
    "Mangal",
    "Hindi Unicode",
    "Punjabi",
  ];

  const durations = [2, 3, 5, 10, 15, 30];

  const exercises = [
    "CommonWord 4 Spee",
    "CommonWord 5 Spee",
    "CommonWord 6 Spee",
    "CommonWord 7 Spee",
    "CommonWord 8 Spee",
    "Exercise100",
    "Exercise101",
    "Exercise102",
    "Exercise103",
    "Exercise104",
    "Exercise105",
    "Exercise106",
    "Exercise107",
  ];

  const exams = [
    "Most Exams",
    "Raj. HighCourt LDC",
    "RPSC, IA",
    "SSC, Steno",
  ];

  const description = `Matter to type is given on upper half part of screen. Word to type is highlighted. Back space is allowed till current word. Wrong typed word makes bold. So user can identify such mistakes. One or more word afterwards the highlighted word can be skipped, if needed. Skipped word will not added as mistakes.`;

  return (
    <div className="min-h-screen bg-[#dbe7ff] p-4 font-sans">
      {/* Language & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Language Selection */}
        <div className="bg-[#5c80bc] p-4 rounded shadow-md text-white">
          <h2 className="font-bold text-lg mb-2 border-b border-white pb-1">
            1. Select Typing Language
          </h2>
          <div className="grid grid-cols-3 gap-2 text-black">
            {languages.map((lang) => (
              <label
                key={lang}
                className="bg-white px-2 py-1 rounded flex items-center gap-1"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={selectedLanguage === lang}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="bg-[#5c80bc] p-4 rounded shadow-md text-white">
          <h2 className="font-bold text-lg mb-2 border-b border-white pb-1">
            2. Select Duration in Minutes
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {durations.map((time) => (
              <label
                key={time}
                className={`px-2 py-1 rounded text-center font-medium cursor-pointer bg-white text-black border border-gray-400 ${
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
                {time} M
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Selection & Preview */}
      <div className="flex flex-col md:flex-row min-h-[70vh] font-serif bg-white rounded shadow overflow-hidden">
        {/* Exercise Sidebar */}
        <div className="w-full md:w-1/4 border-r border-gray-300 bg-[#f2f2f2] p-3">
          <h3 className="text-sm font-semibold mb-1">3. Select Exercise</h3>
          <div className="h-64 overflow-y-scroll pr-1 border border-gray-300 rounded bg-white">
            {exercises.map((item) => (
              <div
                key={item}
                className={`text-sm px-2 py-1 cursor-pointer ${
                  selected === item
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelected(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button className="bg-green-500 cursor-pointer text-white text-sm px-2 py-1 rounded hover:bg-green-600">
              Add Exercise(+)
            </button>
            <button className="bg-red-500 cursor-pointer text-white text-sm px-2 py-1 rounded hover:bg-red-600">
              Delete Exercise(-)
            </button>
            <button className="bg-yellow-500 cursor-pointer text-white text-sm px-2 py-1 rounded hover:bg-yellow-600">
              Load Exercise
            </button>
          </div>
        </div>

        {/* Exercise Preview */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-sm">Exercise 8/301 Preview</h2>
            <div className="flex items-center gap-2 text-sm">
              <span>Font: Times New Roman</span>
              <button className="bg-gray-200 px-2 cursor-pointer py-0.5 rounded">
                Set Font
              </button>
              <button className="bg-red-500 text-white cursor-pointer px-2 py-0.5 rounded">
                Print
              </button>
            </div>
          </div>

          <div className="border border-gray-300 p-3 text-sm leading-6 h-[50vh] overflow-y-scroll bg-[#fefefe] rounded">
            Brexit was quoted as being the financial equivalent of doomsday for
            Britain’s economy. Every economic pundit worth his/her salt
            predicted dire consequences for Britain. Fear mongering was rampant,
            and memories from the Great Depression were invoked. However, a
            quarter into the Brexit all this has turned out to be mere
            propaganda. The Bank of England has come out of this test with
            flying colours. Not only is the British economy afloat, but it has
            also kicked into high gear with England defying the possibility of a
            recession and registering record growth.
          </div>

          <div className="mt-3 text-xs text-gray-700">
            <p>
              Total Characters: <b>5067</b> &nbsp;&nbsp; <span className="pl-10">Total Words: <b>848</b>{" "}
              &nbsp;&nbsp;</span> <span className="pl-10">Average Word Length: <b>6.0</b></span>
            </p>
            <p className="italic text-[12px] mt-2 font-semibold">
              Note: Contents are Automatically Repeated as per test duration
            </p>
          </div>
        </div>
      </div>

      {/* Exam Selector Section */}
      <div className="flex border text-sm font-serif w-full max-w-8xl mx-auto mt-4 rounded shadow overflow-hidden bg-white">
        {/* Exam List */}
        <div className="w-1/4 border-r p-2 bg-[#f2f2f2]">
          <h3 className="text-gray-800 font-semibold mb-2">4. Select Exam</h3>
          <ul className="space-y-1">
            {exams.map((exam) => (
              <li
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`cursor-pointer px-2 py-1 rounded-l ${
                  selectedExam === exam
                    ? "text-red-600 font-semibold border-l-4 border-red-500 bg-white"
                    : "text-blue-700 hover:bg-gray-100"
                }`}
              >
                {exam}
              </li>
            ))}
          </ul>
        </div>

        {/* Exam Description */}
        <div className="flex-1 flex flex-col justify-between p-3 bg-[#fefefe] relative">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 mb-2">
              Exam Description
            </h3>
            <button className="bg-gray-200 px-4 py-1 cursor-pointer rounded text-md shadow">
              Type Test
            </button>
          </div>

          <div className="text-green-700 leading-relaxed text-justify mt-1 ">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
