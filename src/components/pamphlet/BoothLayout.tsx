"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LayoutGridIcon, XIcon } from "@/components/pamphlet/icons";

const ACCENT = "#fb923c";

interface BoothLayoutProps {
  src: string;
  alt: string;
  /** 원본 이미지 픽셀 크기 */
  width: number;
  height: number;
}

export default function BoothLayout({ src, alt, width, height }: BoothLayoutProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-3 w-full p-4"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: 16,
        }}
      >
        <span className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center rounded-[10px] flex-shrink-0"
            style={{ width: 32, height: 32, backgroundColor: ACCENT + "1a", color: ACCENT }}
          >
            <LayoutGridIcon size={16} />
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            행사 부스 배치도 보기
          </span>
        </span>
        <span style={{ color: ACCENT }}>›</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="배치도 닫기"
            className="absolute top-4 left-4 z-10 flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(22,27,34,0.9)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              backdropFilter: "blur(6px)",
            }}
          >
            <XIcon size={20} />
          </button>

          <div
            className="flex-1 overflow-auto px-3 pb-4 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-auto max-w-[820px] mx-auto rounded-lg"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
