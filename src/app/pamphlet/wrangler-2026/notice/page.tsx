import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";
import { AlertTriangleIcon } from "@/components/pamphlet/icons";
import { getNoticeContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "주의할 점 | 2026 전국 정모" };

const ACCENT = "#fb923c";

export default function NoticePage() {
  const content = getNoticeContent("wrangler-2026");

  return (
    <SectionPage title="주의할 점" icon={<AlertTriangleIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-bold" style={{ color: ACCENT }}>
            {content.title}
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-center p-4"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 12,
              }}
            >
              <span
                className="flex items-center justify-center rounded-2xl flex-shrink-0 text-[18px] leading-none"
                style={{ width: 32, height: 32, backgroundColor: ACCENT + "1a" }}
              >
                ⚠️
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p
                  className="text-[15px] font-bold"
                  style={{ color: item.emphasis ? ACCENT : "var(--text-primary)" }}
                >
                  {item.title}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}
