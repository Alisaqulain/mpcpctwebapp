"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getExamInfo,
  getExamSections,
  getQuestionsBySection,
  getNextQuestion,
  getPreviousQuestion,
  calculateScore,
  getSectionStats,
  getTotalQuestions,
} from "@/lib/examQuestions";

export default function CPCTPage() {
  const examInfo = getExamInfo();
  const sections = getExamSections();
  const [section, setSection] = useState(sections[0] || "COMPUTER PROFICIENCY");
  const [timeLeft, setTimeLeft] = useState((examInfo?.totalTime || 75) * 60);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [selectedTest, setSelectedTest] = useState("CPCT Actual");
  const [language, setLanguage] = useState("English");
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
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
          try { handleSubmitExam(); } catch {}
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
  const sectionQuestions = getQuestionsBySection(section);
  const currentQuestion = sectionQuestions[currentIndex] || null;

  const persistState = (partial) => {
    try {
      const state = {
        section,
        currentIndex,
        answers,
        timeLeft,
        ...partial,
      };
      localStorage.setItem("examState", JSON.stringify(state));
    } catch {}
  };

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("examLanguage");
      if (storedLang) setLanguage(storedLang === "हिन्दी" ? "Hindi" : "English");
      // Support direct result and exam type via URL
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      if (type) {
        try { localStorage.setItem('examType', type.toUpperCase()); } catch {}
      }
      const existing = localStorage.getItem("examState");
      if (existing) {
        const parsed = JSON.parse(existing);
        if (parsed.section) setSection(parsed.section);
        if (parsed.currentIndex !== undefined) setCurrentIndex(parsed.currentIndex);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.timeLeft !== undefined) setTimeLeft(parsed.timeLeft);
      }

      // If direct=1, auto-submit zero-score result for the selected exam
      const direct = params.get('direct');
      const directFlag = localStorage.getItem('directExamResult');
      if (direct === '1' || directFlag === '1') {
        const score = calculateScore({});
        const stats = getSectionStats({});
        const totalQs = getTotalQuestions();
        const payload = {
          score: { ...score, total: totalQs },
          stats,
          timeTaken: 0,
          submittedAt: new Date().toISOString(),
        };
        localStorage.setItem("examResults", JSON.stringify(payload));
        localStorage.removeItem("examState");
        window.location.href = "/exam/exam-result";
        return;
      }
    } catch {}
  }, []);

  const handleSelectAnswer = (optionIndex) => {
    if (!currentQuestion) return;
    const next = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(next);
    persistState({ answers: next });
  };

  const goNext = () => {
    if (!currentQuestion) return;
    const nextQ = getNextQuestion(section, currentQuestion.id);
    if (!nextQ) { handleSubmitExam(); return; }
    const nextSection = getExamSections().find((s) => getQuestionsBySection(s).some((q) => q.id === nextQ.id)) || section;
    const indexInSection = getQuestionsBySection(nextSection).findIndex((q) => q.id === nextQ.id);
    setSection(nextSection);
    setCurrentIndex(Math.max(0, indexInSection));
    persistState({ section: nextSection, currentIndex: Math.max(0, indexInSection) });
  };

  const goPrev = () => {
    if (!currentQuestion) return;
    const prevQ = getPreviousQuestion(section, currentQuestion.id);
    if (!prevQ) return;
    const prevSection = getExamSections().find((s) => getQuestionsBySection(s).some((q) => q.id === prevQ.id)) || section;
    const indexInSection = getQuestionsBySection(prevSection).findIndex((q) => q.id === prevQ.id);
    setSection(prevSection);
    setCurrentIndex(Math.max(0, indexInSection));
    persistState({ section: prevSection, currentIndex: Math.max(0, indexInSection) });
  };

  const clearResponse = () => {
    if (!currentQuestion) return;
    const next = { ...answers, [currentQuestion.id]: null };
    setAnswers(next);
    persistState({ answers: next });
  };

  const handleSubmitExam = () => {
    try {
      const score = calculateScore(answers);
      const stats = getSectionStats(answers);
      const timeTaken = (examInfo?.totalTime || 75) * 60 - timeLeft;
      const payload = { score, stats, timeTaken, submittedAt: new Date().toISOString() };
      localStorage.setItem("examResults", JSON.stringify(payload));
      localStorage.removeItem("examState");
      window.location.href = "/exam/exam-result";
    } catch (e) { console.error("Failed to submit exam", e); }
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
            
            {/* Question Palette */}
            <h2 className="font-bold mb-2 text-center bg-[#290c52] text-white py-2 rounded">
              Question Palette
            </h2>
            
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
            
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-4">
              Submit Exam
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 w-full bg-[#290c52] text-white flex justify-between items-center px-4 py-2 text-sm z-30">
          <div className="font-semibold">CPCT Exam - {section}</div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 pr-4">
              <img src="/lo.jpg" className="w-8 h-8 rounded-full border" />
              <span className="text-xs text-yellow-300 hidden sm:inline">Anas</span>
            </div>
            <span className="text-lg">Time Left: <b className={`px-3 rounded ${
              timeLeft <= 300 ? 'bg-red-600 animate-pulse' : 
              timeLeft <= 600 ? 'bg-orange-500' : 'bg-red-500'
            } text-white`}>{formatTime(timeLeft)}</b></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden lg:block bg-gray-200 h-2 mt-10">
          <div 
            className="bg-green-500 h-2 transition-all duration-300"
            style={{ width: "25%" }}
          ></div>
        </div>

        {/* Section Navigation */}
        <div className="hidden lg:flex border-b px-4 py-0 border-y-gray-200 bg-white text-xs overflow-x-auto">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => { setSection(sec); setCurrentIndex(0); persistState({ section: sec, currentIndex: 0 }); }}
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
          </div>
        </div>

        {/* Question Panel */}
        <div className="flex-grow p-4 overflow-auto bg-white-50 mt-0 md:mt-0 relative">
          {/* Question Header */}
          <div className="bg-[#290c52] text-white text-sm px-4 py-3 rounded-t flex justify-between flex-wrap gap-2">
            <span>Question {currentIndex + 1} of {sectionQuestions.length} - {section}</span>
            <div className="flex items-center gap-2">
              <p>View in:</p>
              <select className="text-black text-xs bg-white rounded px-2 py-1" value={language} onChange={(e) => { setLanguage(e.target.value); localStorage.setItem("examLanguage", e.target.value === "Hindi" ? "हिन्दी" : "English"); }}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>

          {/* Question Content */}
          <div className="border border-gray-300 rounded-b bg-white">
            <div className="bg-gray-50 px-4 py-3 border-b text-sm font-semibold flex flex-col sm:flex-row justify-between">
              <span>Question ID: {currentQuestion?.id || '-'}</span>
              <span className="mt-1 sm:mt-0">Marks: 1 | Negative Marks: 0</span>
            </div>

            {section === "READING COMPREHENSION" && currentQuestion?.passage ? (
              <div className="flex flex-col lg:flex-row p-4 gap-x-6 gap-y-10">
                <div className="lg:w-2/3 text-sm border-r pr-4 max-h-72 overflow-y-auto">
                  <h3 className="font-bold mb-2">Passage:</h3>
                  <p className="text-gray-700">{currentQuestion.passage}</p>
                </div>
                <div className="lg:w-1/3">
                  <p className="mb-4 font-medium">{language === 'Hindi' ? (currentQuestion.question_hi || currentQuestion.question) : currentQuestion.question}</p>
                  {(language === 'Hindi' ? (currentQuestion.options_hi || currentQuestion.options) : currentQuestion.options).map((opt, i) => (
                    <label key={i} className="flex items-start gap-x-2 gap-y-6">
                      <input type="radio" name="q1" className="mt-1" checked={answers[currentQuestion.id] === i} onChange={() => handleSelectAnswer(i)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-md md:text-xl mb-28">
                <p className="mb-4">{language === 'Hindi' ? (currentQuestion?.question_hi || currentQuestion?.question) : currentQuestion?.question}</p>
                {(language === 'Hindi' ? (currentQuestion?.options_hi || currentQuestion?.options) : currentQuestion?.options)?.map((opt, i) => (
                  <label key={i} className="flex items-start gap-2">
                    <input type="radio" name="q1" className="mt-1" checked={answers[currentQuestion.id] === i} onChange={() => handleSelectAnswer(i)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center bg-white-50 px-4 py-3 border-t flex-wrap gap-2">
            <div className="space-x-2">
              <button className="px-4 py-2 absolute md:relative mb-[-30] ml-38 md:ml-0 md:mb-0 bg-blue-600 text-white rounded text-sm whitespace-nowrap" onClick={goNext}>Mark for Review & Next</button>
              <button className="px-4 py-2  bg-red-500 text-white rounded text-sm whitespace-nowrap" onClick={clearResponse}>Clear Response</button>
            </div>
            <div className="space-x-20 md:space-x-2">
              <button className="bg-blue-400 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded whitespace-nowrap" onClick={goPrev}>Previous</button>
              <button className="bg-green-600 hover:bg-cyan-700 text-white px-6 py-2 text-sm rounded whitespace-nowrap" onClick={goNext}>Save & Next</button>
            </div>
            <button className="bg-green-800 hover:bg-cyan-700 text-white px-12 py-2 ml-2 text-[13px] rounded w-full md:hidden" onClick={handleSubmitExam}>Submit Exam</button>
          </div>
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
            {sectionQuestions.map((q, i) => {
              const answered = answers[q.id] !== undefined && answers[q.id] !== null;
              const isCurrent = currentQuestion?.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => { setCurrentIndex(i); persistState({ currentIndex: i }); }}
                  className={`w-8 h-8 flex items-center justify-center text-white text-sm font-semibold border ${
                    isCurrent ? "bg-red-600 border-black" : answered ? "bg-green-500 border-green-700" : "bg-gray-400 border-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        
          <button className="bg-green-800 hover:bg-cyan-700 text-white px-12 py-2 ml-2 mt-[-4] text-[13px] rounded" onClick={handleSubmitExam}>Submit Exam</button>
        </div>
      </div>
    </div>
  );
}