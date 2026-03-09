"use client";

import Link from "next/link";
import { Bootcamp } from "@/content/bootcamps";

export default function BootcampCard({ camp }: { camp: Bootcamp }) {
  const totalCount = camp.courses
    ? camp.courses.length
    : camp.groups!.reduce((a, g) => a + g.lectures.length, 0);

  return (
    <Link
      href={`/bootcamp/${camp.id}`}
      className="group block p-6 rounded-xl transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = camp.color + "66")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      <div
        className="w-8 h-1 rounded-full mb-4"
        style={{ backgroundColor: camp.color }}
      />

      <h2
        className="font-bold text-base leading-snug mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {camp.name}
      </h2>

      {camp.period && (
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {camp.period}
        </p>
      )}

      <p
        className="text-sm leading-relaxed mb-4 line-clamp-3"
        style={{ color: "var(--text-secondary)" }}
      >
        {camp.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {camp.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded"
            style={{
              backgroundColor: camp.color + "18",
              color: camp.color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs font-medium" style={{ color: camp.color }}>
        {camp.courses ? `${totalCount}개 과정` : `${totalCount}개 강의`} →
      </p>
    </Link>
  );
}
