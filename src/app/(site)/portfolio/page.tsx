import ProjectModal from "@/components/portfolio/ProjectModal";
import { getAllProjects } from "@/lib/mdx";
import type { ProjectCategory } from "@/lib/mdx";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | DonsNote",
  description: "DonsNote의 포트폴리오입니다.",
};

const categories: { key: ProjectCategory; label: string; color: string }[] = [
  { key: "Management",  label: "Management",  color: "#34d399" },
  { key: "Development", label: "Development", color: "#a78bfa" },
  { key: "Design",      label: "Design",      color: "#f472b6" },
];

export default function PortfolioPage() {
  const all = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <PageHeader title="Portfolio" subtitle="작업물과 프로젝트를 소개합니다." />

      {categories.map(({ key, label, color }) => {
        const items = all.filter((p) => p.category === key);
        if (items.length === 0) return null;
        return (
          <section key={key} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
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
