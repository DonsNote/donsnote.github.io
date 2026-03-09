import Image from "next/image";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "C",
  "C++",
  "Git",
  "PM",
  "HR",
  "HRD",
  "Accounting",
];

const history = [
  { period: "2019 —", title: "Aesopos Inc.", sub: "CEO", type: "work" },
  { period: "2025 — 2026", title: "Goorm Deep Dive", sub: "Product Management · 8기", type: "bootcamp" },
  { period: "2024 — 2025", title: "42", sub: "소프트웨어 교육 과정", type: "bootcamp" },
  { period: "2023", title: "Apple Developer Academy @ POSTECH", sub: "2기", type: "bootcamp" },
  { period: "2019", title: "University of Toronto OISE", sub: "lv 60", type: "education" },
];

const typeColor: Record<string, string> = {
  work:      "#a78bfa",
  bootcamp:  "#34d399",
  education: "#60a5fa",
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/donsnote",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      {/* Hero 섹션 */}
      <section className="flex justify-center">
        <Image
          src="/images/Donsmemo.png"
          alt="Donsmemo"
          width={320}
          height={320}
          className="rounded-2xl"
        />
      </section>

      {/* About 섹션 */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--accent)" }}>
          DonsNote&apos;s
        </h2>
        <div className="grid md:grid-cols-2 gap-6">

          {/* History */}
          <div
            className="p-6 rounded-xl space-y-4"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <ul className="space-y-3">
              {history.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: typeColor[item.type] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {item.sub} · {item.period}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div
            className="p-6 rounded-xl space-y-4"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <h3 className="font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span style={{ color: "var(--accent)" }}>⚡</span>
              기술 스택
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(167, 139, 250, 0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 연락처 / 링크 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
          Contact
        </h2>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
