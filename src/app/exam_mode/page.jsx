"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getExamQuestions, getExamInfo } from "@/lib/examQuestions";

export default function ExamMode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [examState, setExamState] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [language, setLanguage] = useState("English");
  const [examInfo, setExamInfo] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [freeQuestions, setFreeQuestions] = useState([]);
  const [paidQuestions, setPaidQuestions] = useState([]);
  
  const timerRef = useRef(null);
  const examType = searchParams.get("type") || "CPCT";
  const directMode = searchParams.get("direct") === "1";

  useEffect(() => {
    loadExamData();
    loadExamState();
  }, [examType]);

  const loadExamData = async () => {
    try {
      const data = await getExamQuestions(examType);
      setExamInfo(data.examInfo);
      setSections(data.sections);
      setQuestions(data.questions);
      
      // Separate free and paid questions
      const free = data.questions.filter(q => q.isFree);
      const paid = data.questions.filter(q => !q.isFree);
      setFreeQuestions(free);
      setPaidQuestions(paid);
      
      setTimeLeft(data.examInfo.totalTime * 60);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load exam data:", error);
      setLoading(false);
    }
  };

  const loadExamState = () => {
    const savedState = localStorage.getItem(`examState_${examType}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      setExamState(state);
      setCurrentQuestionIndex(state.currentQuestionIndex || 0);
      setSelectedAnswers(state.selectedAnswers || {});
      setIsExamStarted(true);
    }
  };

  const checkAccess = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAccessDenied(true);
        return false;
      }

      const response = await fetch("/api/check-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "exam",
          examType,
        }),
      });

      const data = await response.json();
      return data.hasAccess;
    } catch (error) {
      console.error("Access check failed:", error);
      return false;
    }
  };

  const startExam = async () => {
    if (directMode) {
      // Direct result mode - show zero score and redirect
      const results = {
        totalQuestions: questions.length,
        correctAnswers: 0,
        score: 0,
        percentage: 0,
        timeTaken: 0,
        examType,
        timestamp: new Date().toISOString(),
      };
      setExamResults(results);
      localStorage.setItem(`examResults_${examType}`, JSON.stringify(results));
      router.push(`/exam/exam-result?type=${examType}`);
      return;
    }

    // Check access for paid content
    const hasAccess = await checkAccess();
    if (!hasAccess && questions.length > freeQuestions.length) {
      // User needs to pay for access
      router.push(`/price?redirect=${encodeURIComponent(`/exam_mode?type=${examType}`)}`);
      return;
    }

    setIsExamStarted(true);
    startTimer();
    saveExamState();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const saveExamState = () => {
    const state = {
      currentQuestionIndex,
      selectedAnswers,
      timeLeft,
      examType,
      timestamp: Date.now(),
    };
    localStorage.setItem(`examState_${examType}`, JSON.stringify(state));
    setExamState(state);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
    saveExamState();
  };

  const submitExam = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((count, question, index) => {
      const selectedAnswer = selectedAnswers[question.id];
      return selectedAnswer === question.correctAnswer ? count + 1 : count;
    }, 0);

    const score = correctAnswers;
    const percentage = Math.round((score / totalQuestions) * 100);
    const timeTaken = examInfo.totalTime * 60 - timeLeft;

    const results = {
      totalQuestions,
      correctAnswers: score,
      score,
      percentage,
      timeTaken,
      examType,
      timestamp: new Date().toISOString(),
    };

    setExamResults(results);
    localStorage.setItem(`examResults_${examType}`, JSON.stringify(results));
    localStorage.removeItem(`examState_${examType}`);
    setIsExamCompleted(true);
    router.push(`/exam/exam-result?type=${examType}`);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please log in to access this exam.</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {examInfo.title} Exam
              </h1>
              <p className="text-xl text-gray-600">
                {examInfo.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exam Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span className="font-medium">{examInfo.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-medium">{examInfo.totalTime} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score:</span>
                    <span className="font-medium">{examInfo.passingScore || 50}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Access</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Free Questions:</span>
                    <span className="font-medium text-green-600">{freeQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid Questions:</span>
                    <span className="font-medium text-red-600">{paidQuestions.length}</span>
                  </div>
                  {paidQuestions.length > 0 && (
                    <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                      <strong>Note:</strong> Some questions require a subscription. 
                      <a href="/price" className="text-purple-600 hover:underline ml-1">View plans</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startExam}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-all hover:scale-105"
              >
                {directMode ? "Show Results" : "Start Exam"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionText = language === "हिन्दी" && currentQuestion.question_hi ? currentQuestion.question_hi : currentQuestion.question_en;
  const options = language === "हिन्दी" && currentQuestion.options_hi ? currentQuestion.options_hi : currentQuestion.options_en;
  const passage = language === "हिन्दी" && currentQuestion.passage_hi ? currentQuestion.passage_hi : currentQuestion.passage_en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {examInfo.title} Exam
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="English">English</option>
                <option value="हिन्दी">हिन्दी</option>
              </select>

              {/* Timer */}
              <div className="text-right">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div className={`text-lg font-mono font-semibold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={submitExam}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {/* Passage */}
              {passage && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Passage:</h3>
                  <p className="text-gray-700">{passage}</p>
                </div>
              )}

              {/* Question */}
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {questionText}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedAnswers[currentQuestion.id] === index
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestion.id}`}
                        value={index}
                        checked={selectedAnswers[currentQuestion.id] === index}
                        onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                        className="mr-3 text-purple-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
                
                <button
                  onClick={() => goToQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-medium text-gray-900 mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-all ${
                      index === currentQuestionIndex
                        ? "bg-purple-600 text-white"
                        : selectedAnswers[question.id] !== undefined
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-2"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}