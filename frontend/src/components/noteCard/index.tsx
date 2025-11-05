import React from "react";

interface NoteCardProps {
  text: string;
  author?: string;
  created_at?: string;
  summary_en?: string;
  summary_jp?: string;
  family: string;

}

export default function NoteCard({ text, author, created_at, summary_en, summary_jp, family }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">

      <h4 className="font-semibold text-base mb-1">{summary_en}</h4>
      <h4 className="font-semibold text-base mb-1">{summary_jp}</h4>
      <p className="text-gray-700 text-sm mb-2">{text}</p>
      <div className="flex justify-between text-xs text-gray-400 mt-auto">
        {author && <span>By {author}</span>}
        {created_at && <span>{created_at}</span>}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-auto">
        {family && <span>By {family}</span>}
      </div>
    </div>
  );
}
