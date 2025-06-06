"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#ccffff] border-b border-gray-300 px-4 py-3">
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#333]">
          <img src="/mpc.png" alt="MPCPCT Logo" width={40} height={50} className="-mt-1" />
          <span className="text-[1.5rem]">MPCPCT</span>
        </Link>

     
        <ul className="hidden md:flex items-center gap-12 mr-[-50px]">
          <li>
            <Link href="/" className="text-[#333] font-medium hover:underline">
            Home
            </Link>
          </li>
          <li>
            <Link href="/course" className="text-[#333] font-medium hover:underline">
              Course
            </Link>
          </li>
          <li>
            <Link href="/download" className="text-[#333] font-medium hover:underline">
             Download
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-[#333] font-medium hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-[#333] font-medium hover:underline">
              Contact us
            </Link>
          </li>
        </ul>

        <button className="md:hidden text-[#333]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          <Link href="/login" className="block text-[#333] font-medium hover:underline">
            Login
          </Link>
          <Link href="/about" className="block text-[#333] font-medium hover:underline">
            About
          </Link>
          <Link href="/contact" className="block text-[#333] font-medium hover:underline">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
