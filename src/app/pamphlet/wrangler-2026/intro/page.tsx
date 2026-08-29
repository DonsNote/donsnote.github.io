import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/pamphlet/SectionPage";
import { InfoIcon } from "@/components/pamphlet/icons";
import { getIntroContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "행사 소개 | 2026 전국 정모" };

const ACCENT = "#fb923c";
const CARD: React.CSSProperties = {
  backgroundColor: "var(--bg-secondary)",
  border: "1px solid var(--border)",
  borderRadius: 16,
};

export default function IntroPage() {
  const content = getIntroContent("wrangler-2026");

  return (
    <SectionPage title="행사 소개" icon={<InfoIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center pt-2 pb-1">
          <Image
            src="/images/pamphlet/wrangler-mania-logo.svg"
            alt="WRANGLER MANIA"
            width={329}
            height={101}
            priority
            className="w-[329px] max-w-full h-auto"
          />
        </div>

        <div className="flex flex-col gap-3 p-5" style={CARD}>
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-bold px-2.5 py-1.5 rounded-full"
              style={{ color: ACCENT, backgroundColor: ACCENT + "1a", border: `1px solid ${ACCENT}` }}
            >
              {content.badge}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {content.badgeLabel}
            </span>
          </div>
          <p className="pamphlet-title text-[22px] leading-snug" style={{ color: "var(--text-primary)" }}>
            {content.title}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {content.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5" style={CARD}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: ACCENT }}>
              {content.overviewTitle}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {content.overviewSubtitle}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {content.overview}
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5" style={CARD}>
          <span className="text-sm font-bold" style={{ color: ACCENT }}>
            행사 정보
          </span>
          {content.info.map((row, i) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-[13px]">
                <span style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {row.value}
                </span>
              </div>
              {i < content.info.length - 1 && (
                <div className="h-px mt-3" style={{ backgroundColor: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}
