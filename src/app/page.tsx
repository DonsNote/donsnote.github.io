"use client";

import Image from "next/image";

const aboutCards = [
  {
    label: "MBTI",
    value: "ENFJ",
    sub: "The Protagonist",
    color: "#a78bfa",
  },
  {
    label: "현재",
    value: "성장 중",
    sub: "개발 능력 · PM 능력 향상",
    color: "#34d399",
  },
  {
    label: "관심사",
    value: "게임 · 소설",
    sub: "MMORPG · 문학 · 판타지",
    color: "#60a5fa",
  },
];

const nowItems = [
  { text: "Goorm Deep Dive PM 과정 수료 중", color: "#34d399" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/donsnote",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="flex flex-col items-center text-center space-y-5">
        <Image
          src="/images/Donsmemo.png"
          alt="Donsmemo"
          width={300}
          height={300}
          className="rounded-2xl"
        />
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            DonsNote
          </h1>
          <p className="text-lg font-medium" style={{ color: "var(--accent)" }}>
            5min Best Friend
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            5분만 대화하면 절친!
          </p>
        </div>
      </section>

      {/* ── About ────────────────────────────────── */}
      <section className="grid md:grid-cols-3 gap-4">
        {aboutCards.map((card) => (
          <div
            key={card.label}
            className="p-5 rounded-xl space-y-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {card.label}
            </p>
            <p className="text-2xl font-bold" style={{ color: card.color }}>
              {card.value}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {card.sub}
            </p>
          </div>
        ))}
      </section>

      {/* ── Now ──────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Now
        </h2>
        <div
          className="p-6 rounded-xl space-y-3"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          {nowItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────── */}
      <section className="space-y-4">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Contact
        </h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
