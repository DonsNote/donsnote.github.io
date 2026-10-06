import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/pamphlet/SectionPage";
import { GiftIcon } from "@/components/pamphlet/icons";
import { getPrizesContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "경품 안내 | 2026 전국 정모" };

const ACCENT = "#fb923c";

export default function PrizesPage() {
  const content = getPrizesContent("wrangler-2026");

  return (
    <SectionPage title="경품 안내" icon={<GiftIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <p className="text-[13px] mb-5" style={{ color: "var(--text-secondary)" }}>
        {content.subtitle}
      </p>
      <div className="flex flex-col gap-6">
        {content.groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold whitespace-nowrap" style={{ color: ACCENT }}>
                {group.title}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {group.items.map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="flex flex-col overflow-hidden"
                  style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 16 }}
                >
                  <div className="relative w-full aspect-square">
                    <Image src={item.image} alt={`${item.name} ${item.desc}`} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-1 p-3">
                    <p className="text-[13px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {item.name}
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
