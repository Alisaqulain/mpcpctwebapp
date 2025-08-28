"use client";
import React, { useState, useEffect } from "react";
import { 
  getLearningData, 
  getSections, 
  getLanguages, 
  getSettings,
  getLessonsBySection,
  getProgressStats,
  getLessonContent,
  getAvailableLanguages,
  validateLanguageSelection
} from "@/lib/learningData";

export default function TypingTutor() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedSubLanguage, setSelectedSubLanguage] = useState("");
  const [duration, setDuration] = useState(5);
  const [backspace, setBackspace] = useState("OFF");
  const [selectedSection, setSelectedSection] = useState("home");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [learningData, setLearningData] = useState(null);
  const [stats, setStats] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [currentLessonContent, setCurrentLessonContent] = useState("");

  useEffect(() => {
    // Load learning data
    const data = getLearningData();
    setLearningData(data);
    
    // Load statistics
    const statistics = getProgressStats();
    setStats(statistics);
    
    // Load available languages
    const languages = getAvailableLanguages();
    setAvailableLanguages(languages);
  }, []);

  // Update lesson content when language or lesson selection changes
  useEffect(() => {
    if (learningData && selectedCheckbox) {
      const lesson = selectedCheckbox;
      const languageId = selectedLanguage.toLowerCase();
      const subLanguageId = selectedSubLanguage.toLowerCase();
      
      const content = getLessonContent(lesson, languageId, subLanguageId);
      setCurrentLessonContent(content || "Content not available");
    }
  }, [selectedLanguage, selectedSubLanguage, selectedCheckbox, learningData]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Reset sub-language when main language changes
    setSelectedSubLanguage("");
  };

  const handleSubLanguageChange = (subLanguage) => {
    setSelectedSubLanguage(subLanguage);
  };

  const handleCheckboxChange = (lesson) => {
    setSelectedCheckbox(lesson);
  };

  if (!learningData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const currentSection = learningData.sections.find(section => section.id === selectedSection);
  const lessons = currentSection ? currentSection.lessons : [];
  const languages = getLanguages();
  const settings = getSettings();

  return (
    <div className="bg-white font-sans min-h-screen p-4">
      {/* Progress Stats Banner */}
      {stats && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg mb-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalLessons}</div>
              <div className="text-sm">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.sections}</div>
              <div className="text-sm">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalTime}</div>
              <div className="text-sm">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Object.values(stats.difficultyBreakdown).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-sm">Available</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Settings Section */}
    <div className="grid grid-cols-3 gap-1 md:gap-4">
  {/* Language Selection */}
  <div className="bg-[#290c52] p-[6px] md:p-4 rounded shadow-md text-white">
    <h2 className="font-bold text-[9px] md:text-lg mb-2 border-b border-white pb-1">
      1. Select Typing Language
    </h2>
    <div className="grid grid-cols-2 gap-1 text-black mb-2">
            {languages.main.map((lang) => (
        <label
                key={lang.id}
          className="bg-white px-1 py-1 rounded flex items-center gap-1 w-full"
        >
          <input
            type="radio"
            name="mainLanguage"
            className="w-3 h-3"
                  value={lang.name}
                  checked={selectedLanguage === lang.name}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                />
                <p className="text-[8px] md:text-sm">{lang.name}</p>
        </label>
      ))}
    </div>
          {languages.main.find(lang => lang.name === selectedLanguage)?.subLanguages.length > 0 && (
    <div className="grid grid-cols-2 gap-1 text-black">
              {languages.main.find(lang => lang.name === selectedLanguage)?.subLanguages.map((subLang) => (
          <label
                  key={subLang.id}
                  className="bg-white px-1 py-1 rounded flex items-center gap-1 w-full"
          >
            <input
              type="radio"
              name="subLanguage"
              className="w-3 h-3"
                    value={subLang.name}
                    checked={selectedSubLanguage === subLang.name}
                    onChange={(e) => handleSubLanguageChange(e.target.value)}
                  />
                  <p className="text-[7px] md:text-sm">{subLang.name}</p>
          </label>
              ))}
    </div>
          )}
  </div>

  {/* Duration */}
  <div className="bg-[#290c52] p-[6px] md:p-4 rounded shadow-md text-white">
    <h2 className="font-bold text-[9px] md:text-lg mb-2 border-b border-white pb-1">
      2. Select Duration in Minutes
    </h2>
    <div className="grid grid-cols-3 gap-1 mt-4">
            {settings.durations.map((time) => (
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
            {settings.backspaceOptions.map((option) => (
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
          {learningData.sections.map((section, index) => (
            <p
              key={section.id}
              onClick={() => {
                setSelectedSection(section.id);
                setSelectedCheckbox(null);
              }}
              className={`pl-2 cursor-pointer px-4 py-2 rounded-md ${
                selectedSection === section.id 
                  ? "border w-70 border-white bg-white text-[#290c52] font-bold" 
                  : "border-none"
              }`}
            >
              {section.lessonNumber}.{section.name}
            </p>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white p-6 shadow-md w-[60%] md:w-[70%] mx-auto mt-5 mr-2 md:mr-0">
          {currentSection && (
            <>
          <h2 className="text-center font-bold italic mb-4 text-md md:text-5xl">
                Lesson {currentSection.lessonNumber} - {currentSection.name} Row
          </h2>
              <p className="text-center text-gray-600 mb-6">{currentSection.description}</p>

          {/* Lesson List with Single Select Checkbox */}
          <ul className="space-y-8 mb-6 ml-0 md:ml-75 mt-10">
                {lessons.map((lesson, idx) => (
                  <li key={lesson.id} className="flex items-center gap-4">
  {/* Lesson Number */}
  <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      {lesson.id}
  </span>

  {/* Checkbox */}
  <input
    type="checkbox"
    className="w-5 h-5 accent-green-500 flex-shrink-0"
                      checked={selectedCheckbox?.id === lesson.id}
                      onChange={() => handleCheckboxChange(lesson)}
  />

  {/* Lesson Title */}
                    <div className="flex-1">
                      <span className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                        {selectedLanguage === "Hindi" && lesson.title_hindi ? lesson.title_hindi : lesson.title}
                      </span>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {lesson.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lesson.estimatedTime}
  </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedLanguage === "Hindi" && lesson.description_hindi ? lesson.description_hindi : lesson.description}
                      </p>
                    </div>
</li>
                ))}
          </ul>

              {/* Selected Lesson Content Preview */}
              {selectedCheckbox && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Content Preview ({selectedLanguage}{selectedSubLanguage ? ` - ${selectedSubLanguage}` : ''})</h3>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    {currentLessonContent || "Select a language and script to view content"}
                  </div>
                                     <div className="mt-3">
                     <a
                       href={`/typing-test?lesson=${selectedCheckbox.id}&language=${selectedLanguage.toLowerCase()}&subLanguage=${selectedSubLanguage.toLowerCase()}&duration=${duration}&backspace=${backspace}`}
                       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
                     >
                       Start Typing Test
                     </a>
                   </div>
                </div>
              )}

              <button className="bg-green-500 text-white w-full md:w-[40%] ml-0 md:ml-73 px-4 py-2 rounded mx-auto block hover:bg-green-600 transition-colors">
            <a href="/tips/home">Start Test</a>
          </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
