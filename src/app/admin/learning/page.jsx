"use client";
import React, { useState, useEffect } from "react";
import { 
  getLearningData, 
  getSections, 
  getLessonsBySection,
  getLessonById 
} from "@/lib/learningData";

export default function LearningAdmin() {
  const [learningData, setLearningData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("home");
  const [editingLesson, setEditingLesson] = useState(null);
  const [showAddLesson, setShowAddLesson] = useState(false);

  useEffect(() => {
    const data = getLearningData();
    setLearningData(data);
  }, []);

  if (!learningData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const currentSection = learningData.sections.find(section => section.id === selectedSection);
  const lessons = currentSection ? currentSection.lessons : [];

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
  };

  const handleSaveLesson = (updatedLesson) => {
    // In a real app, you would save this to the database
    // For now, we'll just update the local state
    const updatedSections = learningData.sections.map(section => {
      if (section.id === selectedSection) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => 
            lesson.id === updatedLesson.id ? updatedLesson : lesson
          )
        };
      }
      return section;
    });

    setLearningData({
      ...learningData,
      sections: updatedSections
    });
    setEditingLesson(null);
  };

  const handleAddLesson = (newLesson) => {
    const lessonId = `${currentSection.lessonNumber}.${lessons.length + 1}`;
    const lesson = {
      id: lessonId,
      title: newLesson.title,
      description: newLesson.description,
      difficulty: newLesson.difficulty,
      estimatedTime: newLesson.estimatedTime
    };

    const updatedSections = learningData.sections.map(section => {
      if (section.id === selectedSection) {
        return {
          ...section,
          lessons: [...section.lessons, lesson]
        };
      }
      return section;
    });

    setLearningData({
      ...learningData,
      sections: updatedSections
    });
    setShowAddLesson(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Learning Data Admin</h1>
          
          {/* Section Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {learningData.sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.lessonNumber}. {section.name} - {section.description}
                </option>
              ))}
            </select>
          </div>

          {/* Section Info */}
          {currentSection && (
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {currentSection.name} Section
              </h2>
              <p className="text-purple-600">{currentSection.description}</p>
              <p className="text-sm text-purple-500 mt-2">
                {lessons.length} lessons • Lesson {currentSection.lessonNumber}
              </p>
            </div>
          )}

          {/* Add Lesson Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowAddLesson(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add New Lesson
            </button>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {lesson.id}
                      </span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {lesson.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {lesson.estimatedTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                  <button
                    onClick={() => handleEditLesson(lesson)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Lesson Modal */}
          {editingLesson && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Edit Lesson</h3>
                <LessonForm
                  lesson={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => setEditingLesson(null)}
                />
              </div>
            </div>
          )}

          {/* Add Lesson Modal */}
          {showAddLesson && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Add New Lesson</h3>
                <LessonForm
                  onSave={handleAddLesson}
                  onCancel={() => setShowAddLesson(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Lesson Form Component
function LessonForm({ lesson, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    difficulty: lesson?.difficulty || "beginner",
    estimatedTime: lesson?.estimatedTime || "5 minutes"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Difficulty
        </label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estimated Time
        </label>
        <input
          type="text"
          value={formData.estimatedTime}
          onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., 5 minutes"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
        >
          {lesson ? "Update" : "Add"} Lesson
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
