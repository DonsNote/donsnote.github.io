import { getAllBootcamps } from "@/lib/mdx";
import BootcampCard from "@/components/bootcamp/BootcampCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bootcamp | DonsNote",
  description: "참여한 부트캠프 과정을 소개합니다.",
};

export default function BootcampPage() {
  const bootcamps = getAllBootcamps();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Bootcamp
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          참여한 부트캠프 과정 기록입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bootcamps.map((camp) => (
          <BootcampCard key={camp.id} camp={camp} />
        ))}
      </div>
    </div>
  );
}
