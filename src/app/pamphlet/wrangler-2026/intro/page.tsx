import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";

export const metadata: Metadata = { title: "행사 소개 | 2026 전국 정모" };

export default function IntroPage() {
  return <SectionPage title="행사 소개" emoji="📣" homeHref="/pamphlet/wrangler-2026" />;
}
