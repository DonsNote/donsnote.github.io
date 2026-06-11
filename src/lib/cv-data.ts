export const personalInfo = {
  name: "Do hyun Kim",
  nameKo: "김도현",
  title: "Management Specialist",
  email: "neveradio@gmail.com",
  phone: "+82 10 3596 9199",
  dob: "1985-10-23",
  nationality: "Republic of Korea",
  github: "github.com/donsnote",
  site: "donsnote.github.io",
};

export interface EducationItem {
  school: string;
  schoolEn?: string;
  period: string;
  major?: string;
  description?: string;
}

export const education: EducationItem[] = [
  {
    school: "제주관광대학교",
    schoolEn: "Jeju tourism University",
    period: "2009",
    major: "관광경영학과 (Tourism management)",
    description: "Graduate",
  },
  {
    school: "제주대학교",
    schoolEn: "Jeju National University",
    period: "2011",
    major: "경영학과 (Business Administration)",
  },
  {
    school: "토론토대학교",
    schoolEn: "University of Toronto · School of continuing studies",
    period: "2017",
    major: "Academic",
    description: "50 (high intermediate) Certificated",
  },
  {
    school: "42 Seoul · La Picine",
    period: "2022",
    description: "4주간의 개발자 양성 프로그램 (La Picine) 참여",
  },
  {
    school: "Apple Developer Academy @ POSTECH",
    period: "2023",
    major: "iOS 앱 개발 · 디자인 씽킹 · UX",
    description: "2기 · Nano / Mini / Macro 챌린지 기반 실제 앱 프로젝트",
  },
  {
    school: "42",
    period: "2024",
    major: "소프트웨어 교육 과정",
    description: "교수·교재 없는 동료 학습(Peer Learning) 기반 C 시스템 프로그래밍",
  },
  {
    school: "Goorm Deep Dive",
    period: "2025",
    major: "Product Management",
    description: "8기 · 고객 분석, UI/UX, 데이터 분석, 기술 인사이트, 전략적 사고",
  },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "리더십 & 관리 (Leadership & Management)",
    items: [
      "외향적인 성격을 통한 환경적인 요소에 구애받지 않는 커뮤니케이션",
      "프로젝트에 대한 이해도가 높으며, 진행하기 위한 프로세스 메이킹",
      "다양한 경험으로 인한 폭 넓은 시야 (Creative)",
      "풍부한 PT 경험으로 인한 높은 전달력",
    ],
  },
  {
    category: "디자인 (Design)",
    items: [
      "Adobe Tool 기반 일러스트 및 그래픽 디자인 및 영상편집",
      "영상 촬영 장비 활용",
      "디자인 / 영상 기획",
    ],
  },
];

export const designTools = ["HWP", "PPT", "Pr", "Ae", "Ps"];

export const managementSkills = ["PM", "HR", "HRD", "Accounting"];

export interface SocialItem {
  title: string;
  period: string;
  description: string;
}

export const socialExperiences: SocialItem[] = [
  {
    title: "제주관광대학교 총학생회 조직위원장",
    period: "2011.03 ~ 2012.03",
    description:
      "대학 행사(OT, 체육대회, 축제 등) 기획/진행. 교내홍보물(베너, 현수막 등) 외부 판매(제주도 내 기업) 수익금으로 행사비용 및 각 학과 지원, 장학금 지급(2억원 여)",
  },
  {
    title: "대학생 동북아 대장정 9기 (NAFC 9th) 회장",
    period: "2009.08 ~ 2010.07",
    description:
      "100명의 선발된 대학생들이 14박 15일간 '차마고도'라는 컨텐츠를 가지고 중국을 여행하며 자신을 돌아보고 미래에 대한 비전 설계. 대장정 이후 인프라를 통한 1달에 한번씩 '남산원' 봉사활동 기획/진행",
  },
];

export type WorkCategory = "Business" | "Employee" | "Freelance";

export interface WorkItem {
  company: string;
  companyEn?: string;
  period: string;
  role: string;
  description: string;
  category: WorkCategory;
  status?: string;
}

export const workExperiences: WorkItem[] = [
  // Business
  {
    company: "(주)이솝이야기",
    companyEn: "Aesopos corp.",
    period: "2019",
    role: "CEO / PM",
    description:
      "종합 컨설팅 회사를 설립하여 5개 브랜드 런칭, 1개 프랜차이즈 설립, 15개 이상의 국가사업(조달청)을 진행하였고, 각 분야(디자인, 작가, AD, MD)의 직원들을 채용하여 프로젝트의 A to Z 참여 및 PM 역활",
    category: "Business",
  },
  // Employee
  {
    company: "(주)끌밋",
    companyEn: "kkeulmit Inc.",
    period: "2021",
    role: "COO, 경영관리 (Management)",
    description:
      "법인설립, 인사, 노무, 재무, 공무, 행정 업무에 대한 초기 프로세스 정립. 청년 디지털일자리사업, 청년이음 등 인건비 지원사업 채결 및 적용",
    category: "Employee",
  },
  {
    company: "삼성애버랜드",
    companyEn: "Samsung Everland Resort",
    period: "2004",
    role: "사원 (F-cast), 엔터테이먼트 (Entertainment)",
    description:
      "사원(Cast) 근태관리, 유로카니발(공연) 크로우 참여 및 파크 내 퍼레이드(오픈, 주간, 야간 등) 진행과 신규 퍼레이드 해피할로윈, 스플레쉬 퍼레이드 기획/제작에 참여하여 퍼레이드 오픈 진행",
    category: "Employee",
  },
  // Freelance
  {
    company: "(주)터보테크",
    companyEn: "Turbo Tech inc.",
    period: "2013",
    role: "대리, 인사/총무 (HR / Management)",
    description:
      "사내 인사관리 프로세스 수립 및 교육(인사담당자). 신규 생산라인 수립(경북 구미시) - 인사편재 정립, SI업체 계약, 채용 및 교육(입사자)",
    category: "Freelance",
  },
  {
    company: "삼사오션뷰호텔",
    companyEn: "Samsa ocean view Hotel",
    period: "2015",
    role: "과장, M&A",
    description:
      "오션뷰cc 인수를 위한 재무분석 및 인수비용, 수익율, 손익분기점 정리/분석. 인수 합병 후 골프장 회원권 시스템 재정비",
    category: "Freelance",
  },
  {
    company: "(주)더동쪽바다가는길",
    companyEn: "The east Social Enterprises",
    period: "2019",
    role: "과장, 마케팅팀 (Marketing)",
    description:
      "신규브랜드 '홍영의' BI 제작/런칭 - 기존 제품 디자인 변경. 프랜차이즈 '돗대골뱅이', '서민밥상' 등 시스템 정립 및 확장",
    category: "Freelance",
  },
];

export const workCategories: WorkCategory[] = ["Business", "Employee", "Freelance"];
