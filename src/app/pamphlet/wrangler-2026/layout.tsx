import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 전국 정모 | Wrangler Mania",
  description: "지프 랭글러 오너 모임 랭매(Wrangler Mania) 2026 전국 정모 온라인 팜플렛입니다.",
};

export default function PamphletLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: "var(--bg-tertiary)" }}>
      <div className="w-full max-w-md min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {children}
      </div>
    </div>
  );
}
