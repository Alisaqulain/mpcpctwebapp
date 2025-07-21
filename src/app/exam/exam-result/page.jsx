import React from "react";

export default function ExamSummary() {
  return (
    <div className="min-h-screen bg-white text-sm">
      {/* Header */}
      <div className="bg-[#290c52] text-yellow-400 p-2 text-lg font-bold">
        CPCTMASTER 2025
      </div>

      {/* Title */}
      
      <div className="text-center font-semibold py-4 text-gray-800 text-base border-b border-gray-300">
        <img
          src="/lo.jpg"
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <p className="mt-2">Anas</p>
      </div>

     
<h1 className="text-center text-2xl font-semibold my-5">Exam Summary</h1>
      {/* CPCT Actual Summary */}
      <div className="px-4">
        <p className="font-semibold mb-2 text-gray-800">
          CPCT Actual : <span className="text-gray-600">( Current Section )</span>
        </p>

        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full text-center border text-sm">
            <thead className="bg-blue-100">
              <tr className="border-b">
                <th className="border p-2">Section Name</th>
                <th className="border p-2">No. of Questions</th>
                <th className="border p-2">Answered</th>
                <th className="border p-2">Not Answered</th>
                <th className="border p-2">Marked for Review</th>
                <th className="border p-2">
                  Answered & Marked for Review<br />(will not be considered for evaluation)
                </th>
                <th className="border p-2">Not Visited</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["General IT Skills & Networking", 52, 0, 1, 0, 0, 51],
                ["Reading Comprehension", 5, 0, 0, 0, 0, 5],
                ["Aptitude", 6, 0, 0, 0, 0, 6],
                ["Reasoning", 6, 0, 0, 0, 0, 6],
                ["General Awareness", 6, 0, 0, 0, 0, 6],
              ].map(([name, total, ans, notAns, mark, markAns, notVisit], idx) => (
                <tr key={idx}>
                  <td className="border p-2 text-left">{name}</td>
                  <td className="border p-2">{total}</td>
                  <td className="border p-2">{ans}</td>
                  <td className="border p-2">{notAns}</td>
                  <td className="border p-2">{mark}</td>
                  <td className="border p-2">{markAns}</td>
                  <td className="border p-2">{notVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
      </div>

      {/* Confirmation Message */}
      <div className="text-center text-sm p-4 mt-4">
        <p className="text-gray-800 font-medium leading-relaxed">
          क्या आप वाकई इस सेक्शन को सबमिट करना चाहते हैं? आगे बढ़ने के लिए
          <span className="font-bold"> 'Yes'</span> पर क्लिक करें, वापस जाने के लिए
          <span className="font-bold"> 'No'</span> पर क्लिक करें। <br />
          प्रतिभागी, एक बार सेक्शन सबमिट करने के बाद, आप अपने उत्तरों में कोई संशोधन नहीं कर पाएंगे।
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-green-500 hover:bg-gray-300 text-black px-4 py-2 rounded">
          <a href="/exam/break">  Yes </a>
          </button>
          <button className="bg-red-500 hover:bg-gray-300 text-black px-4 py-2 rounded">
          <a href="/exam_mode">  No </a>
          </button>
        </div>
      </div>
    </div>
  );
}
