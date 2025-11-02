"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import NoteCard from "@/components/noteCard";

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
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyMDkwMjg2LCJpYXQiOjE3NjIwODg0ODYsImp0aSI6ImFjYjM1MTU3ZjBkYjRhN2Q5NjMyMDY0MGZjZDcxZTRhIiwidXNlcl9pZCI6IjExIn0.LSZcMRgHt4zsLaqdlqoDZpV5sPuaOHcVlyK0VfClcGU";
  
  const { data: notes } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => (await api.get("/carenotes/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data,
  });

  const createNote = useMutation({
    mutationFn: async () => await api.post("/carenotes/", { text }),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Caregiver Dashboard</h1>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={4}
        placeholder="Write today's care note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        // onClick={() => createNote.mutate()}
        // disabled={createNote.isPending}
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        {/* {createNote.isPending ? "Saving..." : "Save Note"} */}
      </button>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Past Notes</h2>
        <ul className="space-y-2">
          {notes?.map((n) => (
            // <li key={n.id} className="border rounded p-2">
            //   <p>{n.text}</p>
            //   <small className="text-gray-500 block mt-1">
            //     {new Date(n.created_at).toLocaleString('en-US', {
            //       timeZone: 'Asia/Tokyo',
            //     })}
            //   </small>
            // </li>
            <NoteCard
              key={n.id}
              text={n.text}
              author={n.author}
              created_at={new Date(n.created_at).toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
              })}
              summary_en={n.summary_en}
              summary_jp={n.summary_jp}
              family={n.family}
              />
          ))}
        </ul>
      </div>
    </div>
  );
}
