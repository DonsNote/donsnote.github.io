"use client";

import Link from "next/link";
import { ClubItem as Club } from "@/lib/mdx";

export default function ClubCard({ club }: { club: Club }) {
  const totalCount = club.activities
    ? club.activities.length
    : club.groups!.reduce((a, g) => a + g.activities.length, 0);

  return (
    <Link
      href={`/club/${club.id}`}
      className="flex items-stretch rounded-xl overflow-hidden transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = club.color + "88")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* 왼쪽 색상 바 */}
      <div
        className="w-1 flex-shrink-0"
        style={{ backgroundColor: club.color }}
      />

      {/* 콘텐츠 */}
      <div className="flex-1 flex items-center justify-between gap-6 px-6 py-5">

        {/* 이름 + 기간 + 설명 */}
        <div className="flex-1 min-w-0 space-y-1">
          <h2
            className="font-bold text-base leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {club.name}
          </h2>
          {club.period && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {club.period}
            </p>
          )}
          <p
            className="text-sm leading-relaxed line-clamp-1 hidden md:block"
            style={{ color: "var(--text-secondary)" }}
          >
            {club.description}
          </p>
        </div>

        {/* 태그 */}
        <div className="hidden md:flex flex-wrap gap-1.5 max-w-xs justify-end">
          {club.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded whitespace-nowrap"
              style={{
                backgroundColor: club.color + "18",
                color: club.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 카운트 + 화살표 */}
        <p
          className="text-sm font-medium flex-shrink-0"
          style={{ color: club.color }}
        >
          {totalCount}개 활동 →
        </p>

      </div>
    </Link>
  );
}
