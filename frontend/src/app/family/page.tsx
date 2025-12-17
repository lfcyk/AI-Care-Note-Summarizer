"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import Navbar from "@/components/navbar";
import { useTheme } from "@/utils/ThemeProvider";
import FamilyCard from "@/components/familyCard";

type Summary = {
  id: number;
  care_note: number;
  text_en: string;
  text_ja: string;
  created_at: string;
};

export default function FamilyPage() {
//   const { data: summaries } = useQuery<Summary[]>({
//     queryKey: ["summaries"],
//     queryFn: async () => (await api.get("/summaries/")).data,
//   });
  const summaries = [
    { id: 1, care_note: 1, text_en: "Patient is responding well to treatment.", text_ja: "患者は治療に良く反応しています。", created_at: "2024-06-01T12:00:00Z" },
    { id: 2, care_note: 2, text_en: "Medication adjusted as per doctor's advice.", text_ja: "医師のアドバイスに従って薬が調整されました。", created_at: "2024-06-02T15:30:00Z" },
  ]
  const { dark } = useTheme()!;
  return (
    <div className={`font-sans grid grid-rows-[60px_1fr_20px] items-start justify-items-center min-h-screen pt-20 pb-20 sm:p-20 ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <Navbar />
      <h1 className="text-xl font-semibold mb-4">Family Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-10">
        {summaries.map((summary) => (
          <FamilyCard
            key={summary.id}
            family={`Family for Care Note ${summary.care_note}`}
            summary_en={summary.text_en}
            summary_jp={summary.text_ja}
            created_at={new Date(summary.created_at).toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
              })}
          />
        ))}
      </div>
    </div>
  );
}
