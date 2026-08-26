import Image from "next/image";
import Link from "next/link";
import { InfoIcon, CalendarIcon, MapIcon, AlertTriangleIcon, HandshakeIcon } from "@/components/pamphlet/icons";

const ACCENT = "#fb923c";

const sections = [
  { href: "/pamphlet/wrangler-2026/intro", icon: InfoIcon, title: "행사 소개", desc: "9차 전국 정모를 소개합니다" },
  { href: "/pamphlet/wrangler-2026/schedule", icon: CalendarIcon, title: "행사 일정", desc: "당일 타임테이블" },
  { href: "/pamphlet/wrangler-2026/map", icon: MapIcon, title: "행사장 약도", desc: "용평리조트 배치도" },
  { href: "/pamphlet/wrangler-2026/notice", icon: AlertTriangleIcon, title: "주의할 점", desc: "참가 전 꼭 확인하세요" },
  { href: "/pamphlet/wrangler-2026/partners", icon: HandshakeIcon, title: "협력업체 소개", desc: "함께하는 업체들" },
];

export default function PamphletHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 pt-8 pb-6">
        <Image
          src="/images/club/teaser-poster-red.png"
          alt="2026 전국 정모 티저 포스터"
          width={1417}
          height={2004}
          priority
          className="w-full h-auto rounded-2xl shadow-lg"
          style={{ border: "1px solid var(--border)" }}
        />
      </div>

      <nav className="flex-1 px-5 py-6 space-y-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                boxShadow: "0px 6px 16px -6px rgba(0,0,0,0.2)",
              }}
            >
              <span
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 44, height: 44, backgroundColor: ACCENT + "1a", border: `1px solid ${ACCENT}33`, color: ACCENT }}
              >
                <Icon size={22} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#a7b0b8" }}>
                  {s.desc}
                </p>
              </div>
              <span style={{ color: ACCENT }}>›</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 pb-8 pt-4 text-center">
        <Link href="/club/wrangler-mania" className="text-xs" style={{ color: "var(--text-muted)" }}>
          ← DonsNote로 돌아가기
        </Link>
      </div>
    </div>
  );
}
