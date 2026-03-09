import { getAllPosts, getPostBySlug, formatDate } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.frontmatter.title} | DonsNote`,
      description: post.frontmatter.description,
    };
  } catch {
    return { title: "Post | DonsNote" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* 뒤로 가기 */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          width="14"
          height="14"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        블로그 목록으로
      </Link>

      {/* 포스트 헤더 */}
      <header className="space-y-4 mb-12">
        {/* 태그 */}
        {post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 제목 */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {post.frontmatter.title}
        </h1>

        {/* 설명 */}
        {post.frontmatter.description && (
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {post.frontmatter.description}
          </p>
        )}

        {/* 날짜 */}
        {post.frontmatter.date && (
          <time
            dateTime={post.frontmatter.date}
            className="block text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {formatDate(post.frontmatter.date)}
          </time>
        )}

        {/* 구분선 */}
        <hr style={{ borderColor: "var(--border)" }} />
      </header>

      {/* 포스트 본문 */}
      <div className="prose">
        <MDXRemote source={post.content} />
      </div>

      {/* 하단 네비게이션 */}
      <div
        className="mt-16 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--accent)" }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          다른 글 보기
        </Link>
      </div>
    </div>
  );
}
