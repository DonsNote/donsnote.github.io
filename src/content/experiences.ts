export interface Experience {
  type: "work" | "education" | "freelance";
  title: string;        // 역할/과정명
  organization: string; // 회사/기관명
  period: string;       // 예: "2023.03 - 2024.02"
  description?: string;
  tags?: string[];
  url?: string;
}

export const experiences: Experience[] = [
  // ── 직장/인턴십 ─────────────────────────────────────
  // {
  //   type: "work",
  //   title: "직책",
  //   organization: "회사명",
  //   period: "YYYY.MM - YYYY.MM",
  //   description: "업무 내용",
  //   tags: ["태그"],
  // },

  // ── 교육 ─────────────────────────────────────────────
  // {
  //   type: "education",
  //   title: "전공명",
  //   organization: "학교명",
  //   period: "YYYY.MM - YYYY.MM",
  //   description: "설명",
  // },

  // ── 프리랜서 ─────────────────────────────────────────
  // {
  //   type: "freelance",
  //   title: "프리랜서 개발자",
  //   organization: "프리랜서",
  //   period: "YYYY.MM - 현재",
  //   description: "업무 내용",
  //   tags: ["태그"],
  // },
];
