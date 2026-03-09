# DonsNote

개인 블로그 & 포트폴리오 사이트. 부트캠프 학습 기록, 프로젝트 전시, 경력 경험을 정리한 정적 웹사이트입니다.

**배포 주소**: [donsnote.github.io](https://donsnote.github.io)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| UI 라이브러리 | React 19 |
| 언어 | TypeScript 5 |
| 스타일링 | Tailwind CSS v4, CSS Custom Properties |
| 마크다운 | gray-matter, react-markdown, rehype-raw |
| 검색 | Fuse.js (퍼지 검색) |
| 배포 | GitHub Pages (정적 내보내기) |

---

## 프로젝트 구조

```
donsnote.github.io/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx            # 홈 (프로필, 타임라인, 기술 스택)
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── globals.css         # 글로벌 스타일 & 다크 테마 변수
│   │   ├── blog/               # 블로그 목록 페이지
│   │   ├── projects/           # 프로젝트 갤러리 페이지
│   │   ├── bootcamp/           # 부트캠프 목록 + 상세 ([id])
│   │   └── experience/         # 경력/경험 페이지
│   │
│   ├── components/             # React 컴포넌트
│   │   ├── layout/             # Header, Footer
│   │   ├── blog/               # PostCard, BlogModal
│   │   ├── projects/           # ProjectCard
│   │   ├── experience/         # ExperienceCard
│   │   ├── bootcamp/           # BootcampCard, LectureModal
│   │   └── search/             # SearchBox, HeaderSearch
│   │
│   ├── content/                # 데이터 & 마크다운 콘텐츠
│   │   ├── projects.ts         # 프로젝트 데이터
│   │   ├── experiences.ts      # 경력 데이터
│   │   ├── bootcamps.ts        # 부트캠프 메타데이터
│   │   ├── blog/               # 블로그 마크다운 (.md)
│   │   ├── bootcamp/           # 부트캠프별 강의 콘텐츠
│   │   │   ├── Apple/          # Apple Developer Academy (13개)
│   │   │   ├── 42/             # 42 Seoul (11개 과제)
│   │   │   └── Goorm/          # Goorm Deep Dive (34개 강의)
│   │   ├── experience/         # 경험 콘텐츠 (Jobs, Edu, Freelancer)
│   │   └── skills/             # 기술 콘텐츠 (Language, Tools, Domain)
│   │
│   └── lib/
│       ├── mdx.ts              # 마크다운 파싱 유틸리티
│       └── search.ts           # 검색 타입 정의
│
├── public/                     # 정적 자산 (이미지, 파일, SVG)
├── out/                        # 빌드 출력 (GitHub Pages 배포)
├── next.config.ts              # Next.js 설정
├── tsconfig.json               # TypeScript 설정
└── package.json
```

---

## 주요 기능

### 블로그
- 마크다운 파일 기반 포스트 관리
- frontmatter로 메타데이터(제목, 날짜, 태그) 관리
- 모달 팝업으로 콘텐츠 표시
- ESC / 외부 클릭으로 닫기

### 부트캠프 기록
동적 라우팅(`/bootcamp/[id]`)으로 부트캠프별 강의 목록과 상세 내용을 분리해서 관리합니다.

| 부트캠프 | 기간 | 강의 수 |
|---------|------|---------|
| Apple Developer Academy @ POSTECH | 2023.03 ~ 2024.02 | 13개 |
| 42 Seoul | 2024 ~ 2025 | 11개 과제 |
| Goorm Deep Dive (PM) | 2025 ~ 2026 | 34개 (5개 그룹) |

Goorm 강의 그룹 구성:
- 고객 분석 (7개)
- UI/UX 디자인 (8개)
- 기술 인사이트 (5개)
- 데이터 분석 (10개)
- 기타 (4개)

### 검색
- Fuse.js 퍼지 검색으로 모든 콘텐츠 통합 검색
- 가중치 기반 랭킹: 제목(0.6) > 설명(0.3) > 태그(0.1)
- 최대 6개 결과 드롭다운 표시

### 반응형 & 테마
- Tailwind CSS 반응형 레이아웃 (모바일 메뉴 포함)
- CSS Custom Properties 기반 다크 테마

---

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

---

## 빌드 & 배포

```bash
# 정적 빌드 (out/ 디렉토리 생성)
npm run build
```

`next.config.ts`에서 `output: "export"` 설정으로 정적 HTML로 내보냅니다. 빌드 결과물(`out/`)을 GitHub Pages에 배포합니다.

---

## 콘텐츠 추가 방법

### 블로그 글 추가
`src/content/blog/` 에 `.md` 파일 추가:

```markdown
---
title: 글 제목
date: YYYY-MM-DD
description: 짧은 설명
tags: [tag1, tag2]
---

본문 내용...
```

### 부트캠프 강의 추가
1. `src/content/bootcamp/{부트캠프명}/` 에 `.md` 파일 추가
2. `src/content/bootcamps.ts` 의 `courses` 또는 `groups` 배열에 메타데이터 등록

### 프로젝트 추가
`src/content/projects.ts` 에 항목 추가:

```typescript
{
  title: "프로젝트명",
  description: "설명",
  tags: ["tag1", "tag2"],
  githubUrl: "https://github.com/...",
  siteUrl: "https://...",
  status: "active" | "archived" | "wip"
}
```
