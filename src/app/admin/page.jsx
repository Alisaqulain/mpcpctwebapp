"use client";
import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [exams, setExams] = useState([]);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('exams');

  useEffect(() => { fetchExams(); }, []);

  const fetchExams = async () => {
    const res = await fetch('/api/admin/exams');
    const data = await res.json();
    setExams(data.exams || []);
  };

  const fetchSections = async (examId) => {
    const res = await fetch(`/api/admin/sections?examId=${examId}`);
    const data = await res.json();
    setSections(data.sections || []);
  };

  const fetchQuestions = async (examId, sectionId) => {
    const url = new URL(window.location.origin + '/api/admin/questions');
    if (examId) url.searchParams.set('examId', examId);
    if (sectionId) url.searchParams.set('sectionId', sectionId);
    const res = await fetch(url.toString());
    const data = await res.json();
    setQuestions(data.questions || []);
  };

  const createExam = async () => {
    const title = prompt('Exam title');
    const key = prompt('Key (CPCT/RSCIT/CCC/CUSTOM)');
    if (!title || !key) return;
    const res = await fetch('/api/admin/exams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, key, totalTime: 75, totalQuestions: 75 })});
    if (res.ok) fetchExams();
  };

  const createSection = async () => {
    if (!selectedExam) return alert('Select exam');
    const name = prompt('Section name');
    if (!name) return;
    const res = await fetch('/api/admin/sections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ examId: selectedExam, name })});
    if (res.ok) fetchSections(selectedExam);
  };

  const createQuestion = async () => {
    if (!selectedExam || !selectedSection) return alert('Select exam & section');
    const question = prompt('Question (EN)');
    const question_hi = prompt('Question (HI) - optional') || '';
    const options = prompt('Options comma separated (EN)')?.split(',').map(s => s.trim()) || [];
    const options_hi = prompt('Options comma separated (HI) - optional')?.split(',').map(s => s.trim()) || [];
    const correctAnswer = parseInt(prompt('Correct option index (0-based)'), 10) || 0;
    const isFree = confirm('Is this question free? (OK = Yes, Cancel = No)');
    const body = { examId: selectedExam, sectionId: selectedSection, question, question_hi, options, options_hi, correctAnswer, isFree };
    const res = await fetch('/api/admin/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)});
    if (res.ok) fetchQuestions(selectedExam, selectedSection);
  };

  const toggleFreeStatus = async (questionId, currentStatus) => {
    const newStatus = !currentStatus;
    const res = await fetch(`/api/admin/questions/${questionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFree: newStatus })
    });
    if (res.ok) fetchQuestions(selectedExam, selectedSection);
  };

  return (
    <div className="min-h-screen bg-white p-4 text-sm">
      <div className="bg-[#290c52] text-white px-4 py-2 font-bold">Admin Panel</div>

      <div className="flex gap-2 mt-3">
        <button onClick={() => setActiveTab('exams')} className={`px-3 py-1 rounded ${activeTab==='exams'?'bg-blue-600 text-white':'bg-gray-100'}`}>Exams</button>
        <button onClick={() => setActiveTab('learning')} className={`px-3 py-1 rounded ${activeTab==='learning'?'bg-blue-600 text-white':'bg-gray-100'}`}>Learning</button>
        <button onClick={() => setActiveTab('skill')} className={`px-3 py-1 rounded ${activeTab==='skill'?'bg-blue-600 text-white':'bg-gray-100'}`}>Skill Test</button>
        <button onClick={() => setActiveTab('subscriptions')} className={`px-3 py-1 rounded ${activeTab==='subscriptions'?'bg-blue-600 text-white':'bg-gray-100'}`}>Subscriptions</button>
      </div>

      {activeTab==='exams' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="border rounded p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Exams</h3>
            <button onClick={createExam} className="bg-green-600 text-white px-2 py-1 rounded">+ Add</button>
          </div>
          <ul className="space-y-1">
            {exams.map(exam => (
              <li key={exam._id}>
                <button className={`w-full text-left px-2 py-1 rounded ${selectedExam === exam._id ? 'bg-blue-100' : ''}`} onClick={() => { setSelectedExam(exam._id); setSelectedSection(null); fetchSections(exam._id); fetchQuestions(exam._id, null); }}>{exam.title} ({exam.key})</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Sections</h3>
            <button onClick={createSection} className="bg-green-600 text-white px-2 py-1 rounded">+ Add</button>
          </div>
          <ul className="space-y-1">
            {sections.map(sec => (
              <li key={sec._id}>
                <button className={`w-full text-left px-2 py-1 rounded ${selectedSection === sec._id ? 'bg-blue-100' : ''}`} onClick={() => { setSelectedSection(sec._id); fetchQuestions(selectedExam, sec._id); }}>{sec.name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Questions</h3>
            <button onClick={createQuestion} className="bg-green-600 text-white px-2 py-1 rounded">+ Add</button>
          </div>
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
            {questions.map(q => (
              <li key={q._id} className="border rounded p-2">
                <div className="font-medium">{q.question}</div>
                {q.question_hi && <div className="text-xs text-gray-600">{q.question_hi}</div>}
                <div className="text-xs mt-1">Options: {q.options.join(', ')}</div>
                {q.options_hi?.length ? <div className="text-xs mt-1">Options (HI): {q.options_hi.join(', ')}</div> : null}
                <div className="text-xs mt-1">Answer: {q.correctAnswer}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${q.isFree ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {q.isFree ? 'FREE' : 'PAID'}
                  </span>
                  <button 
                    onClick={() => toggleFreeStatus(q._id, q.isFree)}
                    className={`text-xs px-2 py-1 rounded ${q.isFree ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                  >
                    Make {q.isFree ? 'Paid' : 'Free'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}

      {activeTab==='learning' && (
        <LearningAdmin />
      )}

      {activeTab==='skill' && (
        <SkillAdmin />
      )}

      {activeTab==='subscriptions' && (
        <SubscriptionsAdmin />
      )}
    </div>
  );
}

function LearningAdmin(){
  const [data, setData] = useState({ sections: [], lessons: [] });
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/learning');
    const d = await res.json();
    setData({ sections: d.sections||[], lessons: d.lessons||[] });
    setLoading(false);
  };

  useEffect(()=>{ refresh(); },[]);

  const addSection = async () => {
    const id = prompt('Section ID');
    const name = prompt('Section Name');
    const description = prompt('Description')||'';
    const lessonNumber = parseInt(prompt('Order number')||'0',10);
    await fetch('/api/admin/learning', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'section', id, name, description, lessonNumber })});
    refresh();
  };

  const addLesson = async () => {
    const sectionId = prompt('Section ID');
    const id = prompt('Lesson ID');
    const title = prompt('Title');
    const description = prompt('Description')||'';
    const difficulty = prompt('Difficulty (easy/medium/hard)')||'easy';
    const estimatedTime = parseInt(prompt('Estimated time (min)')||'10',10);
    const content = prompt('Content (markdown)')||'';
    const isFree = confirm('Is this lesson free? (OK = Yes, Cancel = No)');
    await fetch('/api/admin/learning', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ type:'lesson', sectionId, id, title, description, difficulty, estimatedTime, content, isFree })});
    refresh();
  };

  const toggleLessonFree = async (lessonId, currentStatus) => {
    const newStatus = !currentStatus;
    const res = await fetch(`/api/admin/learning/lesson/${lessonId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFree: newStatus })
    });
    if (res.ok) refresh();
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Learning Management</h3>
        <div className="flex gap-2">
          <button onClick={addSection} className="bg-green-600 text-white px-2 py-1 rounded">+ Section</button>
          <button onClick={addLesson} className="bg-green-600 text-white px-2 py-1 rounded">+ Lesson</button>
          <button onClick={refresh} className="bg-gray-200 px-2 py-1 rounded">Refresh</button>
        </div>
      </div>
      {loading ? <div className="mt-2">Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border rounded p-3">
            <h4 className="font-medium mb-2">Sections</h4>
            <ul className="space-y-1">
              {data.sections.map(s => (
                <li key={s._id} className="border rounded px-2 py-1">{s.name} ({s.id})</li>
              ))}
            </ul>
          </div>
          <div className="border rounded p-3 max-h-[60vh] overflow-y-auto">
            <h4 className="font-medium mb-2">Lessons</h4>
            <ul className="space-y-2">
              {data.lessons.map(l => (
                <li key={l._id} className="border rounded p-2">
                  <div className="font-medium">{l.title} ({l.id})</div>
                  <div className="text-xs text-gray-600">Section: {l.sectionId} • Difficulty: {l.difficulty} • {l.estimatedTime} min</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${l.isFree ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {l.isFree ? 'FREE' : 'PAID'}
                    </span>
                    <button 
                      onClick={() => toggleLessonFree(l._id, l.isFree)}
                      className={`text-xs px-2 py-1 rounded ${l.isFree ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      Make {l.isFree ? 'Paid' : 'Free'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillAdmin(){
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Skill Test Management</h3>
      <p className="text-xs text-gray-600 mt-2">Coming soon: CRUD for skill tests, tasks, and evaluations with free/paid controls.</p>
    </div>
  );
}

function SubscriptionsAdmin(){
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscriptions');
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Subscriptions Management</h3>
        <button onClick={refresh} className="bg-gray-200 px-2 py-1 rounded">Refresh</button>
      </div>
      
      {loading ? (
        <div>Loading subscriptions...</div>
      ) : (
        <div className="border rounded p-3">
          <h4 className="font-medium mb-2">Active Subscriptions</h4>
          {subscriptions.length === 0 ? (
            <p className="text-gray-500">No subscriptions found</p>
          ) : (
            <ul className="space-y-2">
              {subscriptions.map(sub => (
                <li key={sub._id} className="border rounded p-2">
                  <div className="text-sm">
                    <strong>User:</strong> {sub.userId} • <strong>Type:</strong> {sub.type} • <strong>Plan:</strong> {sub.plan}
                  </div>
                  <div className="text-xs text-gray-600">
                    Status: {sub.status} • Expires: {new Date(sub.endDate).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


