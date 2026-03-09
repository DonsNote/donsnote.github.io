import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/content/projects";
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
  const posts = getAllPosts();
  const searchItems: SearchItem[] = [
    ...posts.map((post) => ({
      type: "post" as const,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      tags: post.frontmatter.tags,
      href: `/blog/${post.slug}`,
    })),
    ...projects.map((project) => ({
      type: "project" as const,
      title: project.title,
      description: project.description,
      tags: project.tags,
      href: "/projects",
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
