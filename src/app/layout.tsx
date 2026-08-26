import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DonsNote",
  description: "DonsNote의 개인 블로그 & 포트폴리오 공간입니다.",
  keywords: ["DonsNote", "blog", "portfolio", "개발", "개발자"],
  authors: [{ name: "DonsNote" }],
  openGraph: {
    title: "DonsNote",
    description: "DonsNote의 개인 블로그 & 포트폴리오 공간입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
