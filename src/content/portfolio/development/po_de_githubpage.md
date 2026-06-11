---
title: Github Page
description: Next.js & TypeScript로 직접 제작한 개인 블로그 & 포트폴리오 사이트. GitHub Pages에 정적 배포.
date: "2025"
tags: [Next.js, TypeScript, Tailwind CSS, GitHub Pages]
status: active
category: Development
githubUrl: https://github.com/donsnote/donsnote.github.io
figmaUrl: 
siteUrl: https://donsnote.github.io
order: 1
---

## 개발 배경

부트캠프 학습 기록, 경력, 포트폴리오를 한 곳에 정리할 공간이 필요했다.
기존에 노션이나 외부 플랫폼을 쓰는 대신, 직접 만들어보면서 Next.js와 TypeScript 실력을 함께 키우기로 했다.
GitHub Pages 무료 배포 + 정적 사이트라 운영 비용이 없는 것도 큰 장점이었다.

## 주요 기능

### 블로그
마크다운 파일만 추가하면 빌드 시 자동으로 포스트가 등록된다.
`gray-matter`로 frontmatter를 파싱하고 `react-markdown` + `rehype-raw`로 렌더링한다.
포스트 클릭 시 모달 팝업으로 내용을 표시한다.

### 부트캠프 기록
`getAllBootcamps()`가 파일시스템을 직접 읽어 자동으로 카드를 생성한다.
TS 파일 수정 없이 마크다운 파일 추가만으로 강의 카드가 만들어지는 구조다.
- **단순 목록 모드** (42, Apple Academy): 강의 파일 순서대로 표시
- **그룹 모드** (Goorm): `group` frontmatter로 카테고리 분류, `group_order`로 순서 제어

### CV 페이지
경력·학력·부트캠프·기술 스택을 한 페이지에 정리한 이력서.
`window.print()` + `@media print` CSS로 브라우저에서 PDF 저장이 가능하다.

### 포트폴리오
Management / Development / Design 세 카테고리로 분류.
카드 클릭 시 모달로 상세 내용을 확인할 수 있다.

### 검색
Fuse.js 퍼지 검색으로 블로그 포스트와 포트폴리오를 통합 검색.
가중치 기반 랭킹: 제목(0.6) > 설명(0.3) > 태그(0.1)

## 기술 선택 이유

| 기술 | 이유 |
|------|------|
| **Next.js App Router** | `output: "export"`로 GitHub Pages 정적 배포. 서버 없이 운영 가능. |
| **TypeScript** | 마크다운 데이터 파싱 시 타입 안정성 확보 |
| **Tailwind CSS v4** | 빠른 스타일링 + CSS Custom Properties로 다크 테마 관리 |
| **gray-matter** | 마크다운 frontmatter를 손쉽게 파싱 |
| **Fuse.js** | 가볍고 퍼지 검색 구현이 간단함 |
| **GitHub Actions** | `main` 브랜치 push 시 자동 빌드 & 배포 |

## 회고

콘텐츠를 코드 수정 없이 마크다운 파일만으로 관리하는 구조를 설계하는 것이 가장 재미있었다.
특히 부트캠프 동적 로딩 메커니즘(그룹 모드 / 단순 목록 모드 자동 감지)은 처음 설계할 때 고민을 많이 했다.

컴포넌트 리팩토링을 거치면서 `BaseModal`, `PageHeader`, `icons.tsx` 같은 공유 컴포넌트를 추출하고
중복 코드를 줄이는 과정에서 실제 코드베이스를 다루는 감각을 익혔다.
