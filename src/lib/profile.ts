export const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "C",
  "C++",
  "Git",
  "Ai",
  "Sh",
  "Vim",
  "PM",
  "HR",
  "HRD",
  "Accounting",
];

export interface HistoryItem {
  period: string;
  title: string;
  sub: string;
  type: "work" | "bootcamp" | "education";
}

export const history: HistoryItem[] = [
  { period: "2025 — 2026", title: "Goorm Deep Dive",                   sub: "Product Management · 8기",          type: "bootcamp"  },
  { period: "2024 — 2025", title: "42 Seoul",                          sub: "소프트웨어 교육 과정",                type: "bootcamp"  },
  { period: "2023",        title: "Apple Developer Academy @ POSTECH",  sub: "2기",                               type: "bootcamp"  },
  { period: "2019 — 2022", title: "Aesopos Inc.",                      sub: "CEO / PM",                           type: "work"      },
  { period: "2016 — 2017", title: "University of Toronto OISE",         sub: "Academic English · lv 50",          type: "education" },
];

export const typeColor: Record<HistoryItem["type"], string> = {
  work:      "#a78bfa",
  bootcamp:  "#34d399",
  education: "#60a5fa",
};
