import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";
import BoothLayout from "@/components/pamphlet/BoothLayout";
import { LayoutGridIcon } from "@/components/pamphlet/icons";

export const metadata: Metadata = { title: "행사부스 안내 | 2026 전국 정모" };

export default function BoothsPage() {
  return (
    <SectionPage title="행사부스 안내" icon={<LayoutGridIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <p className="text-[13px] mb-4" style={{ color: "var(--text-secondary)" }}>
        협력업체 부스와 정모 이벤트가 열리는 위치입니다. 이미지를 누르면 확대해서 볼 수 있어요.
      </p>
      <BoothLayout
        src="/images/pamphlet/booth-layout.png"
        rainSrc="/images/pamphlet/booth-layout-rain.png"
        alt="행사 부스 배치도"
        rainAlt="행사 부스 배치도 (우천시)"
        width={1578}
        height={2600}
      />
    </SectionPage>
  );
}
