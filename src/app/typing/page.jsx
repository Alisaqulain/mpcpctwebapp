"use client";
import React, { useState, useEffect } from "react";

export default function TypingTutor() {
  const content = [
    "Aesop was one of the great Greek writers. He is best known",
    "for his fables, stories that have a moral. They teach us something",
    "about how we should live our lives.",
    "Aesop wrote thousands of these stories. Here are a few.",
    "a Wolf decided to disguise the way he looked. He thought it would help him get food more"
  ];
  const words = content.join(" ").trim().split(/\s+/);

  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(0);
  const [clockTime, setClockTime] = useState(new Date());
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const typedWords = typedText.trim().split(/\s+/);
  const correctWords = typedWords.filter((word, i) => word === words[i]);
  const wrongWords = typedWords.filter((word, i) => word !== words[i] && word);

  useEffect(() => {
    const timer = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!startTime || typedText.trim().length === 0 || isPaused) return;
    const timeElapsed = (Date.now() - startTime) / 60000;
    setWPM(Math.floor(correctWords.length / timeElapsed));
  }, [typedText, isPaused]);

  const handleChange = (e) => {
    if (isPaused) return;
    const newValue = e.target.value;

    if (typedText.length > newValue.length) {
      setBackspaceCount((prev) => prev + 1);
    }

    if (!startTime) setStartTime(Date.now());
    setTypedText(newValue);
  };

  const handleReset = () => {
    setTypedText("");
    setStartTime(null);
    setWPM(0);
    setBackspaceCount(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const formatClock = (date) =>
    date.toLocaleTimeString("en-IN", { hour12: false });

  const renderColoredWords = () => {
    let pointer = 0;
    return content.map((line, lineIndex) => {
      const lineWords = line.trim().split(/\s+/);
      return (
        <p key={lineIndex} className="mb-2" style={{ fontSize: `${fontSize}px` }}>
          {lineWords.map((word, i) => {
            const index = pointer++;
            let className = "";
            if (typedWords.length - 1 > index) {
              className = typedWords[index] === word ? "text-green-600" : "text-red-600";
            } else if (typedWords.length - 1 === index) {
              className = "text-blue-600 underline";
            } else {
              className = "text-gray-500";
            }
            return (
              <span key={i} className={`${className} mr-1`}>
                {word}
              </span>
            );
          })}
        </p>
      );
    });
  };

  const increaseFont = () => {
    setFontSize((prev) => Math.min(prev + 2, 30));
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, 10));
  };

  return (
    <div className="min-h-screen bg-[#290c52] p-14 m-8 rounded-4xl">
      <div className="max-w-6xl mx-auto">
        <button className="absolute right-12 top-85  border border-gray-600 text-white bg-red-500 px-4 py-1 rounded-md">
          <a href="/skill_test">close</a>
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Typing Area */}
          <div className="flex-1 bg-[#f9f5e9] p-6 rounded-xl shadow-lg">
            <div className="text-sm leading-relaxed mb-4 overflow-y-auto max-h-[50vh] mt-4">
              {renderColoredWords()}
            </div>

            <textarea
              value={typedText}
              onChange={handleChange}
              disabled={isPaused}
              className="w-full h-40 p-2 border-t border-gray-400 rounded-md focus:outline-none mt-4 disabled:opacity-50"
              placeholder="Start typing here..."
              style={{ fontSize: `${fontSize}px` }}
            />

            <div className="flex justify-center mt-18 gap-6">
              <button
                onClick={handleReset}
                className="bg-orange-400 text-lg cursor-pointer hover:bg-orange-500 text-white px-8 py-1 rounded shadow"
              >
                Reset
              </button>
              <button
                onClick={togglePause}
                className="bg-[#290c52] cursor-pointer text-lg hover:bg-blue-600 text-white px-8 py-1 rounded shadow"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 bg-[#290c52] text-white rounded-lg p-4">
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/mef.png"
                alt="User"
                className="w-20 h-20 rounded-md border-2 border-white"
              />
              <p className="font-semibold text-lg">Anas Ansari</p>

              <div className="bg-black text-white text-center w-full py-2 rounded">
                <div className="text-base">Time</div>
                <div className="text-green-400 text-lg font-bold">
                  {formatClock(clockTime)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm w-full text-center">
                <div className="bg-green-400 text-black rounded p-1">
                  <p className="font-semibold">Correct</p>
                  <p>{correctWords.length}</p>
                </div>
                <div className="bg-red-500 text-black rounded p-1">
                  <p className="font-semibold">Wrong</p>
                  <p>{wrongWords.length}</p>
                </div>
                <div className="bg-yellow-300 text-black rounded p-1">
                  <p className="font-semibold">Total</p>
                  <p>{words.length}</p>
                </div>
                <div className="bg-blue-300 text-black rounded p-1">
                  <p className="font-semibold">Backspace</p>
                  <p>{backspaceCount}</p>
                </div>
              </div>

              <div className="mt-2">
                <div className="relative w-24 h-24 bg-black rounded-full border-4 border-white flex items-center justify-center">
                  <div className="absolute left-1 text-red-500 text-[7px] font-bold tracking-widest">SPEED</div>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 40 * Math.cos((wpm / 90) * (Math.PI * 1.5) - Math.PI)}
                      y2={50 + 40 * Math.sin((wpm / 90) * (Math.PI * 1.5) - Math.PI)}
                      stroke="red"
                      strokeWidth="3"
                    />
                    {Array.from({ length: 9 }).map((_, i) => {
                      const startAngle = (-Math.PI * 5) / 6;
                      const endAngle = (Math.PI * 5) / 6;
                      const angle = startAngle + (i / 8) * (endAngle - startAngle);
                      const x = 50 + 42 * Math.cos(angle);
                      const y = 50 + 42 * Math.sin(angle);
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y}
                          fontSize="10"
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {(i + 1) * 10}
                        </text>
                      );
                    })}
                  </svg>
                  <span className="absolute bottom-2 text-red-500 font-bold text-lg">{wpm}</span>
                </div>
              </div>

              <div className="w-full mt-2">
                <p className="text-center text-lg mb-2">Font Size</p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={decreaseFont} 
                    className="bg-amber-300 cursor-pointer border border-gray-700 px-6 py-1 text-xl rounded-2xl"
                  >
                    A -
                  </button>
                  <button 
                    onClick={increaseFont} 
                    className="bg-amber-600 cursor-pointer border border-gray-600 px-6 py-1 text-xl rounded-2xl"
                  >
                    A +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}