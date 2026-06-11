import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllProjects, getAllBlogItems, getAllBootcamps } from "@/lib/mdx";
import { SearchItem } from "@/lib/search";

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
  const searchItems: SearchItem[] = [
    ...getAllProjects().map((p) => ({
      type: "project" as const,
      title: p.title,
      description: p.description,
      tags: p.tags,
      href: "/portfolio",
    })),
    ...getAllBlogItems().map((p) => ({
      type: "post" as const,
      title: p.title,
      description: p.description ?? "",
      tags: p.tags ?? [],
      href: "/blog",
    })),
    ...getAllBootcamps().map((c) => ({
      type: "bootcamp" as const,
      title: c.name,
      description: c.description,
      tags: c.tags,
      href: `/bootcamp/${c.id}`,
    })),
  ];

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <Header searchItems={searchItems} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
