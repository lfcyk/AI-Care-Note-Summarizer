"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import NoteCard from "@/components/noteCard";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useTheme } from "@/utils/ThemeProvider";

type Note = {
  id: number;
  text: string;
  created_at: string;
  author?: string;
  summary_en?: string;
  summary_jp?: string;
  family: string;
  tenant?: string;
};

export default function CaregiverPage() {
  const [showModal, setShowModal] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    author: "",
    date: ""
  });
  const { dark, toggleTheme } = useTheme()!;

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
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyOTI2ODU3LCJpYXQiOjE3NjI5MjUwNTcsImp0aSI6ImRkYTQ0NzI5NWY4MjQ5MzY5MzIyYzUwOGU0NzI4MDExIiwidXNlcl9pZCI6IjExIn0.eu-lUxQc9dknTIK9pL3s83Peb9PSNa8VFFt2SPrPYYs";
  
  // const { data: notes } = useQuery<Note[]>({
  //   queryKey: ["notes"],
  //   queryFn: async () => (await api.get("/carenotes/", {
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //       },
  //   })).data,
  // });
  
  // const createNote = useMutation({
  //   mutationFn: async () => await api.post("/carenotes/", { text }),
  //   onSuccess: () => {
  //     setText("");
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //   },
  // });
  
  const mockNotes: Note[] = [
    {
      id: 1,
      text: "Patient had good appetite today. Took morning medications without issues.",
      created_at: "2024-01-15T09:30:00Z",
      author: "John Nurse",
      summary_en: "Good appetite, medications taken",
      summary_jp: "食欲が良好、服薬完了",
      family: "Smith Family",
      tenant: "Care Home A",
    },
    {
      id: 2,
      text: "Slight fever observed in the evening. Monitoring vitals closely.",
      created_at: "2024-01-14T18:45:00Z",
      author: "Jane Caregiver",
      summary_en: "Slight fever, vitals monitored",
      summary_jp: "軽い発熱、バイタル監視中",
      family: "Johnson Family",
      tenant: "Care Home A",
    },
  ];

  return (
    <div className={`font-sans grid grid-rows-[60px_1fr_20px] items-start justify-items-center min-h-screen pt-20 pb-20 sm:p-20 ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Navigation Bar */}
      <Navbar/>
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
            <div className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-lg p-8 w-full max-w-md relative`}>
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
          {mockNotes.map((note) => (
            <NoteCard
              key={note.id}
              text={note.text}
              author={note.author}
              created_at={new Date(note.created_at).toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
              })}
              summary_en={note.summary_en}
              summary_jp={note.summary_jp}
              family={note.family}
            />
          ))}
          {mockNotes.map((note) => (
            <NoteCard
              key={note.id}
              text={note.text}
              author={note.author}
              created_at={new Date(note.created_at).toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
              })}
              summary_en={note.summary_en}
              summary_jp={note.summary_jp}
              family={note.family}
            />
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}
