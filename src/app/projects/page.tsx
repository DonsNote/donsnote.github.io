import { projects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | DonsNote",
  description: "DonsNote가 만든 프로젝트들을 소개합니다.",
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === "active" || p.status === "wip");
  const archived = projects.filter((p) => p.status === "archived");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Projects
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          직접 만든 프로젝트들을 소개합니다.
        </p>
      </div>

      {/* 활성 프로젝트 */}
      {active.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Active / WIP
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {active.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* 보관 프로젝트 */}
      {archived.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Archived
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {archived.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && (
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
