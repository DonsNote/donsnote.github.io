"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderSearch from "@/components/search/HeaderSearch";
import { SearchItem } from "@/lib/search";

const navLinks = [
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/bootcamp", label: "Bootcamp" },
  { href: "/blog", label: "Blog" },
];

interface HeaderProps {
  searchItems: SearchItem[];
}

export default function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
      }}
      className="sticky top-0 z-50"
    >
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* 왼쪽: 로고 + 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight transition-colors flex-shrink-0"
            style={{ color: "var(--accent)" }}
          >
            DonsNote
          </Link>

          {/* 데스크탑 네비게이션 */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "rgba(167, 139, 250, 0.1)"
                      : "transparent",
                    fontWeight: isActive ? "500" : "400",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor =
                        "var(--bg-tertiary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            );
            })}
          </ul>
        </div>

        {/* 데스크탑 우측: 검색 + GitHub */}
        <div className="hidden md:flex items-center gap-3">
          <HeaderSearch items={searchItems} />
          <a
            href="https://github.com/donsnote"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 rounded-md"
          style={{ color: "var(--text-secondary)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 토글"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <ul className="pt-3 space-y-1">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-3 py-2 rounded-md text-sm"
                    style={{
                      color: isActive
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                      backgroundColor: isActive
                        ? "rgba(167, 139, 250, 0.1)"
                        : "transparent",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="https://github.com/donsnote"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
