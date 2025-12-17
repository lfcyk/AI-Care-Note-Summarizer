import { useTheme } from "@/utils/ThemeProvider";
import React from "react";

interface FamilyCardProps {
  created_at?: string;
  summary_en?: string;
  summary_jp?: string;
  family: string;

}

export default function FamilyCard({  created_at, summary_en, summary_jp, family }: FamilyCardProps) {
  const { dark, toggleTheme } = useTheme()!;

  return (
    <div className={`${dark ? "bg-gray-800 text-white" : "bg-gray-50 text-black"} rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100`}>

      <div className="flex justify-between text-xs text-gray-400 mt-auto">
        {family && <span>Patient Name : {family} </span>}
      </div>
      <h4 className="font-semibold text-base mb-1">{summary_en}</h4>
      <h4 className="font-semibold text-base mb-1">{summary_jp}</h4>
      <div className="flex justify-end text-xs text-gray-400 mt-auto">
        {created_at && <span>{created_at}</span>}
      </div>
    </div>
  );
}
