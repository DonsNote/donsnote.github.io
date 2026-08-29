"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPinIcon } from "@/components/pamphlet/icons";

// 네이버 클라우드 플랫폼 Maps 의 Client ID (.env.local 에서 주입).
const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

// 신규(2024년 이후) 키는 `ncpKeyId`, 구버전 키는 `ncpClientId`.
// 지도가 인증 오류로 안 뜨면 .env.local 에 NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM=ncpClientId 추가.
const AUTH_PARAM = process.env.NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM || "ncpKeyId";
const SCRIPT_SRC = `https://oapi.map.naver.com/openapi/v3/maps.js?${AUTH_PARAM}=${CLIENT_ID ?? ""}`;

type NaverMapInstance = {
  destroy: () => void;
  refresh: (noEffect?: boolean) => void;
};

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (el: HTMLElement, opts: Record<string, unknown>) => NaverMapInstance;
        Marker: new (opts: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
      };
    };
    navermap_authFailure?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadNaverMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.naver?.maps) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error(`네이버 지도 스크립트 로드 실패: ${SCRIPT_SRC}`));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface NaverMapProps {
  lat: number;
  lng: number;
  label: string;
  fallbackImage: string;
}

export default function NaverMap({ lat, lng, label, fallbackImage }: NaverMapProps) {
  const mapEl = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">(
    CLIENT_ID ? "loading" : "error",
  );

  useEffect(() => {
    if (!CLIENT_ID) {
      console.warn(
        "[NaverMap] NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 가 비어 있습니다. .env.local 확인 후 dev 재시작하세요.",
      );
      return;
    }

    let cancelled = false;
    let map: NaverMapInstance | null = null;

    // 인증 실패(잘못된 키 / 미등록 도메인)는 스크립트 onload 이후 비동기로 발생.
    window.navermap_authFailure = () => {
      console.error(
        `[NaverMap] 인증 실패. 확인: (1) NCP 콘솔 > Maps > Web 서비스 URL 에 현재 주소(${window.location.origin}) 등록 여부 ` +
          `(2) 인증 파라미터 '${AUTH_PARAM}' 가 키 종류와 맞는지 (신규=ncpKeyId, 구버전=ncpClientId).`,
      );
      if (!cancelled) setStatus("error");
    };

    // authFailure 콜백조차 안 오는 경우를 대비한 타임아웃 폴백.
    const timeout = window.setTimeout(() => {
      setStatus((s) => {
        if (s === "loading") {
          console.error("[NaverMap] 지도 로딩 시간 초과 — 플레이스홀더로 대체합니다.");
          return "error";
        }
        return s;
      });
    }, 8000);

    loadNaverMaps()
      .then(() => {
        if (cancelled || !mapEl.current || !window.naver?.maps) return;
        const { naver } = window;
        // Strict Mode 재마운트 등으로 남아 있을 수 있는 이전 지도 DOM 제거.
        mapEl.current.innerHTML = "";
        const center = new naver.maps.LatLng(lat, lng);
        const instance = new naver.maps.Map(mapEl.current, {
          center,
          zoom: 15,
          scaleControl: false,
          mapDataControl: false,
        });
        map = instance;
        new naver.maps.Marker({ position: center, map: instance, title: label });
        // 컨테이너 크기 확정 뒤 강제 리프레시 (타일이 0x0 로 붙는 문제 방지).
        requestAnimationFrame(() => {
          if (!cancelled) instance.refresh(true);
        });
        if (!cancelled) {
          window.clearTimeout(timeout);
          setStatus("ok");
        }
      })
      .catch((err) => {
        console.error("[NaverMap]", err);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      if (map) {
        try {
          map.destroy();
        } catch {
          /* noop */
        }
        map = null;
      }
      if (mapEl.current) mapEl.current.innerHTML = "";
    };
  }, [lat, lng, label]);

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height: 180 }}>
      {status === "error" ? (
        <>
          <Image src={fallbackImage} alt={label} fill className="object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.25)" }} />
        </>
      ) : (
        <div
          ref={mapEl}
          className="naver-map h-full w-full"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        />
      )}
      <div
        className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-semibold pointer-events-none"
        style={{
          backgroundColor: "rgba(13,17,23,0.8)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          backdropFilter: "blur(6px)",
        }}
      >
        <MapPinIcon size={16} />
        {label}
      </div>
    </div>
  );
}
