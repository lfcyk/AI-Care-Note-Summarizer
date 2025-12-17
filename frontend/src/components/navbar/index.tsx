"use client";
import { useTheme } from "@/utils/ThemeProvider";
import React from "react";

export default function Navbar() {
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const { dark, toggleTheme } = useTheme()!;
  const darkMode = dark;
  const setDarkMode = toggleTheme;
  return (
    
  <nav className={`fixed top-0 left-0 right-0 w-full flex items-center justify-between px-4 py-2 shadow z-50 ${dark ? "bg-gray-800" : "bg-white"}`} style={{borderRadius: 0}}>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">AI Care Note Summarizer</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            className={`flex items-center gap-1 px-2 py-1 rounded transition ${ dark ? "bg-gray-700  hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setDarkMode()}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" fill="#FBBF24"/></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FBBF24"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FBBF24" strokeWidth="2"/></svg>
            )}
            <span className="hidden sm:inline">{darkMode ? "Dark" : "Light"}</span>
          </button>
          {/* Avatar dropdown */}
          <div className="relative">
            <button
              className={`w-9 h-9 rounded-full  flex items-center justify-center focus:outline-none ${dark? "bg-gray-600": "bg-gray-300"}`}
              onClick={() => setAvatarOpen((open) => !open)}
              aria-label="Open user menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#888"/></svg>
            </button>
            {avatarOpen && (
              <div className={`absolute right-0 mt-2 w-40 rounded shadow-lg py-2 z-10 ${dark ? "bg-gray-700" : "bg-white"}`}>
                <button className={`w-full text-left px-4 py-2 ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`} onClick={() => alert('Profile clicked')}>Profile</button>
                <button className={`w-full text-left px-4 py-2 ${dark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`} onClick={() => alert('Logged out')}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
  );
}