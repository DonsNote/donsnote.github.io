"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { XIcon } from "@/components/pamphlet/icons";

const ACCENT = "#fb923c";

interface BoothLayoutProps {
  src: string;
  rainSrc: string;
  alt: string;
  rainAlt: string;
  /** 원본 이미지 픽셀 크기 */
  width: number;
  height: number;
}

export default function BoothLayout({ src, rainSrc, alt, rainAlt, width, height }: BoothLayoutProps) {
  const [open, setOpen] = useState(false);
  const [rain, setRain] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const currentSrc = rain ? rainSrc : src;
  const currentAlt = rain ? rainAlt : alt;

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
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => setRain((v) => !v)}
            aria-pressed={rain}
            className="flex items-center gap-1.5 rounded-full text-xs font-semibold"
            style={{
              padding: "6px 12px",
              backgroundColor: rain ? ACCENT : "var(--bg-secondary)",
              border: `1px solid ${rain ? ACCENT : "var(--border)"}`,
              color: rain ? "#161b22" : "var(--text-primary)",
            }}
          >
            ☔ 우천시
          </button>
        </div>

        <button type="button" onClick={() => setOpen(true)} className="block w-full" aria-label={`${currentAlt} 확대 보기`}>
          <Image
            src={currentSrc}
            alt={currentAlt}
            width={width}
            height={height}
            className="w-full h-auto rounded-2xl"
            style={{ border: "1px solid var(--border)" }}
          />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentAlt}
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setRain((v) => !v);
            }}
            aria-pressed={rain}
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full text-xs font-semibold"
            style={{
              padding: "8px 14px",
              backgroundColor: rain ? ACCENT : "rgba(22,27,34,0.9)",
              border: `1px solid ${rain ? ACCENT : "var(--border)"}`,
              color: rain ? "#161b22" : "var(--text-primary)",
              backdropFilter: "blur(6px)",
            }}
          >
            ☔ 우천시
          </button>

          <div className="flex-1 overflow-auto px-3 pb-4 pt-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentSrc}
              alt={currentAlt}
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
