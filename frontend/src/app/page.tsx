"use client";
import NoteCard from "@/components/noteCard";
import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    author: "",
    date: ""
  });
  const [darkMode, setDarkMode] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add logic to save note
    setShowModal(false);
    setNoteForm({ title: "", content: "", author: "", date: "" });
    alert("Note created!");
  };

  return (
  <div className={`font-sans grid grid-rows-[60px_1fr_20px] items-start justify-items-center min-h-screen pt-20 pb-20 sm:p-20 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex flex-col gap-[32px] row-start-2 items-start sm:items-start w-full">
        {/* Create Note Button */}
        <div className="w-full flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Create Note
          </button>
        </div>

        {/* Modal for creating notes */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">Create Note</h3>
              <form onSubmit={handleCreateNote} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={noteForm.title}
                  onChange={handleFormChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={noteForm.content}
                  onChange={handleFormChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  rows={4}
                  required
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={noteForm.author}
                  onChange={handleFormChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                  type="date"
                  name="date"
                  value={noteForm.date}
                  onChange={handleFormChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Save Note
                </button>
              </form>
            </div>
          </div>
        )}
        {/* NoteCard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-10">
          <NoteCard
            title="Medication Update"
            content="Patient started new medication for blood pressure. Monitor for side effects."
            author="Dr. Smith"
            date="2025-09-18"
          />
          <NoteCard
            title="Caregiver Visit"
            content="Caregiver visited patient and assisted with daily activities."
            author="Jane Doe"
            date="2025-09-17"
          />
          <NoteCard
            title="Family Feedback"
            content="Family reported improvement in patient mood and appetite."
            author="Family"
            date="2025-09-16"
          />
          <NoteCard
            title="Physical Therapy"
            content="Patient completed physical therapy session. Progress noted."
            author="Therapist"
            date="2025-09-15"
          />
          <NoteCard
            title="Nutrition Update"
            content="Diet adjusted to include more protein and vegetables."
            author="Dietician"
            date="2025-09-14"
          />
        </div>
      </main>
      <Footer/>
    </div>
  );
}
