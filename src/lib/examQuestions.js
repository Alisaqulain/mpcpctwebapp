import examQuestions from '../data/examQuestions.json';

// Get all exam questions
export const getExamQuestions = () => examQuestions;

// Get questions for a specific section
export const getQuestionsBySection = (sectionName) => {
  return examQuestions.questions[sectionName] || [];
};

// Get all sections
export const getExamSections = () => examQuestions.examInfo.sections;

// Get exam info
export const getExamInfo = () => examQuestions.examInfo;

// Get total questions count
export const getTotalQuestions = () => examQuestions.examInfo.totalQuestions;

// Get total time
export const getTotalTime = () => examQuestions.examInfo.totalTime;

// Get question by ID
export const getQuestionById = (questionId) => {
  for (const section of Object.values(examQuestions.questions)) {
    const question = section.find(q => q.id === questionId);
    if (question) return question;
  }
  return null;
};

// Get section name by question ID
export const getSectionByQuestionId = (questionId) => {
  for (const [sectionName, questions] of Object.entries(examQuestions.questions)) {
    const question = questions.find(q => q.id === questionId);
    if (question) return sectionName;
  }
  return null;
};

// Get question index in section
export const getQuestionIndexInSection = (sectionName, questionId) => {
  const questions = getQuestionsBySection(sectionName);
  return questions.findIndex(q => q.id === questionId);
};

// Get next question
export const getNextQuestion = (currentSection, currentQuestionId) => {
  const questions = getQuestionsBySection(currentSection);
  const currentIndex = getQuestionIndexInSection(currentSection, currentQuestionId);
  
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1];
  }
  
  // Move to next section
  const sections = getExamSections();
  const currentSectionIndex = sections.indexOf(currentSection);
  
  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    const nextSectionQuestions = getQuestionsBySection(nextSection);
    return nextSectionQuestions[0] || null;
  }
  
  return null; // End of exam
};

// Get previous question
export const getPreviousQuestion = (currentSection, currentQuestionId) => {
  const questions = getQuestionsBySection(currentSection);
  const currentIndex = getQuestionIndexInSection(currentSection, currentQuestionId);
  
  if (currentIndex > 0) {
    return questions[currentIndex - 1];
  }
  
  // Move to previous section
  const sections = getExamSections();
  const currentSectionIndex = sections.indexOf(currentSection);
  
  if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    const prevSectionQuestions = getQuestionsBySection(prevSection);
    return prevSectionQuestions[prevSectionQuestions.length - 1] || null;
  }
  
  return null; // Beginning of exam
};

// Calculate score
export const calculateScore = (answers) => {
  let correct = 0;
  let total = 0;
  
  for (const [questionId, answer] of Object.entries(answers)) {
    const question = getQuestionById(questionId);
    if (question && answer !== null) {
      total++;
      if (answer === question.correctAnswer) {
        correct++;
      }
    }
  }
  
  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0
  };
};

// Get section statistics
export const getSectionStats = (answers) => {
  const stats = {};
  const sections = getExamSections();
  
  sections.forEach(section => {
    const questions = getQuestionsBySection(section);
    let answered = 0;
    let correct = 0;
    
    questions.forEach(question => {
      if (answers[question.id] !== null && answers[question.id] !== undefined) {
        answered++;
        if (answers[question.id] === question.correctAnswer) {
          correct++;
        }
      }
    });
    
    stats[section] = {
      total: questions.length,
      answered,
      correct,
      unanswered: questions.length - answered,
      percentage: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0
    };
  });
  
  return stats;
};
