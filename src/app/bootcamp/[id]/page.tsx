import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bootcamps, BootcampLecture } from "@/content/bootcamps";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LectureList from "@/components/bootcamp/LectureModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

const bootcampDir = path.join(process.cwd(), "src/content/bootcamp");

function readMdContent(filePath: string): string | null {
  if (!filePath) return null;
  const fullPath = path.join(bootcampDir, filePath);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { content } = matter(raw);
  return content.trim() || null;
}

function withContent(lectures: BootcampLecture[]) {
  return lectures.map((l) => ({
    title: l.title,
    description: l.description,
    content: l.filePath ? readMdContent(l.filePath) : null,
  }));
}

export async function generateStaticParams() {
  return bootcamps.map((camp) => ({ id: camp.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const camp = bootcamps.find((c) => c.id === id);
  if (!camp) return {};
  return {
    title: `${camp.name} | DonsNote`,
    description: camp.description,
  };
}

export default async function BootcampDetailPage({ params }: PageProps) {
  const { id } = await params;
  const camp = bootcamps.find((c) => c.id === id);
  if (!camp) notFound();

  const totalCount = camp.courses
    ? camp.courses.length
    : camp.groups!.reduce((a, g) => a + g.lectures.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* 헤더 */}
      <div className="space-y-4">
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: camp.color }} />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {camp.name}
          </h1>
          {camp.period && (
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {camp.period}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          {camp.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {camp.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: camp.color + "18", color: camp.color }}
              >
                {tag}
              </span>
            ))}
          </div>
          {camp.url && (
            <a
              href={camp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              공식 사이트 ↗
            </a>
          )}
        </div>
      </div>

      {/* 구분선 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>총 {totalCount}개</span>
      </div>

      {/* 단순 목록 (Apple, 42) */}
      {camp.courses && (
        <LectureList
          lectures={withContent(camp.courses)}
          color={camp.color}
        />
      )}

      {/* 그룹 목록 (Goorm) */}
      {camp.groups && (
        <div className="space-y-10">
          {camp.groups.map((group) => (
            <section key={group.name} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold" style={{ color: camp.color }}>
                  {group.name}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {group.lectures.length}개
                </span>
              </div>
              <LectureList
                lectures={withContent(group.lectures)}
                color={camp.color}
                groupName={group.name}
              />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
