"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BaseModal from "@/components/ui/BaseModal";
import { ChevronSmallIcon } from "@/lib/icons";
import { markdownComponents } from "@/lib/markdownComponents";

interface LectureItem {
  title: string;
  description?: string;
  content: string | null;
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

export default function LectureList({ lectures, color }: LectureListProps) {
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
                if (hasContent) setModal({ title: lecture.title, content: lecture.content! });
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
                <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }}>
                  <ChevronSmallIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {modal && (
        <BaseModal title={modal.title} onClose={() => setModal(null)}>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{modal.content}</ReactMarkdown>
          </div>
        </BaseModal>
      )}
    </>
  );
}
