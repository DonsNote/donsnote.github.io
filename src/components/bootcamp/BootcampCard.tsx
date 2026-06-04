"use client";

import Link from "next/link";
import { BootcampItem as Bootcamp } from "@/lib/mdx";

export default function BootcampCard({ camp }: { camp: Bootcamp }) {
  const totalCount = camp.courses
    ? camp.courses.length
    : camp.groups!.reduce((a, g) => a + g.lectures.length, 0);

  return (
    <Link
      href={`/bootcamp/${camp.id}`}
      className="flex items-stretch rounded-xl overflow-hidden transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = camp.color + "88")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* 왼쪽 색상 바 */}
      <div
        className="w-1 flex-shrink-0"
        style={{ backgroundColor: camp.color }}
      />

      {/* 콘텐츠 */}
      <div className="flex-1 flex items-center justify-between gap-6 px-6 py-5">

        {/* 이름 + 기간 + 설명 */}
        <div className="flex-1 min-w-0 space-y-1">
          <h2
            className="font-bold text-base leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {camp.name}
          </h2>
          {camp.period && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {camp.period}
            </p>
          )}
          <p
            className="text-sm leading-relaxed line-clamp-1 hidden md:block"
            style={{ color: "var(--text-secondary)" }}
          >
            {camp.description}
          </p>
        </div>

        {/* 태그 */}
        <div className="hidden md:flex flex-wrap gap-1.5 max-w-xs justify-end">
          {camp.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded whitespace-nowrap"
              style={{
                backgroundColor: camp.color + "18",
                color: camp.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 카운트 + 화살표 */}
        <p
          className="text-sm font-medium flex-shrink-0"
          style={{ color: camp.color }}
        >
          {camp.courses ? `${totalCount}개 과정` : `${totalCount}개 강의`} →
        </p>

      </div>
    </Link>
  );
}
