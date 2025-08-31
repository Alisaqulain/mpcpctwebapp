"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  getExamQuestions, 
  getQuestionsBySection, 
  getExamSections, 
  getExamInfo,
  getNextQuestion,
  getPreviousQuestion,
  calculateScore,
  getSectionStats
} from "@/lib/examQuestions";

export default function ExamMode() {
  // Exam state
  const [currentSection, setCurrentSection] = useState("COMPUTER PROFICIENCY");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  
  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [selectedTest, setSelectedTest] = useState("CPCT Actual");
  const [isSoundOn, setIsSoundOn] = useState(true);
  
  // Timer and audio
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const info = getExamInfo();
      return info && info.totalTime ? info.totalTime * 60 : 75 * 60;
    } catch (error) {
      console.error('Error getting exam info:', error);
      return 75 * 60; // Default to 75 minutes
    }
  });
  const [isExamStarted, setIsExamStarted] = useState(false);
  const audioRef = useRef(null);

  // User data
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get exam data with error handling
  const examInfo = (() => {
    try {
      return getExamInfo();
    } catch (error) {
      console.error('Error getting exam info:', error);
      return null;
    }
  })();
  
  const sections = (() => {
    try {
      return getExamSections();
    } catch (error) {
      console.error('Error getting exam sections:', error);
      return [];
    }
  })();
  
  const currentSectionQuestions = (() => {
    try {
      return getQuestionsBySection(currentSection) || [];
    } catch (error) {
      console.error('Error getting questions for section:', currentSection, error);
      return [];
    }
  })();
  
  const currentQuestion = currentSectionQuestions[currentQuestionIndex] || null;
  const currentSectionIndex = Math.max(0, sections?.indexOf(currentSection) || 0);
  
  // Ensure current section is valid
  const validCurrentSection = sections && sections.includes(currentSection) ? currentSection : (sections && sections.length > 0 ? sections[0] : null);
  
  // Calculate safe question index dynamically
  const getSafeQuestionIndex = () => {
    if (!validCurrentSection || !currentSectionQuestions) return 0;
    return Math.max(0, Math.min(currentQuestionIndex, (currentSectionQuestions.length - 1) || 0));
  };
  
  // Load exam data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('examLoginData');
    if (storedData) {
      try {
        setExamData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing exam data:', error);
      }
    }
    
    // Load saved answers
    const savedAnswers = localStorage.getItem('examAnswers');
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (error) {
        console.error('Error parsing saved answers:', error);
      }
    }
    
    // Load saved marked questions
    const savedMarked = localStorage.getItem('examMarkedForReview');
    if (savedMarked) {
      try {
        setMarkedForReview(JSON.parse(savedMarked));
      } catch (error) {
        console.error('Error parsing saved marked questions:', error);
      }
    }
    
    // Load visited questions
    const savedVisited = localStorage.getItem('examVisitedQuestions');
    if (savedVisited) {
      try {
        setVisitedQuestions(JSON.parse(savedVisited));
      } catch (error) {
        console.error('Error parsing saved visited questions:', error);
      }
    }
    
    // Mark loading as complete
    setIsLoading(false);
  }, []);

  // Initialize audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/tick.wav");
      audioRef.current.volume = 0.2;
    }
  }, []);

  // Timer functionality
  useEffect(() => {
    if (!isExamStarted) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-submit when time expires
          handleExamSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isExamStarted]);

  // Play sound each second
  useEffect(() => {
    if (isSoundOn && audioRef.current && timeLeft > 0 && isExamStarted) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Sound error:", err);
      });
    }
  }, [timeLeft, isSoundOn, isExamStarted]);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem('examAnswers', JSON.stringify(answers));
  }, [answers]);

  // Save marked questions to localStorage
  useEffect(() => {
    localStorage.setItem('examMarkedForReview', JSON.stringify(markedForReview));
  }, [markedForReview]);

  // Save visited questions to localStorage
  useEffect(() => {
    localStorage.setItem('examVisitedQuestions', JSON.stringify(visitedQuestions));
  }, [visitedQuestions]);

  // Ensure currentQuestionIndex is valid when section changes
  useEffect(() => {
    if (currentSectionQuestions && currentSectionQuestions.length > 0 && currentQuestionIndex >= currentSectionQuestions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [currentSection, currentQuestionIndex, currentSectionQuestions.length]);

  // Ensure current section is valid
  useEffect(() => {
    if (sections && sections.length > 0 && !sections.includes(currentSection)) {
      setCurrentSection(sections[0]);
      setCurrentQuestionIndex(0);
    }
  }, [sections, currentSection]);



  // Start exam
  const startExam = () => {
    // Check if we have valid exam data
    if (!sections || sections.length === 0) {
      alert('No exam sections available. Please check the exam configuration.');
      return;
    }
    
    if (!examInfo || !examInfo.totalTime) {
      alert('Exam configuration is incomplete. Please check the exam setup.');
      return;
    }
    
    if (!validCurrentSection) {
      alert('No valid exam section found. Please check the exam configuration.');
      return;
    }
    
    // Clear previous exam data
    localStorage.removeItem('examAnswers');
    localStorage.removeItem('examMarkedForReview');
    localStorage.removeItem('examVisitedQuestions');
    localStorage.removeItem('examResults');
    
    // Reset state
    setAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({});
    
    // Ensure we start with the first section and question
    if (sections && sections.length > 0) {
      setCurrentSection(sections[0]);
      setCurrentQuestionIndex(0);
    }
    
    setIsExamStarted(true);
    setTimeLeft((examInfo?.totalTime || 75) * 60);
  };

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (!currentQuestion || !currentQuestion.id) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    
    // Mark as visited
    setVisitedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  // Handle next question
  const handleNext = () => {
    if (currentSectionQuestions && currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next section
      if (sections && currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      }
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Move to previous section
      if (sections && currentSectionIndex > 0) {
        setCurrentSection(sections[currentSectionIndex - 1]);
        const prevSectionQuestions = getQuestionsBySection(sections[currentSectionIndex - 1]);
        setCurrentQuestionIndex(prevSectionQuestions?.length - 1 || 0);
      }
    }
  };

  // Handle mark for review
  const handleMarkForReview = () => {
    if (!currentQuestion || !currentQuestion.id) return;
    
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
    
    // Mark as visited
    setVisitedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  // Handle clear response
  const handleClearResponse = () => {
    if (!currentQuestion || !currentQuestion.id) return;
    
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };

  // Navigate to specific question
  const navigateToQuestion = (sectionName, questionIndex) => {
    if (sections && sections.includes(sectionName)) {
      setCurrentSection(sectionName);
      setCurrentQuestionIndex(questionIndex);
    }
  };

  // Submit exam
  const handleExamSubmit = () => {
    const score = calculateScore(answers);
    const stats = getSectionStats(answers);
    
    // Save results to localStorage
    const examResults = {
      score,
      stats,
      answers,
      markedForReview,
      timeTaken: (examInfo?.totalTime || 75) * 60 - timeLeft,
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem('examResults', JSON.stringify(examResults));
    
    // Redirect to results page
    window.location.href = '/exam/exam-result';
  };

  // Confirm exam submission
  const confirmExamSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = examInfo?.totalQuestions || 0;
    
    if (answeredCount === 0) {
      alert('You have not answered any questions. Are you sure you want to submit?');
      return;
    }
    
    const confirmMessage = `You have answered ${answeredCount} out of ${totalQuestions} questions.\n\nAre you sure you want to submit the exam?`;
    
    if (window.confirm(confirmMessage)) {
      handleExamSubmit();
    }
  };

  // Get question status
  const getQuestionStatus = (questionId) => {
    if (!questionId) return 'not-visited';
    
    if (markedForReview[questionId] && answers[questionId] !== undefined) {
      return 'answered-marked'; // Purple
    } else if (answers[questionId] !== undefined) {
      return 'answered'; // Green
    } else if (visitedQuestions[questionId]) {
      return 'visited'; // Orange
    } else {
      return 'not-visited'; // Gray
    }
  };

  // Get question status color
  const getQuestionStatusColor = (status) => {
    if (!status) return 'bg-gray-400';
    
    switch (status) {
      case 'answered': return 'bg-green-400';
      case 'answered-marked': return 'bg-indigo-600';
      case 'visited': return 'bg-orange-600';
      case 'not-visited': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="bg-[#290c52] text-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">Loading Exam...</h1>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Please wait while we load your exam data.</p>
          </div>
        </div>
      </div>
    );
  }

  // If exam hasn't started, show start screen
  if (!isExamStarted) {
    // Check if exam data is available
    if (!sections || sections.length === 0 || !examInfo) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h1 className="text-2xl font-bold text-center mb-6">Error</h1>
            <p className="text-center">
              {!examInfo ? 'Exam configuration is missing.' : 
               !sections || sections.length === 0 ? 'No exam sections available.' : 
               'Exam data is incomplete.'}
              <br />Please check the exam configuration.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-white text-red-600 font-semibold py-3 px-6 rounded-lg text-lg mt-4"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="bg-[#290c52] text-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">CPCT Exam</h1>
          
          <div className="space-y-4 text-center">
            <div className="bg-white text-black p-3 rounded">
              <p className="font-semibold">Exam Details:</p>
              <p>Total Questions: {examInfo?.totalQuestions || 'N/A'}</p>
              <p>Total Time: {examInfo?.totalTime || 'N/A'} minutes</p>
              <p>Sections: {sections.length}</p>
            </div>
            
            <div className="bg-white text-black p-3 rounded">
              <p className="font-semibold">Instructions:</p>
              <ul className="text-sm text-left space-y-1">
                <li>• Read each question carefully</li>
                <li>• Select only one answer per question</li>
                <li>• You can mark questions for review</li>
                <li>• Navigate between questions freely</li>
                <li>• Submit when finished or time expires</li>
              </ul>
            </div>
            
            <button
              onClick={startExam}
              disabled={!sections || sections.length === 0 || sections.every(section => getQuestionsBySection(section)?.length === 0)}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg text-lg"
            >
              Start Exam
            </button>
            
            {sections && sections.length > 0 && sections.every(section => getQuestionsBySection(section)?.length === 0) && (
              <p className="text-red-300 text-center mt-2 text-sm">
                ⚠️ No questions found in any section. Please check the exam configuration.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <p className="mt-2 font-semibold text-blue-800">
                {examData?.name || "Anas"}
              </p>
              {examData && (
                <div className="text-xs text-center mt-1 text-gray-600">
                  <p>{examData.mobile}</p>
                  <p>{examData.city}</p>
                </div>
              )}
              <hr className="border w-full mt-2" />
            </div>
            
            {/* Question Palette */}
            <h2 className="font-bold mb-2 text-center bg-[#290c52] text-white py-2 rounded">
              Question Palette
            </h2>
            
            {sections?.map(sectionName => (
              <div key={sectionName} className="mb-4">
                <h3 className="font-semibold text-sm mb-2">{sectionName}</h3>
                <div className="grid grid-cols-4 gap-1">
                  {getQuestionsBySection(sectionName)?.map((question, index) => {
                    if (!question || !question.id) return null;
                    
                    const status = getQuestionStatus(question.id);
                    const isCurrent = sectionName === validCurrentSection && index === currentQuestionIndex;
                    
                    return (
                      <button
                        key={question.id}
                        onClick={() => navigateToQuestion(sectionName, index)}
                        disabled={!sections || !sections.includes(sectionName)}
                        className={`w-8 h-8 flex items-center justify-center text-black text-xs font-semibold border border-black rounded ${
                          isCurrent ? 'ring-2 ring-blue-500' : ''
                        } ${getQuestionStatusColor(status)}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
              </div>
            </div>
            ))}
            
            <button 
              onClick={confirmExamSubmit}
              disabled={!sections || !currentSectionQuestions}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded mt-4"
            >
              Submit Exam
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 w-full bg-[#290c52] text-white flex justify-between items-center px-4 py-2 text-sm z-30">
          <div className="font-semibold">CPCT Exam - {validCurrentSection || 'Loading...'}</div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 pr-4">
              <img src="/lo.jpg" className="w-8 h-8 rounded-full border" />
              {examData?.name && (
                <span className="text-xs text-yellow-300 hidden sm:inline">
                  {examData.name}
                </span>
              )}
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
            style={{ width: `${examInfo && examInfo.totalQuestions ? (Object.keys(answers).length / examInfo.totalQuestions) * 100 : 0}%` }}
          ></div>
        </div>

        {/* Section Navigation */}
        <div className="hidden lg:flex border-b px-4 py-0 border-y-gray-200 bg-white text-xs overflow-x-auto">
          {sections?.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      if (sections && sections.includes(sec)) {
                        setCurrentSection(sec);
                        setCurrentQuestionIndex(0);
                      }
                    }}
              className={`${
                      validCurrentSection === sec
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
          {currentQuestion && currentSectionQuestions && currentSectionQuestions.length > 0 && validCurrentSection ? (
            <>
              {/* Question Header */}
              <div className="bg-[#290c52] text-white text-sm px-4 py-3 rounded-t flex justify-between flex-wrap gap-2">
                <span>Question {getSafeQuestionIndex() + 1} of {currentSectionQuestions?.length || 0} - {validCurrentSection || 'Unknown Section'}</span>
    <div className="flex items-center gap-2">
      <p>View in:</p>
                  <select className="text-black text-xs bg-white rounded px-2 py-1">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  </div>

              {/* Question Content */}
              <div className="border border-gray-300 rounded-b bg-white">
                <div className="bg-gray-50 px-4 py-3 border-b text-sm font-semibold flex flex-col sm:flex-row justify-between">
                  <span>Question ID: {currentQuestion?.id || 'N/A'}</span>
      <span className="mt-1 sm:mt-0">
                    Marks: 1 | Negative Marks: 0
      </span>
    </div>

                                {currentSection === "READING COMPREHENSION" ? (
      <div className="flex flex-col lg:flex-row p-4 gap-x-6 gap-y-10">
        <div className="lg:w-2/3 text-sm border-r pr-4 max-h-72 overflow-y-auto">
          <h3 className="font-bold mb-2">Passage:</h3>
                      <p className="text-gray-700">{currentQuestion?.passage || 'No passage available'}</p>
        </div>
                    <div className="lg:w-1/3">
                      <p className="mb-4 font-medium">{currentQuestion?.question || 'No question available'}</p>
                      {currentQuestion.options?.map((opt, i) => (
                        <label key={i} className="flex items-start gap-2 mb-3 cursor-pointer">
                                                  <input 
                          type="radio" 
                          name={`q_${currentQuestion?.id || 'unknown'}`}
                          checked={answers[currentQuestion?.id] === i}
                          onChange={() => handleAnswerSelect(i)}
                          className="mt-1"
                        />
                          <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    ) : (
      <div className="p-4 text-md md:text-xl mb-28">
                    <p className="mb-6 font-medium">{currentQuestion?.question || 'No question available'}</p>
                    {currentQuestion.options?.map((opt, i) => (
                      <label key={i} className="flex items-start gap-3 mb-4 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`q_${currentQuestion?.id || 'unknown'}`}
                          checked={answers[currentQuestion?.id] === i}
                          onChange={() => handleAnswerSelect(i)}
                          className="mt-1"
                        />
                        <span className="text-base">{opt}</span>
          </label>
        ))}
      </div>
    )}
</div>

              {/* Footer Actions */}
        <div className="flex justify-between items-center bg-white-50 px-4 py-3 border-t flex-wrap gap-2">
          <div className="space-x-2">
                                    <button 
                    onClick={handleMarkForReview}
                    className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
                      markedForReview[currentQuestion?.id] 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {markedForReview[currentQuestion?.id] ? '✓ Marked' : 'Mark for Review'}
            </button>
                                    <button 
                    onClick={handleClearResponse}
                    disabled={!currentQuestion || !currentQuestion.id}
                    className="px-4 py-2 bg-red-500 disabled:bg-gray-400 text-white rounded text-sm whitespace-nowrap"
                  >
              Clear Response
            </button>
          </div>
                <div className="space-x-2">
                                    <button 
                    onClick={handlePrevious}
                    disabled={!sections || currentSectionIndex === 0 && getSafeQuestionIndex() === 0}
                    className="bg-blue-400 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 text-sm rounded whitespace-nowrap"
                  >
              Previous
            </button>
                                    <button 
                    onClick={handleNext}
                    disabled={!sections || !currentSectionQuestions}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 text-sm rounded whitespace-nowrap"
                  >
                    Next
                  </button>
          </div>
                                <button 
                  onClick={confirmExamSubmit}
                  disabled={!sections || !currentSectionQuestions}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-2 text-sm rounded w-full md:w-auto"
                >
                  Submit Exam
            </button>
          </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-600">No questions available in this section</h2>
              <p className="text-gray-500 mt-2">Section: {currentSection}</p>
              <p className="text-gray-500 mt-2">Questions found: {currentSectionQuestions.length}</p>
              <button 
                onClick={() => {
                  if (sections && sections.length > 0) {
                    const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
                    setCurrentSection(sections[nextSectionIndex]);
                    setCurrentQuestionIndex(0);
                  }
                }}
                disabled={!sections || sections.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded mt-4"
              >
                Go to Next Section
</button>
        </div>
          )}
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-full lg:w-60 bg-blue-50 border-l shadow-lg max-h-[100vh] overflow-y-auto sticky top-0 mt-3">
        <div className="p-4 text-sm h-full">
          <div className="flex flex-col items-center py-6">
            <img src="/lo.jpg" className="w-24 h-24 rounded-full border-2" />
              <p className="mt-2 font-semibold text-blue-800">
                {examData?.name || "Anas"}
              </p>
              {examData && (
                <div className="text-xs text-center mt-1 text-gray-600">
                  <p>{examData.mobile}</p>
                  <p>{examData.city}</p>
                </div>
              )}
            <hr className="border w-full mt-2" />
          </div>
            
            {/* Question Palette */}
            <h2 className="font-bold mb-2 text-center bg-[#290c52] text-white py-2 rounded text-xs">
              Question Palette
            </h2>
            
            {sections?.map(sectionName => (
              <div key={sectionName} className="mb-4">
                <h3 className="font-semibold text-xs mb-2">{sectionName}</h3>
                <div className="grid grid-cols-4 gap-1">
                  {getQuestionsBySection(sectionName)?.map((question, index) => {
                    const status = getQuestionStatus(question.id);
                    const isCurrent = sectionName === validCurrentSection && index === currentQuestionIndex;
                    
                    return (
                      <button
                        key={question.id}
                        onClick={() => navigateToQuestion(sectionName, index)}
                        disabled={!sections || !sections.includes(sectionName)}
                        className={`w-8 h-8 flex items-center justify-center text-black text-xs font-semibold border border-black rounded ${
                          isCurrent ? 'ring-2 ring-blue-500' : ''
                        } ${getQuestionStatusColor(status)}`}
                        title={`${sectionName} - Question ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
            </div>
          </div>
            ))}
            
                        <button 
              onClick={confirmExamSubmit}
              disabled={!sections || !currentSectionQuestions}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded mt-4 text-xs"
            >
              Submit Exam
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}