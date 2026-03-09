import Link from "next/link";
import { PostFrontmatter } from "@/lib/mdx";
import { formatDate } from "@/lib/mdx";

interface PostCardProps {
  slug: string;
  frontmatter: PostFrontmatter;
}

export default function PostCard({ slug, frontmatter }: PostCardProps) {
  return (
    <article
      className="p-6 rounded-xl transition-all group"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      <Link href={`/blog/${slug}`} className="block space-y-3">
        {/* 날짜 + 태그 */}
        <div className="flex items-center gap-3 flex-wrap">
          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {formatDate(frontmatter.date)}
            </time>
          )}
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "rgba(167, 139, 250, 0.1)",
                color: "var(--accent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h2
          className="text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--text-primary)" }}
        >
          {frontmatter.title}
        </h2>

        {/* 설명 */}
        {frontmatter.description && (
          <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {frontmatter.description}
          </p>
        )}

        {/* 읽기 링크 */}
        <span
          className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: "var(--accent)" }}
        >
          읽기
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path
              fillRule="evenodd"
              d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
            />
          </svg>
        </span>
      </Link>
    </article>
  );
}
