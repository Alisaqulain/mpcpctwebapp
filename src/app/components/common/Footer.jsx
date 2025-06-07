"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-50 to-blue-100 border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-gray-600 text-sm font-medium">
            © 2025 MPCPCT. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="/privacy"
            className="text-gray-500 hover:text-cyan-600 text-sm font-medium transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-gray-500 hover:text-cyan-600 text-sm font-medium transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-gray-500 hover:text-cyan-600 text-sm font-medium transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}