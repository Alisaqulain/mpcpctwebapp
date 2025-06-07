"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-cyan-50 to-blue-100 border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/mpc.png"
              alt="MPCPCT Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-gray-800 hover:text-cyan-600 transition-colors duration-300">
              MPCPCT
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/course"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
            >
              Course
            </Link>
            <Link
              href="/download"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
            >
              Download
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>

          <button
            className="lg:hidden text-gray-700 hover:text-cyan-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 flex flex-col space-y-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/course"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Course
            </Link>
            <Link
              href="/download"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Download
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-cyan-600 font-medium text-base transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}