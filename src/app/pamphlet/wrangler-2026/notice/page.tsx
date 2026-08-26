import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";

export const metadata: Metadata = { title: "주의할 점 | 2026 전국 정모" };

export default function NoticePage() {
  return <SectionPage title="주의할 점" emoji="⚠️" homeHref="/pamphlet/wrangler-2026" />;
}
