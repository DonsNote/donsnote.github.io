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
const projectsDir = path.join(process.cwd(), "src/content/projects");
const bootcampDir = path.join(process.cwd(), "src/content/bootcamp");

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

// ── Projects ────────────────────────────────────────────────────────────────

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  siteUrl?: string;
  status: "active" | "archived" | "wip";
  content?: string;
}

export function getAllProjects(): ProjectItem[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(projectsDir, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? f.replace(/\.(md|mdx)$/, ""),
        description: (data.description as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        githubUrl: data.githubUrl as string | undefined,
        siteUrl: data.siteUrl as string | undefined,
        status: ((data.status as string) ?? "active") as ProjectItem["status"],
        _order: (data.order as number) ?? 999,
        content: content.trim() || undefined,
      };
    })
    .sort((a: any, b: any) => a._order - b._order)
    .map(({ _order: _, ...p }) => p);
}

// ── Bootcamp ─────────────────────────────────────────────────────────────────

export interface LectureItem {
  title: string;
  description?: string;
  content: string | null;
}

export interface GroupItem {
  name: string;
  lectures: LectureItem[];
}

export interface BootcampItem {
  id: string;
  name: string;
  period: string;
  description: string;
  tags: string[];
  url?: string;
  color: string;
  courses?: LectureItem[];
  groups?: GroupItem[];
}

function numericSort(a: string, b: string): number {
  const na = parseInt(a.match(/\d+/)?.[0] ?? "0");
  const nb = parseInt(b.match(/\d+/)?.[0] ?? "0");
  return na !== nb ? na - nb : a.localeCompare(b);
}

function readLecturesFromDir(dir: string): (LectureItem & { group?: string; order: number; fileName: string })[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? f.replace(/\.(md|mdx)$/, ""),
        description: data.description as string | undefined,
        group: data.group as string | undefined,
        order: (data.order as number) ?? -1,
        content: content.trim() || null,
        fileName: f,
      };
    })
    .sort((a, b) =>
      a.order >= 0 && b.order >= 0
        ? a.order - b.order
        : numericSort(a.fileName, b.fileName)
    );
}

export function getAllBootcamps(): BootcampItem[] {
  if (!fs.existsSync(bootcampDir)) return [];

  const results: (BootcampItem & { order: number })[] = [];

  for (const entry of fs.readdirSync(bootcampDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dirName = entry.name;
    const dirPath = path.join(bootcampDir, dirName);

    // 루트 md 파일 탐색 (예: Apple/Apple.md)
    const rootFile = fs.readdirSync(dirPath).find(
      (f) =>
        !fs.statSync(path.join(dirPath, f)).isDirectory() &&
        (f.endsWith(".md") || f.endsWith(".mdx")) &&
        f.toLowerCase() === `${dirName.toLowerCase()}.md`
    );
    if (!rootFile) continue;

    const { data: root } = matter(fs.readFileSync(path.join(dirPath, rootFile), "utf-8"));

    // 서브 디렉토리에서 강의 수집
    const allLectures: (LectureItem & { group?: string; order: number; fileName: string; subDir: string })[] = [];
    for (const sub of fs.readdirSync(dirPath, { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      const lectures = readLecturesFromDir(path.join(dirPath, sub.name)).map((l) => ({
        ...l,
        subDir: sub.name,
      }));
      allLectures.push(...lectures);
    }

    const hasGroups = allLectures.some((l) => l.group);

    let courses: LectureItem[] | undefined;
    let groups: GroupItem[] | undefined;

    if (hasGroups) {
      const groupMap = new Map<string, { lectures: LectureItem[]; subDir: string }>();
      for (const l of allLectures) {
        const key = l.group ?? "기타";
        if (!groupMap.has(key)) groupMap.set(key, { lectures: [], subDir: l.subDir });
        groupMap.get(key)!.lectures.push({ title: l.title, description: l.description, content: l.content });
      }
      groups = Array.from(groupMap.entries())
        .sort(([, a], [, b]) => a.subDir.localeCompare(b.subDir))
        .map(([name, { lectures }]) => ({ name, lectures }));
    } else {
      allLectures.sort((a, b) =>
        a.subDir !== b.subDir
          ? a.subDir.localeCompare(b.subDir)
          : a.order >= 0 && b.order >= 0
          ? a.order - b.order
          : numericSort(a.fileName, b.fileName)
      );
      courses = allLectures.map((l) => ({ title: l.title, description: l.description, content: l.content }));
    }

    results.push({
      id: (root.id as string) ?? dirName.toLowerCase(),
      name: (root.title as string) ?? dirName,
      period: (root.period as string) ?? "",
      description: (root.description as string) ?? "",
      tags: (root.tags as string[]) ?? [],
      url: root.url as string | undefined,
      color: (root.color as string) ?? "#a78bfa",
      courses,
      groups,
      order: (root.order as number) ?? 999,
    });
  }

  return results.sort((a, b) => a.order - b.order).map(({ order: _, ...c }) => c);
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
