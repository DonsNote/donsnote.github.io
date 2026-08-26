"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderSearch from "@/components/search/HeaderSearch";
import { SearchItem } from "@/lib/search";
import { GitHubIcon } from "@/lib/icons";

const navLinks = [
  { href: "/cv", label: "CV" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/bootcamp", label: "Bootcamp" },
  { href: "/club", label: "Club" },
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <GitHubIcon />
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
