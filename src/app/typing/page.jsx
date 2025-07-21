"use client";
import React, { useState, useEffect, useRef } from "react";

export default function TypingTutor() {
  const content = [
"a Wolf decided to disguise the way he looked. He thought it would help him get food more",
"a Wolf decided to disguise the way he looked. He thought it would help him get food more",
"a Wolf decided to disguise the way he looked. He thought it would help him get food more",
"a Wolf decided to disguise the way he looked. He thought it would help him get food more",
    "a Wolf decided to disguise the way he looked. He thought it would help him get food more",
  ];
  const words = content.join(" ").trim().split(/\s+/);

  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef(null);
  const wordRefs = useRef([]);
  const containerRef = useRef(null);

  const typedWords = typedText.trim().split(/\s+/);
  const correctWords = typedWords.filter((word, i) => word === words[i]);
  const wrongWords = typedWords.filter((word, i) => word !== words[i] && word);

  useEffect(() => {
    if (!isPaused && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, startTime]);

  useEffect(() => {
    if (elapsedTime === 0 || isPaused) return;
    setWPM(Math.floor((correctWords.length / elapsedTime) * 60));
  }, [elapsedTime, correctWords.length, isPaused]);

  const handleChange = (e) => {
    if (isPaused) return;
    const newValue = e.target.value;
    if (typedText.length > newValue.length) {
      setBackspaceCount((prev) => prev + 1);
    }
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTypedText(newValue);

    const currentIndex = newValue.trim().split(/\s+/).length - 1;
    const nextWordEl = wordRefs.current[currentIndex];
    if (nextWordEl && containerRef.current) {
      nextWordEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTypedText("");
    setStartTime(null);
    setWPM(0);
    setBackspaceCount(0);
    setElapsedTime(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const formatClock = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const renderColoredWords = () => {
    let pointer = 0;
    return content.map((line, lineIndex) => {
      const lineWords = line.trim().split(/\s+/);
      return (
        <p
          key={lineIndex}
          className="mb-1 break-words h-[40px] flex items-center"
          style={{ fontSize: `${fontSize}px` }}
          ref={lineIndex === 0 ? containerRef : null}
        >
          {lineWords.map((word, i) => {
            const index = pointer++;
            let className = "";
            if (typedWords.length - 1 > index) {
              className = typedWords[index] === word ? "text-green-600" : "text-red-600";
            } else if (typedWords.length - 1 === index) {
              className = "bg-blue-500 text-white";
            } else {
              className = "text-gray-500";
            }
            return (
              <span
                key={i}
                ref={(el) => (wordRefs.current[index] = el)}
                className={`${className} mr-1`}
              >
                {word}
              </span>
            );
          })}
        </p>
      );
    });
  };

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 30));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 10));

  return (
    <div className="min-h-screen bg-[#290c52] bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat px-4 py-6 md:px-14 md:py-12 md:mx-8 md:my-8 rounded-[0px] md:rounded-[100px]">
      <div className="max-w-7xl mx-auto mt-30 md:mt-15">
        <button className="absolute right-9 md:right-22 top-65 md:top-86 border border-gray-600 text-white bg-red-500 px-4 py-1 rounded-md">
          <a href="/skill_test">close</a>
        </button>

        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Typing Area */}
          <div className="w-[100%] lg:w-[110%]">
            <div className="bg-white p-4 mr-10 md:p-6 rounded-xl shadow-lg ml-5 mt-[-25]">
              <div className="text-sm leading-relaxed mb-4 overflow-auto min-h-[200px] max-h-[250px] mt-4 break-words font-sans">
                {renderColoredWords()}
              </div>
              <textarea
                value={typedText}
                onChange={handleChange}
                disabled={isPaused}
                className="w-full min-h-[120px] max-h-[200px] md:min-h-[180px] md:max-h-[220px] p-2 border-t border-gray-400 rounded-md focus:outline-none mt-4 disabled:opacity-50"
                placeholder="Start typing here..."
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div className="flex justify-center mt-5 gap-6 flex-wrap">
              <button
                onClick={handleReset}
                className="bg-pink-500 text-lg cursor-pointer hover:bg-orange-500 text-white px-8 py-1 rounded shadow"
              >
                Reset
              </button>
              <button
                onClick={togglePause}
                className="bg-blue-600 cursor-pointer text-lg hover:bg-blue-700 text-white px-8 py-1 rounded shadow"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[20%] text-white p-3 fixed top-0 mt-[-15] left-0 z-50 bg-[#290c52] bg-[url('/bg.jpg')] bg-cover bg-top bg-no-repeat lg:static lg:bg-none lg:bg-transparent">
            <div className="flex flex-col items-center space-y-1">
              <img
                src="/lo.jpg"
                alt="User"
                className="w-30 h-25 rounded-md border-2 border-white"
              />
              <p className="font-semibold text-xs">Anas Ansari</p>
              <div className="w-24 h-9 rounded-lg overflow-hidden mx-auto text-center mt-2 shadow-[0_1px_8px_white,0_2px_6px_silver,0_4px_10px_rgba(0,0,0,0.7)]">
                <div className="bg-black text-white text-[10px] font-semibold py-[1px]">Time</div>
                <div className="bg-white text-black text-sm font-bold">{formatClock(elapsedTime)}</div>
              </div>
              <div className="grid grid-cols-2 gap-y-3 mt-2 gap-x-4 md:gap-x-15 mr-0 md:mr-10 w-full text-center">
                {[{ label: "Correct", value: correctWords.length, color: "text-green-600" },
                  { label: "Wrong", value: wrongWords.length, color: "text-red-500" },
                  { label: "Total", value: words.length, color: "text-[#290c52]" },
                  { label: "Backspace", value: backspaceCount, color: "text-blue-500" }].map(({ label, value, color }, i) => (
                    <div key={i} className="w-full sm:w-24 h-9 rounded-lg overflow-hidden mx-auto shadow-[0_1px_8px_white,0_2px_6px_silver,0_4px_10px_rgba(0,0,0,0.7)]">
                      <div className="bg-black text-white text-[10px] font-semibold py-[1px]">{label}</div>
                      <div className={`bg-white ${color} text-sm font-bold`}>{value}</div>
                    </div>
                  ))}
              </div>

              {/* Speedometer */}
              <div className="hidden lg:block">
                <div className="border-6 border-black rounded-full mt-2">
                  <div className="relative w-24 h-24 bg-black rounded-full border-4 border-white flex items-center justify-center">
                    <div className="absolute left-1 text-red-500 text-[8px] font-bold tracking-widest">SPEED</div>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <line
                        x1="50"
                        y1="50"
                        x2={50 + 42 * Math.cos((wpm / 90) * (Math.PI * 1.5) - Math.PI)}
                        y2={50 + 42 * Math.sin((wpm / 90) * (Math.PI * 1.5) - Math.PI)}
                        stroke="red"
                        strokeWidth="2"
                      />
                      {Array.from({ length: 9 }).map((_, i) => {
                        const startAngle = (-Math.PI * 5) / 6;
                        const endAngle = (Math.PI * 5) / 6;
                        const angle = startAngle + (i / 8) * (endAngle - startAngle);
                        const x = 50 + 40 * Math.cos(angle);
                        const y = 50 + 42 * Math.sin(angle);
                        return (
                          <text key={i} x={x} y={y} fontSize="10" fill="white" textAnchor="middle" dominantBaseline="middle">
                            {(i + 1) * 10}
                          </text>
                        );
                      })}
                    </svg>
                    <span className="absolute bottom-5 text-red-500 font-bold text-xs">{wpm}</span>
                  </div>
                </div>
              </div>

              <div className="w-full mt-2">
                <p className="text-center text-sm mb-1">Font Size</p>
                <div className="flex justify-center gap-3">
                  <button onClick={decreaseFont} className="bg-white text-black border-3 cursor-pointer border-black px-5 py-[2px] text-xs rounded-md">
                    A -
                  </button>
                  <button onClick={increaseFont} className="bg-white text-black cursor-pointer border-3 border-black px-5 py-[2px] text-xs rounded-md">
                    A +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End Sidebar */}
        </div>
      </div>
    </div>
  );
}
