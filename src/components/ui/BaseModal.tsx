"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/lib/icons";

interface BaseModalProps {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({ title, onClose, children }: BaseModalProps) {
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
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
          className="flex items-center justify-between gap-4 px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex-1 min-w-0">
            {typeof title === "string" ? (
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                {title}
              </h2>
            ) : title}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md transition-colors flex-shrink-0"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 본문 */}
        <div className="overflow-y-auto px-6 py-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
