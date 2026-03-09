"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { SearchItem } from "@/lib/search";

interface SearchBoxProps {
  items: SearchItem[];
}

export default function SearchBox({ items }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(items, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    })
  );

  useEffect(() => {
    fuse.current = new Fuse(items, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.4,
    });
  }, [items]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const fuseResults = fuse.current.search(query);
    setResults(fuseResults.map((r) => r.item));
  }, [query]);

  // 페이지 진입 시 자동 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const typeLabel = { post: "블로그", project: "프로젝트" };
  const typeColor = {
    post: "var(--accent)",
    project: "#10b981",
  };

  return (
    <div className="space-y-6">
      {/* 검색 입력 */}
      <div className="relative">
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--text-muted)" }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base outline-none transition-all"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "var(--text-muted)" }}
            aria-label="검색어 지우기"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 결과 */}
      {query.trim() && (
        <div className="space-y-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {results.length > 0
              ? `${results.length}개의 결과`
              : "결과가 없습니다"}
          </p>

          {results.length === 0 ? (
            <div
              className="py-12 text-center rounded-xl"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <p>
                &quot;<span style={{ color: "var(--text-secondary)" }}>{query}</span>&quot;에 대한 결과가 없습니다.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block p-5 rounded-xl transition-all group"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0"
                        style={{
                          backgroundColor: `${typeColor[item.type]}18`,
                          color: typeColor[item.type],
                        }}
                      >
                        {typeLabel[item.type]}
                      </span>
                      <div className="space-y-1 min-w-0">
                        <p
                          className="font-medium text-sm group-hover:text-[var(--accent)] transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.title}
                        </p>
                        {item.description && (
                          <p
                            className="text-xs line-clamp-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item.description}
                          </p>
                        )}
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs"
                                style={{ color: "var(--text-muted)" }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 초기 상태 안내 */}
      {!query.trim() && (
        <p className="text-sm text-center py-8" style={{ color: "var(--text-muted)" }}>
          블로그 포스트와 프로젝트를 검색할 수 있습니다.
        </p>
      )}
    </div>
  );
}
