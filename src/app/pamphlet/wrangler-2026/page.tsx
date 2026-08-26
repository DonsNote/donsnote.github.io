import Link from "next/link";

const ACCENT = "#fb923c";

const sections = [
  { href: "/pamphlet/wrangler-2026/intro", emoji: "📣", title: "행사 소개", desc: "9차 전국 정모를 소개합니다" },
  { href: "/pamphlet/wrangler-2026/schedule", emoji: "🗓️", title: "행사 일정", desc: "당일 타임테이블" },
  { href: "/pamphlet/wrangler-2026/map", emoji: "🗺️", title: "행사장 약도", desc: "용평리조트 배치도" },
  { href: "/pamphlet/wrangler-2026/notice", emoji: "⚠️", title: "주의할 점", desc: "참가 전 꼭 확인하세요" },
  { href: "/pamphlet/wrangler-2026/partners", emoji: "🤝", title: "협력업체 소개", desc: "함께하는 업체들" },
];

export default function PamphletHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 pt-14 pb-8 text-center space-y-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-xs font-semibold tracking-wide" style={{ color: ACCENT }}>
          WRANGLER MANIA
        </p>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          2026 전국 정모
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>용평리조트</p>
      </div>

      <nav className="flex-1 px-5 py-6 space-y-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <span className="text-2xl">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
            </div>
            <span style={{ color: ACCENT }}>›</span>
          </Link>
        ))}
      </nav>

      <div className="px-6 pb-8 pt-4 text-center">
        <Link href="/club/wrangler-mania" className="text-xs" style={{ color: "var(--text-muted)" }}>
          ← DonsNote로 돌아가기
        </Link>
      </div>
    </div>
  );
}
