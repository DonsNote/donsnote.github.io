"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import BaseModal from "@/components/ui/BaseModal";
import { ProjectItem as Project } from "@/lib/mdx";
import { GitHubIcon, ExternalLinkIcon, ChevronRightIcon, FigmaIcon } from "@/lib/icons";
import { markdownComponents } from "@/lib/markdownComponents";

const categoryColor: Record<string, string> = {
  Management: "#34d399",
  Development: "#a78bfa",
  Design: "#f472b6",
};

const statusLabel: Record<Project["status"], string> = {
  active: "운영 중",
  wip: "개발 중",
  done: "개발 완료",
};

const statusColor: Record<Project["status"], string> = {
  active: "#10b981",
  wip: "#f59e0b",
  done: "#60a5fa",
};

function ProjectModalHeader({ project }: { project: Project }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          {project.title}
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
          style={{
            color: statusColor[project.status],
            backgroundColor: `${statusColor[project.status]}18`,
          }}
        >
          {statusLabel[project.status]}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <GitHubIcon size={14} /> GitHub
          </a>
        )}
        {project.figmaUrl && (
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <FigmaIcon size={14} /> Figma
          </a>
        )}
        {project.siteUrl && (
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent)")}
          >
            <ExternalLinkIcon size={14} /> 사이트 방문
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const color = categoryColor[project.category] ?? "var(--accent)";
  return (
    <article
      onClick={onClick}
      className="flex items-stretch rounded-xl overflow-hidden cursor-pointer transition-all"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + "88")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="w-1 flex-shrink-0" style={{ backgroundColor: color }} />
      <div className="flex-1 p-6 space-y-4 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          {project.title}
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
          style={{ color: statusColor[project.status], backgroundColor: `${statusColor[project.status]}18` }}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-xs"
            style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <GitHubIcon size={16} /> GitHub
          </a>
        )}
        {project.figmaUrl && (
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <FigmaIcon size={16} /> Figma
          </a>
        )}
        {project.siteUrl && (
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent)")}
          >
            <ExternalLinkIcon size={16} /> 사이트 방문
          </a>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
          자세히 보기 <ChevronRightIcon size={12} />
        </span>
      </div>
      </div>
    </article>
  );
}

export default function ProjectModal({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onClick={() => setSelected(project)} />
        ))}
      </div>

      {selected && (
        <BaseModal title={<ProjectModalHeader project={selected} />} onClose={() => setSelected(null)}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {selected.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {selected.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          {selected.content && (
            <div className="pt-4 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                  {selected.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </BaseModal>
      )}
    </>
  );
}
