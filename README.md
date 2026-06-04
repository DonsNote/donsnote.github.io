# DonsNote

개인 블로그 & 포트폴리오 사이트. 부트캠프 학습 기록, 프로젝트 전시, 경력 경험을 정리한 정적 웹사이트입니다.

**배포 주소**: [donsnote.github.io](https://donsnote.github.io)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.1.6 (App Router) |
| UI 라이브러리 | React 19 |
| 언어 | TypeScript 5 |
| 스타일링 | Tailwind CSS v4, CSS Custom Properties |
| 마크다운 | gray-matter, react-markdown, rehype-raw, remark-gfm |
| MDX | next-mdx-remote |
| 테마 | next-themes |
| 검색 | Fuse.js (퍼지 검색) |
| 배포 | GitHub Pages (정적 내보내기) + GitHub Actions |

---

## 프로젝트 구조

```
donsnote.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD (main 푸시 시 자동 배포)
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx            # 홈 (프로필, 타임라인, 기술 스택)
│   │   ├── layout.tsx          # 루트 레이아웃 (헤더 검색 데이터 주입)
│   │   ├── globals.css         # 글로벌 스타일 & 다크 테마 변수
│   │   ├── blog/               # 블로그 목록 페이지
│   │   ├── projects/           # 프로젝트 갤러리 페이지
│   │   ├── bootcamp/           # 부트캠프 목록 + 상세 ([id])
│   │   └── experience/         # 경력/경험 페이지
│   │
│   ├── components/             # React 컴포넌트
│   │   ├── layout/             # Header, Footer
│   │   ├── blog/               # PostCard, BlogModal
│   │   ├── projects/           # ProjectCard, ProjectModal
│   │   ├── experience/         # ExperienceCard
│   │   ├── bootcamp/           # BootcampCard, LectureModal
│   │   └── search/             # SearchBox, HeaderSearch
│   │
│   ├── content/                # 데이터 & 마크다운 콘텐츠
│   │   ├── projects.ts         # 검색용 프로젝트 정적 데이터 (layout.tsx에서 사용)
│   │   ├── experiences.ts      # 경력 데이터 (experience 페이지용)
│   │   ├── bootcamps.ts        # (미사용) 레거시 부트캠프 메타데이터
│   │   ├── blog/               # 블로그 마크다운 (.md) — 파일만 추가하면 자동 등록
│   │   ├── bootcamp/           # 부트캠프별 강의 콘텐츠 — 파일만 추가하면 자동 등록
│   │   │   ├── Apple/          # Apple Developer Academy (13개 강의)
│   │   │   │   ├── Apple.md    # 부트캠프 루트 메타데이터
│   │   │   │   └── Courses/    # 강의 마크다운 파일들
│   │   │   ├── Goorm/          # Goorm Deep Dive (37개 강의, 6개 그룹)
│   │   │   │   ├── Goorm.md    # 부트캠프 루트 메타데이터 (group_order 정의)
│   │   │   │   ├── projects/   # 프로젝트 기록 (group: Projects)
│   │   │   │   ├── ca/         # 고객분석 (7개)
│   │   │   │   ├── uiux/       # UI/UX 디자인 (8개)
│   │   │   │   ├── ti/         # 기술 인사이트 (5개)
│   │   │   │   ├── da/         # 데이터 분석 (10개)
│   │   │   │   └── st/         # 전략적 사고 (4개)
│   │   │   └── 42/             # 42 Seoul (11개 과제)
│   │   │       ├── 42.md       # 부트캠프 루트 메타데이터
│   │   │       └── Assignment/ # 과제 마크다운 파일들
│   │   ├── experience/         # 경험 콘텐츠
│   │   │   ├── Exp.md          # 경험 루트 파일
│   │   │   ├── Jobs/           # 직장 경력 (Jobs.md)
│   │   │   ├── Edu/            # 학력 (Edu.md)
│   │   │   └── Freelancer/     # 프리랜서 (Freelancer.md)
│   │   ├── projects/           # 프로젝트 상세 마크다운 (.md)
│   │   └── skills/             # 기술 콘텐츠
│   │       ├── Skills.md       # 기술 루트 파일
│   │       ├── Language/       # 언어 스킬 (Language.md)
│   │       ├── Tools/          # 도구 스킬 (Tools.md)
│   │       └── Domain/         # 도메인 스킬 (Domain.md)
│   │
│   └── lib/
│       ├── mdx.ts              # 마크다운 파싱 & 부트캠프 동적 로딩 핵심 유틸
│       └── search.ts           # 검색 타입 정의 (SearchItem: post | project)
│
├── public/                     # 정적 자산
│   ├── files/                  # PDF 자료 (강의 과제물 등)
│   └── images/
│       ├── blog/               # 블로그 포스트 이미지
│       ├── experience/         # 경험 섹션 이미지
│       └── projects/           # 프로젝트 이미지
├── next.config.ts              # Next.js 설정 (output: "export")
├── postcss.config.mjs          # PostCSS 설정 (Tailwind v4)
├── tsconfig.json               # TypeScript 설정
└── package.json
```

---

## 주요 기능

### 블로그
- 마크다운 파일 기반 포스트 관리
- frontmatter로 메타데이터(제목, 날짜, 태그, draft) 관리
- 모달 팝업으로 콘텐츠 표시
- ESC / 외부 클릭으로 닫기

### 프로젝트 갤러리
- 마크다운 파일 기반 프로젝트 카드 관리
- `status` 필드로 상태 표시: `active`(운영 중) / `wip`(개발 중) / `archived`(보관)
- 카드 클릭 시 모달로 상세 내용 표시 (GitHub 링크, 사이트 링크 포함)

### 부트캠프 기록

동적 라우팅(`/bootcamp/[id]`)으로 부트캠프별 강의 목록과 상세 내용을 관리합니다.

**핵심: `src/lib/mdx.ts`의 `getAllBootcamps()`가 파일시스템을 직접 읽어 자동으로 카드를 생성합니다. 별도 TS 파일 수정 없이 마크다운 파일 추가만으로 카드가 생성됩니다.**

#### 부트캠프별 구성

| 부트캠프 | 기간 | 모드 | 총 강의 |
|---------|------|------|---------|
| Apple Developer Academy @ POSTECH | 2023 - 2024 | 단순 목록 | 13개 |
| 42 Seoul | 2024 - 2025 | 단순 목록 | 11개 |
| Goorm Deep Dive (PM) | 2025 - 2026 | 그룹 목록 | 37개 (6개 그룹) |

#### Goorm 그룹 구성 (group_order 순)

| 그룹명 | 디렉토리 | 강의 수 |
|--------|---------|---------|
| Projects | `projects/` | 3개 (semi, semi1w, team) |
| 고객분석 | `ca/` | 7개 |
| UI/UX 디자인 | `uiux/` | 8개 |
| 기술 인사이트 | `ti/` | 5개 |
| 데이터 분석 | `da/` | 10개 |
| 전략적 사고 | `st/` | 4개 |

#### 부트캠프 동적 로딩 메커니즘

`getAllBootcamps()`의 처리 흐름:

1. `src/content/bootcamp/` 하위 디렉토리를 순회
2. 각 디렉토리에서 동명의 루트 `.md` 파일 탐색 (예: `Goorm/Goorm.md`)
3. 루트 파일의 frontmatter에서 메타데이터 추출 (`id`, `title`, `color`, `group_order` 등)
4. 모든 서브 디렉토리의 `.md` 파일을 수집
5. 강의 파일에 `group` frontmatter가 있으면 → **그룹 모드** (Goorm), 없으면 → **단순 목록 모드** (Apple, 42)
6. `group_order`로 그룹 순서 결정, 미등록 그룹은 알파벳순 마지막에 배치

### 검색
- Fuse.js 퍼지 검색으로 프로젝트 콘텐츠 검색
- 가중치 기반 랭킹: 제목(0.6) > 설명(0.3) > 태그(0.1)
- 최대 6개 결과 드롭다운 표시 (검색 유형: `project`)

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

### CI/CD (GitHub Actions)

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 실행됩니다:

1. Node.js 20 환경 설정
2. `npm ci`로 의존성 설치
3. `npm run build`로 정적 빌드
4. `out/` 디렉토리를 GitHub Pages에 배포

`workflow_dispatch`로 수동 트리거도 가능합니다.

---

## 콘텐츠 추가 방법

### 블로그 글 추가

`src/content/blog/`에 `.md` 파일 추가 (빌드 시 자동 등록):

```markdown
---
title: 글 제목
date: YYYY-MM-DD
description: 짧은 설명
tags: [tag1, tag2]
draft: false
---

본문 내용...
```

`draft: true`로 설정하면 빌드에서 제외됩니다.

### 부트캠프 강의/카드 추가

**TS 파일 수정 없이 마크다운 파일만 추가하면 됩니다.**

#### 기존 그룹에 강의 추가 (예: Goorm 고객분석)

`src/content/bootcamp/Goorm/ca/` 에 `.md` 파일 추가:

```markdown
---
title: 강의 제목
description: 강의 설명
group: 고객분석
---

강의 내용...
```

#### 새 그룹 만들기 (예: Goorm에 Projects 그룹 추가)

1. 새 서브 디렉토리 생성: `src/content/bootcamp/Goorm/projects/`
2. `.md` 파일 추가 (frontmatter에 `group: 그룹이름` 지정):
   ```markdown
   ---
   title: 프로젝트명
   description: 설명
   group: Projects
   ---
   ```
3. 그룹 순서를 제어하려면 `Goorm/Goorm.md`의 `group_order`에 그룹명 추가:
   ```markdown
   group_order: [Projects, 고객분석, UI/UX 디자인, ...]
   ```

#### 새 부트캠프 추가

1. `src/content/bootcamp/{부트캠프명}/` 디렉토리 생성
2. 루트 메타데이터 파일 생성 (`{부트캠프명}/{부트캠프명}.md`):
   ```markdown
   ---
   title: 부트캠프 이름
   id: bootcamp-id
   period: 2024 - 2025
   description: 부트캠프 설명
   tags: [tag1, tag2]
   url: https://example.com
   color: "#a78bfa"
   order: 4
   ---
   ```
3. 서브 디렉토리에 강의 `.md` 파일 추가

### 프로젝트 갤러리 추가

`src/content/projects/`에 `.md` 파일 추가 (frontmatter로 메타데이터 관리):

```markdown
---
title: 프로젝트명
description: 설명
tags: [tag1, tag2]
githubUrl: https://github.com/...
siteUrl: https://...
status: active
order: 1
---

프로젝트 상세 내용 (선택사항)...
```

`status` 값: `active`(운영 중) | `wip`(개발 중) | `archived`(보관)  
`order` 값: 낮을수록 먼저 표시 (미지정 시 999)
