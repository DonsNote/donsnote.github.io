import ProjectModal from "@/components/projects/ProjectModal";
import { getAllProjects } from "@/lib/mdx";
import type { ProjectCategory } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | DonsNote",
  description: "DonsNote가 만든 프로젝트들을 소개합니다.",
};

const categories: { key: ProjectCategory; label: string; color: string }[] = [
  { key: "개발", label: "개발",   color: "#a78bfa" },
  { key: "디자인", label: "디자인", color: "#f472b6" },
  { key: "사업",   label: "사업",   color: "#34d399" },
];

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

      {categories.map(({ key, label, color }) => {
        const items = all.filter((p) => p.category === key);
        if (items.length === 0) return null;
        return (
          <section key={key} className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h2
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </h2>
            </div>
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
