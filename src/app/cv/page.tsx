import type { Metadata } from "next";
import {
  personalInfo,
  education,
  skillGroups,
  designTools,
  managementSkills,
  socialExperiences,
  workExperiences,
  workCategories,
} from "@/lib/cv-data";
import { techStack } from "@/lib/profile";
import { getAllProjects } from "@/lib/mdx";
import PrintButton from "@/components/cv/PrintButton";

export const metadata: Metadata = {
  title: "CV | DonsNote",
  description: "김도현(Do hyun Kim)의 이력서입니다.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-widest mb-4 pb-2"
      style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
    >
      {children}
    </h2>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

export default function CVPage() {
  const projects = getAllProjects().filter((p) => p.status !== "archived");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">

      {/* ── 헤더 ───────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {personalInfo.nameKo}
              <span className="ml-3 text-xl font-normal" style={{ color: "var(--text-secondary)" }}>
                {personalInfo.name}
              </span>
            </h1>
            <p className="mt-1 text-base" style={{ color: "var(--accent)" }}>
              {personalInfo.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 text-sm pt-1" style={{ color: "var(--text-secondary)" }}>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--text-muted)" }}>E-mail</span>
              <a href={`mailto:${personalInfo.email}`} style={{ color: "var(--accent)" }}>
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--text-muted)" }}>Phone</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--text-muted)" }}>GitHub</span>
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                {personalInfo.github}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--text-muted)" }}>Site</span>
              <a
                href={`https://${personalInfo.site}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                {personalInfo.site}
              </a>
            </div>
          </div>
        </div>

        <div className="cv-print-hide flex-shrink-0">
          <PrintButton />
        </div>
      </div>

      {/* ── 학력 (Education) ──────────────────────── */}
      <section>
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-5">
          {education.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Dot color="#60a5fa" />
              <div className="flex-1 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.school}
                    {item.schoolEn && (
                      <span className="ml-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>
                        {item.schoolEn}
                      </span>
                    )}
                  </p>
                  {item.major && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {item.major}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-sm flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 기술 (Skills) ─────────────────────────── */}
      <section>
        <SectionTitle>Skills</SectionTitle>

        {/* 기술 그룹 */}
        <div className="space-y-5">
          {skillGroups.map((group, i) => (
            <div key={i}>
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {group.category}
              </p>
              <ul className="space-y-1">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--text-muted)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="mt-5">
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {designTools.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                  color: "#34d399",
                  border: "1px solid rgba(52, 211, 153, 0.2)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dev Stack */}
        <div className="mt-5">
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Dev Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.filter((t) => !managementSkills.includes(t)).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Management */}
        <div className="mt-5">
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Management
          </p>
          <div className="flex flex-wrap gap-2">
            {managementSkills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "rgba(96, 165, 250, 0.1)",
                  color: "#60a5fa",
                  border: "1px solid rgba(96, 165, 250, 0.2)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 사회 경험 (Social Experience) ────────── */}
      <section>
        <SectionTitle>Social Experience</SectionTitle>
        <div className="space-y-5">
          {socialExperiences.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Dot color="#f59e0b" />
              <div className="flex-1 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>
                </div>
                <span className="text-sm flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 경력 (Work Experience) ────────────────── */}
      <section>
        <SectionTitle>Work Experience</SectionTitle>
        <div className="space-y-10">
          {workCategories.map((category) => {
            const items = workExperiences.filter((w) => w.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {category}
                </p>
                <div className="space-y-6">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Dot color={
                        category === "Business" ? "#a78bfa"
                        : category === "Employee" ? "#34d399"
                        : "#60a5fa"
                      } />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                              {item.company}
                              {item.companyEn && (
                                <span className="ml-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>
                                  {item.companyEn}
                                </span>
                              )}
                              {item.status && (
                                <span
                                  className="ml-2 text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: "var(--bg-tertiary)",
                                    color: "var(--text-muted)",
                                    border: "1px solid var(--border)",
                                  }}
                                >
                                  {item.status}
                                </span>
                              )}
                            </p>
                            <p className="text-sm mt-0.5" style={{ color: "var(--accent)" }}>
                              {item.role}
                            </p>
                          </div>
                          <span className="text-sm flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 프로젝트 ──────────────────────────────── */}
      {projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-5">
            {projects.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <Dot color="#10b981" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {p.title}
                    </p>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs"
                        style={{ color: "var(--accent)" }}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {p.siteUrl && (
                      <a
                        href={p.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs"
                        style={{ color: "var(--accent)" }}
                      >
                        사이트 ↗
                      </a>
                    )}
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {p.description}
                  </p>
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded"
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
