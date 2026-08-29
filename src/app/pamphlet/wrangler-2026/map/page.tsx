import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";
import NaverMap from "@/components/pamphlet/NaverMap";
import BoothLayout from "@/components/pamphlet/BoothLayout";
import { MapIcon, MapPinIcon, CarIcon, ParkingCircleIcon, PhoneIcon } from "@/components/pamphlet/icons";
import { getMapContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "행사장 약도 | 2026 전국 정모" };

const ACCENT = "#fb923c";
const CARD: React.CSSProperties = {
  backgroundColor: "var(--bg-secondary)",
  border: "1px solid var(--border)",
  borderRadius: 16,
};

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex items-center justify-center rounded-[10px] flex-shrink-0"
        style={{ width: 32, height: 32, backgroundColor: ACCENT + "1a", color: ACCENT }}
      >
        {icon}
      </span>
      <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
        {title}
      </p>
    </div>
  );
}

export default function MapPage() {
  const content = getMapContent("wrangler-2026");

  return (
    <SectionPage title="행사장 약도" icon={<MapIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 p-4" style={CARD}>
          <SectionHeader icon={<MapPinIcon size={18} />} title="행사장 위치" />
          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {content.venueName}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {content.venueAddress}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4" style={CARD}>
          <SectionHeader icon={<MapIcon size={18} />} title="지도 보기" />
          <NaverMap
            lat={content.mapLat}
            lng={content.mapLng}
            label={content.mapLabel}
            fallbackImage={content.mapImage}
          />
        </div>

        <BoothLayout
          src="/images/pamphlet/booth-layout.png"
          alt="행사 부스 배치도"
          width={1578}
          height={2600}
        />

        <div className="flex flex-col gap-3 p-4" style={CARD}>
          <SectionHeader icon={<CarIcon size={18} />} title="교통 안내" />
          <div className="flex flex-col gap-2.5">
            {content.traffic.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {row.label}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4" style={CARD}>
          <SectionHeader icon={<ParkingCircleIcon size={18} />} title="주차 안내" />
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {content.parkingNote}
          </p>
        </div>

        <div className="flex flex-col gap-3 p-4" style={CARD}>
          <SectionHeader icon={<PhoneIcon size={18} />} title="문의" />
          <div className="flex items-center gap-2.5">
            <span style={{ color: ACCENT }}>
              <PhoneIcon size={18} />
            </span>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {content.contactValue}
            </p>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
