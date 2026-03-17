"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ProjectItem as Project } from "@/lib/mdx";

const statusLabel: Record<Project["status"], string> = {
  active: "운영 중",
  archived: "보관",
  wip: "개발 중",
};

const statusColor: Record<Project["status"], string> = {
  active: "#10b981",
  archived: "var(--text-muted)",
  wip: "#f59e0b",
};

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* 헤더 */}
        <div
          className="flex items-start justify-between gap-4 px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="space-y-2 flex-1 min-w-0">
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

            {/* 링크 */}
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
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
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
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  사이트 방문
                </a>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md transition-colors flex-shrink-0"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="닫기"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="overflow-y-auto px-6 py-6 flex-1 space-y-4">
          {/* 설명 */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 상세 내용 */}
          {project.content && (
            <div
              className="pt-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="prose">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <article
            key={project.title}
            onClick={() => setSelected(project)}
            className="p-6 rounded-xl space-y-4 flex flex-col cursor-pointer transition-all"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {/* 헤더 */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                style={{
                  color: statusColor[project.status],
                  backgroundColor: `${statusColor[project.status]}18`,
                }}
              >
                {statusLabel[project.status]}
              </span>
            </div>

            {/* 설명 */}
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
              {project.description}
            </p>

            {/* 태그 */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 링크 */}
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
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
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
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  사이트 방문
                </a>
              )}

              <span
                className="ml-auto inline-flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                자세히 보기
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                  <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
