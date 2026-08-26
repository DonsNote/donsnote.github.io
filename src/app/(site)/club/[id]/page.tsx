import { getAllClubs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ActivityList from "@/components/club/ActivityList";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllClubs().map((club) => ({ id: club.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const club = getAllClubs().find((c) => c.id === id);
  if (!club) return {};
  return {
    title: `${club.name} | DonsNote`,
    description: club.description,
  };
}

export default async function ClubDetailPage({ params }: PageProps) {
  const { id } = await params;
  const club = getAllClubs().find((c) => c.id === id);
  if (!club) notFound();

  const totalCount = club.activities
    ? club.activities.length
    : club.groups!.reduce((a, g) => a + g.activities.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* 헤더 */}
      <div className="space-y-4">
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: club.color }} />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {club.name}
          </h1>
          {club.period && (
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {club.period}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          {club.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {club.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: club.color + "18", color: club.color }}
              >
                {tag}
              </span>
            ))}
          </div>
          {club.url && (
            <a
              href={club.url}
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

      {/* 온라인 팜플렛 */}
      {club.pamphletUrl && (
        <Link
          href={club.pamphletUrl}
          className="flex items-center justify-between gap-4 p-5 rounded-xl transition-all"
          style={{ backgroundColor: club.color + "14", border: `1px solid ${club.color}40` }}
        >
          <div>
            <p className="text-xs font-semibold tracking-wide" style={{ color: club.color }}>
              ONLINE PAMPHLET
            </p>
            <p className="text-base font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
              {club.pamphletTitle ?? "온라인 팜플렛 보기"}
            </p>
          </div>
          <span className="text-xl flex-shrink-0" style={{ color: club.color }}>
            →
          </span>
        </Link>
      )}

      {/* 구분선 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>총 {totalCount}개</span>
      </div>

      {/* 단순 목록 */}
      {club.activities && (
        <ActivityList
          clubId={club.id}
          activities={club.activities}
          color={club.color}
        />
      )}

      {/* 그룹 목록 */}
      {club.groups && (
        <div className="space-y-10">
          {club.groups.map((group) => (
            <section key={group.name} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold" style={{ color: club.color }}>
                  {group.name}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {group.activities.length}개
                </span>
              </div>
              <ActivityList
                clubId={club.id}
                activities={group.activities}
                color={club.color}
              />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
