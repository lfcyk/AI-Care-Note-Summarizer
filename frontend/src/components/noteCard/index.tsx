import React from "react";

interface NoteCardProps {
  title: string;
  content: string;
  author?: string;
  date?: string;
}

export default function NoteCard({ title, content, author, date }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
      <h4 className="font-semibold text-base mb-1">{title}</h4>
      <p className="text-gray-700 text-sm mb-2">{content}</p>
      <div className="flex justify-between text-xs text-gray-400 mt-auto">
        {author && <span>By {author}</span>}
        {date && <span>{date}</span>}
      </div>
    </div>
  );
}
