"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface BlogItem {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  content: string;
}

interface ModalState {
  title: string;
  content: string;
}

function Modal({ state, onClose }: { state: ModalState; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* 헤더 */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {state.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="닫기"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div ref={contentRef} className="overflow-y-auto px-6 py-6 flex-1">
          <div className="prose">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{state.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogModal({ items }: { items: BlogItem[] }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <>
      <div className="space-y-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setModal({ title: item.title, content: item.content })}
            className="w-full text-left p-6 rounded-xl transition-all group"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div className="space-y-2">
              {/* 날짜 + 태그 */}
              {(item.date || (item.tags && item.tags.length > 0)) && (
                <div className="flex items-center gap-3 flex-wrap">
                  {item.date && (
                    <time className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {new Date(item.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: "rgba(167, 139, 250, 0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 제목 */}
              <h2
                className="text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--accent)]"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h2>

              {/* 설명 */}
              {item.description && (
                <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              )}

              <span
                className="inline-flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                읽기
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                  <path
                    fillRule="evenodd"
                    d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {modal && <Modal state={modal} onClose={() => setModal(null)} />}
    </>
  );
}
