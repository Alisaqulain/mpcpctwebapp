"use client";
import React from "react";

export default function FingerPositionScreen() {
  return (
    <div className="min-h-[80%] bg-white border border-gray-300 shadow-lg max-w-3xl mx-auto mt-4 md:mt-10 rounded-md overflow-hidden mb-4 md:mb-10">
      {/* Header */}
      <div className="bg-[rgb(41,12,82)] text-white text-center py-2 text-lg md:text-xl font-semibold px-4 flex justify-between items-center">
        <span className="flex-1 text-center md:mr-[-45]">Home Finger Positions</span>
        {/* Language Dropdown */}
        <select className="bg-white text-blue-600 px-2 py-1 rounded text-sm">
          <option>View In</option>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 text-gray-800 space-y-4 text-[14px] md:text-[16px] leading-relaxed relative">
        <p>
          In their basic position, your fingers rest on the middle row of the keyboard – also called the "home row". The home row is the base from which all other keys can be reached.
        </p>

        <div>
          <strong>Now place your fingers on the home row:</strong>
          <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li>Put your left hand fingers on keys A S D F</li>
            <li>Put your right hand fingers on keys J K L ;</li>
            <li>Let the thumbs rest lightly on the space bar</li>
            <li>Keep your wrists straight and fingers lightly curled</li>
          </ol>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 px-4 py-2 text-sm">
          <strong>Tip!</strong> Can you feel small bumps on the F and J keys? They are there to help you find the home row keys without looking at your hands.
        </div>

        <div className="flex justify-center relative md:static">
          <img
            src="/homefinger.jpg"
            alt="Finger Positions on Keyboard"
            className="w-[80%] max-w-[150px] md:max-w-[18%] md:absolute md:top-[100px] md:right-[100px]"
          />
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex justify-between items-center bg-gray-100 p-4 border-t">
        <button className="bg-white border border-gray-300 px-4 py-1 rounded hover:bg-gray-200">
         <a href="/learning">Cancel</a>
        </button>
        <button className="bg-blue-600 text-white px-6 py-1 rounded hover:bg-blue-700">
          <a href="/keyboard">Next</a>
        </button>
      </div>
    </div>
  );
}