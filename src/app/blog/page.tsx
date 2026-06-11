import { getAllBlogItems } from "@/lib/mdx";
import BlogModal from "@/components/blog/BlogModal";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | DonsNote",
  description: "DonsNote의 블로그 — 개발 관련 글들을 모아둔 공간입니다.",
};

export default function BlogPage() {
  const items = getAllBlogItems();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <PageHeader title="Blog" subtitle={`${items.length}개의 글`} />

      {/* 포스트 목록 */}
      {items.length === 0 ? (
        <div
          className="py-20 text-center rounded-xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p className="text-lg">아직 작성된 글이 없습니다.</p>
          <p className="text-sm mt-2">곧 첫 번째 글이 올라올 예정입니다 ✍️</p>
        </div>
      ) : (
        <BlogModal items={items} />
      )}
    </div>
  );
}
