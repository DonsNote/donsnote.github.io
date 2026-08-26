import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";

export const metadata: Metadata = { title: "행사장 약도 | 2026 전국 정모" };

export default function MapPage() {
  return <SectionPage title="행사장 약도" emoji="🗺️" homeHref="/pamphlet/wrangler-2026" />;
}
