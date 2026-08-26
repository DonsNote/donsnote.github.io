import Link from "next/link";

const ACCENT = "#fb923c";

interface SectionPageProps {
  title: string;
  emoji: string;
  homeHref: string;
  children?: React.ReactNode;
}

export default function SectionPage({ title, emoji, homeHref, children }: SectionPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className="flex items-center gap-3 px-5 py-4 sticky top-0 z-10"
        style={{ backgroundColor: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}
      >
        <Link href={homeHref} aria-label="홈으로" className="text-lg leading-none" style={{ color: ACCENT }}>
          ←
        </Link>
        <h1 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
          {emoji} {title}
        </h1>
      </header>

      <div className="flex-1 px-5 py-10">
        {children ?? (
          <div
            className="flex flex-col items-center justify-center gap-2 text-center rounded-2xl py-16"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <span className="text-3xl">{emoji}</span>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              준비 중입니다
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              내용이 곧 업데이트됩니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
