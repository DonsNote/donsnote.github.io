export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  siteUrl?: string;
  status: "active" | "archived" | "wip";
  content?: string;
}

export const projects: Project[] = [
  {
    slug: "donsnote",
    title: "DonsNote",
    description:
      "Next.js와 TypeScript로 직접 제작한 개인 블로그 & 포트폴리오 사이트. GitHub Pages에 정적 배포.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    githubUrl: "https://github.com/donsnote/donsnote_gitpage_renewal",
    siteUrl: "https://donsnote.github.io/donsnote_gitpage_renewal",
    status: "active",
  },
];
