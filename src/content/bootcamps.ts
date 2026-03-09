export interface BootcampLecture {
  title: string;
  description?: string;
  filePath?: string; // src/content/bootcamp/ 기준 상대 경로
}

export interface BootcampGroup {
  name: string;
  lectures: BootcampLecture[];
}

export interface Bootcamp {
  id: string;
  name: string;
  period: string;
  description: string;
  tags: string[];
  url?: string;
  color: string;
  courses?: BootcampLecture[];
  groups?: BootcampGroup[];
}

export const bootcamps: Bootcamp[] = [
  {
    id: "apple",
    name: "Apple Developer Academy @ POSTECH",
    period: "2023.03 - 2024.02",
    description:
      "POSTECH에서 운영하는 Apple Developer Academy. iOS 앱 개발, 디자인 씽킹, UX를 학습하며 Nano/Mini/Macro 챌린지를 통해 실제 앱 프로젝트를 단계적으로 진행.",
    tags: ["Swift", "SwiftUI", "iOS", "UX Design", "Design Thinking"],
    url: "https://developeracademy.postech.ac.kr",
    color: "#a78bfa",
    courses: [
      { title: "Prelude",         description: "아카데미 시작 및 오리엔테이션", filePath: "Apple/Courses/Prelude.md" },
      { title: "Nano Challenge 1",description: "소규모 개인 프로젝트",           filePath: "Apple/Courses/Nano1.md" },
      { title: "Nano Challenge 2",description: "소규모 개인 프로젝트",           filePath: "Apple/Courses/Nano2.md" },
      { title: "Mini Challenge 1",description: "소그룹 협업 프로젝트",           filePath: "Apple/Courses/MC1.md" },
      { title: "Mini Challenge 2",description: "소그룹 협업 프로젝트",           filePath: "Apple/Courses/MC2.md" },
      { title: "Mini Challenge 3",description: "소그룹 협업 프로젝트",           filePath: "Apple/Courses/MC3.md" },
      { title: "Macro Challenge", description: "대규모 팀 프로젝트",             filePath: "Apple/Courses/Macro.md" },
      { title: "Bridge 1",        description: "심화 학습 브릿지",               filePath: "Apple/Courses/BR1.md" },
      { title: "Bridge 2",        description: "심화 학습 브릿지",               filePath: "Apple/Courses/BR2.md" },
      { title: "Bridge 3",        description: "심화 학습 브릿지",               filePath: "Apple/Courses/BR3.md" },
      { title: "New Bridge 1",    description: "심화 학습 브릿지",               filePath: "Apple/Courses/NBR1.md" },
      { title: "New Bridge 2",    description: "심화 학습 브릿지",               filePath: "Apple/Courses/NBR2.md" },
      { title: "Epilogue",        description: "아카데미 마무리",                 filePath: "Apple/Courses/Epiloge.md" },
    ],
  },
  {
    id: "goorm",
    name: "Goorm Deep Dive",
    period: "",
    description:
      "구름에서 진행한 Product Management 심화 부트캠프. 고객 분석, UI/UX, 데이터 분석, 기술 이해 등 PM에게 필요한 역량을 각 과목별 강의와 실습으로 학습.",
    tags: ["Product Management", "UX/UI", "Data Analysis", "Customer Analysis"],
    url: "https://goorm.co",
    color: "#34d399",
    groups: [
      {
        name: "고객분석",
        lectures: [
          { title: "고객문제 접근",         filePath: "Goorm/ca/ca1.md" },
          { title: "고객 기회 발견",         filePath: "Goorm/ca/ca2.md" },
          { title: "페르소나",               filePath: "Goorm/ca/ca3.md" },
          { title: "고객 인터뷰",            filePath: "Goorm/ca/ca4.md" },
          { title: "데이터 분석",            filePath: "Goorm/ca/ca5.md" },
          { title: "세그멘테이션",           filePath: "Goorm/ca/ca6.md" },
          { title: "PRD",                    filePath: "Goorm/ca/ca7.md" },
        ],
      },
      {
        name: "UI/UX 디자인",
        lectures: [
          { title: "디자인의 본질",           filePath: "Goorm/uiux/uiux1.md" },
          { title: "인지과학과 디자인 심리학", filePath: "Goorm/uiux/uiux2.md" },
          { title: "UX 리서치",               filePath: "Goorm/uiux/uiux3.md" },
          { title: "Information Architecture", filePath: "Goorm/uiux/uiux4.md" },
          { title: "Interaction & Interface",  filePath: "Goorm/uiux/uiux5.md" },
          { title: "디자인 시스템",            filePath: "Goorm/uiux/uiux6.md" },
          { title: "UX 라이팅",               filePath: "Goorm/uiux/uiux7.md" },
          { title: "행동 유도 디자인 설계",    filePath: "Goorm/uiux/uiux8.md" },
        ],
      },
      {
        name: "기술 인사이트",
        lectures: [
          { title: "기술 트렌드와 전략적 변화",   filePath: "Goorm/ti/ti1.md" },
          { title: "AI 서비스의 이해",             filePath: "Goorm/ti/ti2.md" },
          { title: "생성형 AI의 이해",             filePath: "Goorm/ti/ti3.md" },
          { title: "컴퓨팅 기술의 발전과 변화",   filePath: "Goorm/ti/ti4.md" },
          { title: "기술 불확실성과 의사결정",     filePath: "Goorm/ti/ti5.md" },
        ],
      },
      {
        name: "데이터 분석",
        lectures: [
          { title: "데이터 사고와 기초",             filePath: "Goorm/da/da1.md" },
          { title: "제품 지표 설계와 효과적 측정",   filePath: "Goorm/da/da2.md" },
          { title: "퍼널 분석과 AARRR",              filePath: "Goorm/da/da3.md" },
          { title: "데이터 분석 도구와 활용 방법",   filePath: "Goorm/da/da4.md" },
          { title: "코호트 분석과 사용자 유지 전략", filePath: "Goorm/da/da5.md" },
          { title: "제품 중심 비즈니스의 데이터 전략", filePath: "Goorm/da/da6.md" },
          { title: "플랫폼 중심 비즈니스의 데이터 전략", filePath: "Goorm/da/da7.md" },
          { title: "온라인 커뮤니티 설계 전략",      filePath: "Goorm/da/da8.md" },
          { title: "A/B 테스트",                     filePath: "Goorm/da/da9.md" },
          { title: "데이터 기반 의사결정과 전략적 활용", filePath: "Goorm/da/da10.md" },
        ],
      },
      {
        name: "전략적 사고",
        lectures: [
          { title: "문제 해결과 린 사고",       filePath: "Goorm/st/st1.md" },
          { title: "문제의 근본적인 원인 찾기", filePath: "Goorm/st/st2.md" },
          { title: "발산적 사고와 수렴적 사고", filePath: "Goorm/st/st3.md" },
          { title: "디자인 사고와 스프린트",    filePath: "Goorm/st/st4.md" },
        ],
      },
    ],
  },
  {
    id: "42",
    name: "42",
    period: "",
    description:
      "교수와 교재 없이 동료 학습(Peer Learning)으로 진행하는 소프트웨어 교육 과정. C 언어와 시스템 프로그래밍을 중심으로 다양한 과제를 수행.",
    tags: ["C", "Unix", "System Programming", "Algorithm", "Peer Learning"],
    url: "https://42seoul.kr",
    color: "#60a5fa",
    courses: [
      { title: "Libft",         description: "나만의 C 라이브러리 구현",                        filePath: "42/Assignment/Libft.md" },
      { title: "Printf",        description: "printf 함수 재구현",                               filePath: "42/Assignment/Printf.md" },
      { title: "Get Next Line", description: "파일 디스크립터에서 한 줄씩 읽기",                 filePath: "42/Assignment/GetNextLine.md" },
      { title: "Push Swap",     description: "스택 정렬 알고리즘",                               filePath: "42/Assignment/Push_swap.md" },
      { title: "So Long",       description: "2D 게임 구현",                                     filePath: "42/Assignment/So_long.md" },
      { title: "Mini Talk",     description: "시그널을 이용한 프로세스 통신",                     filePath: "42/Assignment/Mini_talk.md" },
      { title: "Minishell",     description: "간단한 쉘 구현",                                   filePath: "42/Assignment/Minishell.md" },
      { title: "Net Practice",  description: "네트워크 서브넷 구성",                             filePath: "42/Assignment/NetPractice.md" },
      { title: "Philosophers",  description: "스레드와 뮤텍스를 이용한 식사하는 철학자",         filePath: "42/Assignment/Pilosophers.md" },
      { title: "Cub3D",         description: "레이캐스팅 기반 3D 미로 게임",                     filePath: "42/Assignment/Cub3D.md" },
      { title: "Born to Be Root",description: "시스템 보안 및 서버 설정",                        filePath: "42/Assignment/BornToBeRoot.md" },
    ],
  },
];
