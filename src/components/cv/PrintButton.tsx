"use client";

import { PrintIcon } from "@/lib/icons";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cv-print-hide inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text-primary)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-secondary)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <PrintIcon />
      인쇄 / PDF
    </button>
  );
}
