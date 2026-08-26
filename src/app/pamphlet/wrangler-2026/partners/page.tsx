import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";

export const metadata: Metadata = { title: "협력업체 소개 | 2026 전국 정모" };

export default function PartnersPage() {
  return <SectionPage title="협력업체 소개" emoji="🤝" homeHref="/pamphlet/wrangler-2026" />;
}
