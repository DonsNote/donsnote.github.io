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
| 검색 | Fuse.js (퍼지 검색) |
| 배포 | GitHub Pages (정적 내보내기) + GitHub Actions |

---

## 프로젝트 구조

```
donsnote.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD (main 푸시 시 자동 배포)
├── src/
│   ├── app/                        # Next.js App Router 페이지
│   │   ├── page.tsx                # 홈 (프로필, MBTI, Now)
│   │   ├── layout.tsx              # 루트 레이아웃 (검색 데이터 주입)
│   │   ├── globals.css             # 글로벌 스타일 & 다크 테마 변수
│   │   ├── blog/                   # 블로그 목록 페이지
│   │   ├── portfolio/              # 포트폴리오 갤러리 페이지
│   │   ├── bootcamp/               # 부트캠프 목록 + 상세 ([id])
│   │   └── cv/                     # CV / 이력서 페이지
│   │
│   ├── components/                 # React 컴포넌트
│   │   ├── layout/                 # Header, Footer
│   │   ├── ui/                     # 공유 컴포넌트 (BaseModal, PageHeader)
│   │   ├── blog/                   # BlogModal
│   │   ├── portfolio/              # ProjectModal
│   │   ├── bootcamp/               # BootcampCard, LectureModal
│   │   ├── cv/                     # PrintButton
│   │   └── search/                 # SearchBox, HeaderSearch
│   │
│   ├── content/                    # 마크다운 콘텐츠 (파일만 추가하면 자동 등록)
│   │   ├── blog/                   # 블로그 포스트 (.md)
│   │   ├── portfolio/              # 포트폴리오 항목 (.md)
│   │   ├── bootcamp/               # 부트캠프별 강의 콘텐츠
│   │   │   ├── 42/                 # 42 Seoul (11개 과제)
│   │   │   │   ├── 42.md           # 부트캠프 루트 메타데이터
│   │   │   │   └── Assignment/     # 과제 마크다운 파일들
│   │   │   ├── Apple/              # Apple Developer Academy (13개 강의)
│   │   │   │   ├── Apple.md
│   │   │   │   └── Courses/
│   │   │   └── Goorm/              # Goorm Deep Dive (37개 강의, 6개 그룹)
│   │   │       ├── Goorm.md        # group_order 정의
│   │   │       ├── projects/       # group: Projects (3개)
│   │   │       ├── ca/             # group: 고객분석 (7개)
│   │   │       ├── uiux/           # group: UI/UX 디자인 (8개)
│   │   │       ├── ti/             # group: 기술 인사이트 (5개)
│   │   │       ├── da/             # group: 데이터 분석 (10개)
│   │   │       └── st/             # group: 전략적 사고 (4개)
│   │   ├── experience/             # 경험 콘텐츠 (Jobs, Edu, Freelancer)
│   │   └── skills/                 # 기술 스택 콘텐츠
│   │
│   └── lib/
│       ├── mdx.ts                  # 마크다운 파싱 & 부트캠프 동적 로딩 핵심 유틸
│       ├── search.ts               # 검색 타입 정의
│       ├── profile.ts              # 홈 페이지용 프로필 데이터
│       ├── cv-data.ts              # CV 페이지 상세 데이터
│       ├── format.ts               # 날짜 포맷 유틸
│       ├── icons.tsx               # 공유 SVG 아이콘 모듈
│       └── markdownComponents.tsx  # react-markdown 외부 링크 처리
│
├── public/
│   ├── files/                      # PDF 자료
│   └── images/
│       ├── blog/                   # 블로그 이미지 (WebP)
│       ├── experience/             # 경험 이미지 (WebP)
│       └── projects/               # 포트폴리오 이미지 (WebP)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Frontmatter 표준

모든 마크다운 파일은 아래 규칙을 따릅니다.

### 공통 필드 (모든 콘텐츠 타입 필수)

| 필드 | 타입 | 설명 |
|------|------|------|
| `title` | string | 콘텐츠 제목 |
| `description` | string | 짧은 설명 (없으면 `""`) |
| `date` | string | `"YYYY.MM"` 형식 (예: `"2026.04"`). 연도만 필요하면 `"YYYY"`. 불명확하면 `""` |
| `tags` | array | 태그 배열 (없으면 `[]`) |

### date 형식

```yaml
date: "2026.04"   # 연도.월 — 기본 형식
date: "2026"      # 연도만
date: ""          # 날짜 없음
```

> `YYYY-MM-DD` 형식은 사용하지 않습니다.

### 콘텐츠 타입별 추가 필드

#### 블로그 (`src/content/blog/`)

```yaml
---
title: 글 제목
description: 짧은 설명
date: "2026.04"
tags: [tag1, tag2]
draft: false
---
```

| 필드 | 값 | 설명 |
|------|-----|------|
| `draft` | `true` \| `false` | `true`이면 빌드에서 제외 (기본값 `false`) |

---

#### 포트폴리오 (`src/content/portfolio/`)

```yaml
---
title: 프로젝트명
description: 한 줄 설명
date: "2026.04"
tags: [tag1, tag2]
status: active
category: Development
githubUrl: https://github.com/...
siteUrl: https://...
order: 1
---
```

| 필드 | 값 | 설명 |
|------|-----|------|
| `status` | `active` \| `wip` \| `done` | `active` 운영 중 / `wip` 작업 중 / `done` 완료 |
| `category` | `Development` \| `Design` \| `Management` | 포트폴리오 카테고리 |
| `githubUrl` | URL 또는 `""` | GitHub 저장소 링크 |
| `siteUrl` | URL 또는 `""` | 배포/사이트 링크 |
| `order` | 숫자 | 정렬 순서 (낮을수록 먼저, 미지정 시 999) |

---

#### 부트캠프 루트 (`{부트캠프명}/{부트캠프명}.md`)

```yaml
---
title: 부트캠프 이름
description: 부트캠프 설명
date: ""
tags: [tag1, tag2]
id: bootcamp-id
period: "2024 - 2025"
url: https://official-site.com
color: "#a78bfa"
order: 1
group_order: [그룹A, 그룹B]   # 그룹 모드일 때만
---
```

| 필드 | 값 | 설명 |
|------|-----|------|
| `id` | string | URL 슬러그 (예: `"42"`, `"apple"`, `"goorm"`) |
| `period` | string | 참여 기간 (예: `"2024 - 2025"`) |
| `url` | URL | 공식 사이트 |
| `color` | HEX | 카드 테마 색상 |
| `order` | 숫자 | 부트캠프 카드 정렬 순서 |
| `group_order` | array | 그룹 표시 순서 (Goorm처럼 그룹 모드일 때만) |

**color 값 참고:**

| 색상 | HEX | 사용 중 |
|------|-----|---------|
| 보라 | `"#a78bfa"` | Apple Developer Academy |
| 초록 | `"#34d399"` | Goorm Deep Dive |
| 파랑 | `"#60a5fa"` | 42 Seoul |

---

#### 부트캠프 강의/과제 (`{부트캠프명}/서브디렉토리/*.md`)

```yaml
---
title: 강의/과제 제목
description: 짧은 설명
date: ""
tags: []
group: 고객분석   # 그룹 모드(Goorm)일 때만
order: 1         # 정렬이 필요할 때만
---
```

| 필드 | 값 | 설명 |
|------|-----|------|
| `group` | string | 그룹 이름 (Goorm 전용, 미지정 시 단순 목록 모드) |
| `order` | 숫자 | 강의 순서 (미지정 시 파일명 숫자순) |

> `group` 필드가 하나라도 있으면 해당 부트캠프는 **그룹 모드**로 렌더링됩니다.

---

## 주요 기능

### 블로그
- 마크다운 파일 기반 포스트 관리 (`draft: true`로 숨김 가능)
- 모달 팝업으로 콘텐츠 표시 (ESC / 외부 클릭으로 닫기)

### 포트폴리오
- Management / Development / Design 카테고리별 분류
- 카드 클릭 시 모달로 상세 내용 표시

### 부트캠프 기록

**핵심: `getAllBootcamps()`가 파일시스템을 직접 읽어 자동으로 카드를 생성합니다. TS 파일 수정 없이 마크다운 파일 추가만으로 카드가 생성됩니다.**

`group` frontmatter가 있으면 → **그룹 모드** (Goorm), 없으면 → **단순 목록 모드** (Apple, 42)

### CV
- 경력·학력·부트캠프·기술 스택 통합 이력서 페이지
- 인쇄 버튼으로 PDF 저장 가능 (`@media print` 스타일 적용)

### 검색
- Fuse.js 퍼지 검색: **블로그 · 포트폴리오 · 부트캠프** 통합 검색
- 가중치 기반 랭킹: 제목(0.6) > 설명(0.3) > 태그(0.1)
- 최대 6개 결과 드롭다운 표시

### 반응형 & 테마
- Tailwind CSS 반응형 레이아웃 (모바일 메뉴 포함)
- CSS Custom Properties 기반 다크 테마

---

## 개발 환경 설정

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

---

## 빌드 & 배포

```bash
npm run build
```

`next.config.ts`에서 `output: "export"` 설정으로 정적 HTML로 내보냅니다.

### CI/CD (GitHub Actions)

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 실행됩니다.

---

## 콘텐츠 추가 방법

### 블로그 글 추가

`src/content/blog/`에 `.md` 파일 추가:

```markdown
---
title: 글 제목
description: 짧은 설명
date: "2026.04"
tags: [tag1, tag2]
draft: false
---

본문 내용...
```

### 포트폴리오 항목 추가

`src/content/portfolio/`에 `.md` 파일 추가:

```markdown
---
title: 프로젝트명
description: 설명
date: "2026.04"
tags: [tag1, tag2]
status: active
category: Development
githubUrl: https://github.com/...
siteUrl: https://...
order: 1
---

상세 내용 (선택사항)...
```

### 부트캠프 강의 추가

기존 그룹에 추가 (예: Goorm 고객분석):

```markdown
---
title: 강의 제목
description: 강의 설명
date: ""
tags: []
group: 고객분석
---

강의 내용...
```

### 새 부트캠프 추가

1. `src/content/bootcamp/{이름}/` 디렉토리 생성
2. 루트 메타데이터 파일 생성 (`{이름}/{이름}.md`):
   ```markdown
   ---
   title: 부트캠프 이름
   description: 설명
   date: ""
   tags: [tag1, tag2]
   id: bootcamp-id
   period: "2024 - 2025"
   url: https://example.com
   color: "#a78bfa"
   order: 4
   ---
   ```
3. 서브 디렉토리에 강의 `.md` 파일 추가
