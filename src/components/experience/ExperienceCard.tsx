"use client";

import { Experience } from "@/content/experiences";

const sectionConfig = {
  work:      { label: "Work",      color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  education: { label: "Education", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  freelance: { label: "Freelance", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
};

export default function ExperienceCard({ item }: { item: Experience }) {
  const { label, color, bg } = sectionConfig[item.type];

  const inner = (
    <div
      className="h-full p-5 rounded-xl flex flex-col gap-3 transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="self-start px-2 py-0.5 rounded text-xs font-medium"
        style={{ backgroundColor: bg, color }}
      >
        {label}
      </span>

      <div>
        <p className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
          {item.organization}
        </p>
        <p className="text-sm mt-0.5" style={{ color }}>
          {item.title}
        </p>
        {item.period && (
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {item.period}
          </p>
        )}
      </div>

      {item.description && (
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
          {item.description}
        </p>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full hover:scale-[1.01] transition-transform"
        onMouseEnter={(e) => {
          const card = e.currentTarget.firstElementChild as HTMLElement;
          if (card) card.style.borderColor = color + "66";
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget.firstElementChild as HTMLElement;
          if (card) card.style.borderColor = "var(--border)";
        }}
      >
        {inner}
      </a>
    );
  }

  return <div className="h-full">{inner}</div>;
}
