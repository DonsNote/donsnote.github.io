"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface LectureItem {
  title: string;
  description?: string;
  content: string | null; // 서버에서 미리 읽어온 md 내용
}

interface LectureListProps {
  lectures: LectureItem[];
  color: string;
  groupName?: string;
}

interface ModalState {
  title: string;
  content: string;
}

// 모달 단독 컴포넌트
function Modal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  // ESC 닫기
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
            <ReactMarkdown>{state.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

// 강의 목록 + 모달 통합 컴포넌트
import { useState } from "react";

export default function LectureList({ lectures, color, groupName }: LectureListProps) {
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lectures.map((lecture, i) => {
          const hasContent = !!lecture.content;
          return (
            <button
              key={i}
              onClick={() => {
                if (hasContent) {
                  setModal({ title: lecture.title, content: lecture.content! });
                }
              }}
              className="flex items-start gap-3 p-4 rounded-xl text-left transition-all w-full"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                cursor: hasContent ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                if (hasContent) e.currentTarget.style.borderColor = color + "66";
              }}
              onMouseLeave={(e) => {
                if (hasContent) e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <span
                className="mt-0.5 text-xs font-mono font-medium flex-shrink-0 w-6 text-right"
                style={{ color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {lecture.title}
                </p>
                {lecture.description && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {lecture.description}
                  </p>
                )}
              </div>
              {hasContent && (
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {modal && <Modal state={modal} onClose={() => setModal(null)} />}
    </>
  );
}
