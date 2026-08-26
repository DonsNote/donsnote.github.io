"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { SearchItem } from "@/lib/search";
import { SearchIcon, CloseIcon } from "@/lib/icons";

interface HeaderSearchProps {
  items: SearchItem[];
}

const typeLabel: Record<SearchItem["type"], string> = { post: "블로그", project: "포트폴리오", bootcamp: "부트캠프", club: "동아리" };
const typeColor: Record<SearchItem["type"], string> = { post: "var(--accent)", project: "#10b981", bootcamp: "#60a5fa", club: "#f472b6" };

export default function HeaderSearch({ items }: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(items, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.4,
    })
  );

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const res = fuse.current.search(query).map((r) => r.item);
    setResults(res);
    setOpen(true);
  }, [query]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ESC로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = () => {
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* 검색 입력 */}
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        >
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색..."
          className="w-40 focus:w-56 pl-8 pr-3 py-1.5 rounded-md text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            if (query.trim()) setOpen(true);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        />
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
            aria-label="검색어 지우기"
          >
            <CloseIcon size={12} />
          </button>
        )}
      </div>

      {/* 드롭다운 결과 */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {results.length === 0 ? (
            <div
              className="px-4 py-6 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              결과가 없습니다.
            </div>
          ) : (
            <ul>
              {results.slice(0, 6).map((item, i) => (
                <li key={item.href + i}>
                  <Link
                    href={item.href}
                    onClick={handleSelect}
                    className="flex items-start gap-3 px-4 py-3 transition-colors"
                    style={{
                      borderTop: i > 0 ? "1px solid var(--border)" : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--bg-tertiary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <span
                      className="mt-0.5 px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0"
                      style={{
                        backgroundColor: `${typeColor[item.type]}18`,
                        color: typeColor[item.type],
                      }}
                    >
                      {typeLabel[item.type]}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </p>
                      {item.description && (
                        <p
                          className="text-xs mt-0.5 truncate"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
