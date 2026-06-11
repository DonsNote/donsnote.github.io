"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import BaseModal from "@/components/ui/BaseModal";
import { formatDate } from "@/lib/format";
import { markdownComponents } from "@/lib/markdownComponents";
import { ChevronRightIcon } from "@/lib/icons";

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

export default function BlogModal({ items }: { items: BlogItem[] }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <>
      <div className="space-y-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setModal({ title: item.title, content: item.content })}
            className="w-full text-left flex items-stretch rounded-xl overflow-hidden transition-all group"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div className="w-1 flex-shrink-0" style={{ backgroundColor: "var(--accent)" }} />
            <div className="flex-1 p-6 space-y-2">
              {(item.date || (item.tags && item.tags.length > 0)) && (
                <div className="flex items-center gap-3 flex-wrap">
                  {item.date && (
                    <time className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {formatDate(item.date)}
                    </time>
                  )}
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ backgroundColor: "rgba(167,139,250,0.1)", color: "var(--accent)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2
                className="text-lg font-semibold leading-snug group-hover:text-[var(--accent)]"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h2>
              {item.description && (
                <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
                읽기 <ChevronRightIcon />
              </span>
            </div>
          </button>
        ))}
      </div>

      {modal && (
        <BaseModal title={modal.title} onClose={() => setModal(null)}>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {modal.content}
            </ReactMarkdown>
          </div>
        </BaseModal>
      )}
    </>
  );
}
