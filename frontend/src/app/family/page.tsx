import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

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

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Family Dashboard</h1>
      <ul className="space-y-3">
        {summaries?.map((s) => (
          <li key={s.id} className="border rounded p-3">
            <p className="font-medium">EN: {s.text_en}</p>
            {s.text_ja && <p className="text-gray-700 mt-1">JP: {s.text_ja}</p>}
            <small className="text-gray-500 block mt-1">
              {new Date(s.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
