import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const postsDir = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const mdxPath = path.join(postsDir, `${slug}.mdx`);
  const mdPath = path.join(postsDir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      tags: data.tags ?? [],
    },
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export interface BlogItem {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  content: string;
}

function collectMdFiles(dir: string, base: string = dir): { filePath: string }[] {
  if (!fs.existsSync(dir)) return [];
  const results: { filePath: string }[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdFiles(full, base));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      results.push({ filePath: full });
    }
  }
  return results;
}

export function getAllBlogItems(): BlogItem[] {
  const files = collectMdFiles(postsDir);
  return files
    .map(({ filePath }) => {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? path.basename(filePath, path.extname(filePath)),
        description: data.description as string | undefined,
        date: data.date as string | undefined,
        tags: (data.tags as string[]) ?? [],
        content: content.trim(),
      };
    })
    .filter((item) => item.content.length > 0)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
