import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";
import { HandshakeIcon } from "@/components/pamphlet/icons";
import { getPartnersContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "협력업체 소개 | 2026 전국 정모" };

const ACCENT = "#fb923c";

export default function PartnersPage() {
  const content = getPartnersContent("wrangler-2026");

  return (
    <SectionPage title="협력업체 소개" icon={<HandshakeIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div className="flex flex-col gap-6">
        {content.groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold whitespace-nowrap" style={{ color: ACCENT }}>
                {group.emoji} {group.title}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
            </div>
            {group.partners.map((p) => (
              <div
                key={p.code}
                className="flex flex-col gap-3 p-4"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 16 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-xl flex-shrink-0 text-sm font-bold"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: "var(--bg-tertiary)",
                      border: "1px solid var(--border)",
                      color: ACCENT,
                    }}
                  >
                    {p.code}
                  </span>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                      {p.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {p.role}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
