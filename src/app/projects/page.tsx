import ProjectModal from "@/components/projects/ProjectModal";
import { getAllProjects } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | DonsNote",
  description: "DonsNote가 만든 프로젝트들을 소개합니다.",
};

const sections = [
  { key: "wip",      label: "개발 중" },
  { key: "active",   label: "운영 중" },
  { key: "archived", label: "보관 및 미운영"    },
] as const;

export default function ProjectsPage() {
  const all = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Projects
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          직접 만든 프로젝트들을 소개합니다.
        </p>
      </div>

      {sections.map(({ key, label }) => {
        const items = all.filter((p) => p.status === key);
        if (items.length === 0) return null;
        return (
          <section key={key} className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              {label}
            </h2>
            <ProjectModal projects={items} />
          </section>
        );
      })}

      {all.length === 0 && (
        <div
          className="py-20 text-center rounded-xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p className="text-lg">곧 프로젝트가 추가될 예정입니다.</p>
        </div>
      )}
    </div>
  );
}
