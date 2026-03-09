import { experiences, Experience } from "@/content/experiences";
import ExperienceCard from "@/components/experience/ExperienceCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | DonsNote",
  description: "부트캠프, 직장, 교육, 프리랜서 경험을 소개합니다.",
};

const sectionConfig: {
  type: Experience["type"];
  label: string;
  color: string;
}[] = [
  { type: "work",       label: "Work",       color: "#34d399" },
  { type: "education",  label: "Education",  color: "#60a5fa" },
  { type: "freelance",  label: "Freelance",  color: "#fb923c" },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Experience
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          직장, 교육, 프리랜서 활동 기록입니다.
        </p>
      </div>

      {sectionConfig.map(({ type, label, color }) => {
        const items = experiences.filter((e) => e.type === type);
        if (items.length === 0) return null;

        return (
          <section key={type} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold" style={{ color }}>
                {label}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {items.length}개
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <ExperienceCard key={i} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
