"use client";

import { GitHubIcon } from "@/lib/icons";
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
  { text: "Aesopos Inc. 운영 중 (종합 컨설팅 및 광고영상제작)", color: "#736fc7" },
  { text: "Aesopos Inc. Pivoting 준비 중 (IT 서비스)", color: "#c7856f" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/donsnote", icon: <GitHubIcon /> },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="flex flex-col items-center text-center space-y-5">
        <Image
          src="/images/Donsmemo.webp"
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
