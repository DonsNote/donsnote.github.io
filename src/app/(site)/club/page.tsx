import { getAllClubs } from "@/lib/mdx";
import ClubCard from "@/components/club/ClubCard";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club | DonsNote",
  description: "활동 중인 동아리(클럽) 기록을 소개합니다.",
};

export default function ClubPage() {
  const clubs = getAllClubs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <PageHeader title="Club" subtitle="활동 중인 동아리 기록입니다." />

      <div className="flex flex-col gap-4">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      {clubs.length === 0 && (
        <div
          className="py-20 text-center rounded-xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p className="text-lg">곧 동아리 활동이 추가될 예정입니다.</p>
        </div>
      )}
    </div>
  );
}
