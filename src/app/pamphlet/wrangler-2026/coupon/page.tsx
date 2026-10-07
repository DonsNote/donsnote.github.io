import type { Metadata } from "next";
import Image from "next/image";
import SectionPage from "@/components/pamphlet/SectionPage";
import { TicketIcon } from "@/components/pamphlet/icons";

export const metadata: Metadata = { title: "모나용평 할인권 | 2026 전국 정모" };

const ACCENT = "#fb923c";

const venues = [
  {
    name: "피트니스센터",
    menus: [
      { name: "성인(사우나)", dc: 50, price: 10000 },
      { name: "아동(사우나)", dc: 50, price: 6500 },
    ],
  },
  {
    name: "사계절썰매장",
    menus: [
      { name: "2회권 소인(썰매)", dc: 20, price: 8800 },
      { name: "2회권 대인(썰매)", dc: 20, price: 12000 },
    ],
  },
  {
    name: "마운틴코스터",
    menus: [
      { name: "일반대인", dc: 20, price: 14400 },
      { name: "일반소인", dc: 20, price: 11200 },
    ],
  },
  {
    name: "발왕산 관광케이블카",
    menus: [
      { name: "케이블카 왕복 대인", dc: 50, price: 13500 },
      { name: "케이블카 왕복 소인(초등)", dc: 50, price: 11500 },
    ],
  },
  {
    name: "루지",
    menus: [{ name: "루지 1회권", dc: 20, price: 14400 }],
  },
  {
    name: "애니포레",
    menus: [
      { name: "애니포레(대인)", dc: 20, price: 14400 },
      { name: "애니포레(소인)", dc: 20, price: 12000 },
    ],
  },
  {
    name: "워터파크(피크아일랜드)",
    menus: [
      { name: "종일(대인)", dc: 50, price: 26500 },
      { name: "종일(소인)", dc: 50, price: 21000 },
    ],
  },
];

export default function CouponPage() {
  return (
    <SectionPage title="모나용평 할인권" icon={<TicketIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div
        className="flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 16 }}
      >
        <div className="flex flex-col items-center gap-2 px-5 pt-6 pb-5" style={{ backgroundColor: "#ffffff" }}>
          <Image
            src="/images/pamphlet/우대권.png"
            alt="모나용평 단체 우대권 바코드 Y264996297"
            width={185}
            height={70}
            priority
            className="w-full max-w-[320px] h-auto"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-[12px] text-center" style={{ color: "#4b5563" }}>
            매표소에서 이 바코드를 제시해 주세요
          </p>
        </div>

        <div className="flex flex-col gap-1 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>
            랭글러매니아 참가자 단체 우대권
          </p>
          <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
            이용기간 2026.10.16 ~ 2026.10.18 · 항목별 1인
          </p>
          <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
            표시된 요금은 할인율이 적용된 금액입니다
          </p>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {venues.map((venue) => (
            <div key={venue.name} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold whitespace-nowrap" style={{ color: ACCENT }}>
                  {venue.name}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
              </div>
              {venue.menus.map((menu) => (
                <div key={menu.name} className="flex items-center gap-3">
                  <p className="flex-1 min-w-0 text-[13px]" style={{ color: "var(--text-primary)" }}>
                    {menu.name}
                  </p>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ACCENT + "1a", color: ACCENT }}
                  >
                    {menu.dc}% 할인
                  </span>
                  <span
                    className="text-[13px] font-bold text-right flex-shrink-0 w-[68px]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {menu.price.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}
