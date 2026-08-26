import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";

export const metadata: Metadata = { title: "행사 일정 | 2026 전국 정모" };

export default function SchedulePage() {
  return <SectionPage title="행사 일정" emoji="🗓️" homeHref="/pamphlet/wrangler-2026" />;
}
