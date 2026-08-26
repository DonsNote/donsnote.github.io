import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pamphletDir = path.join(process.cwd(), "src/content/pamphlet");

function readFrontmatter<T>(pamphletId: string, slug: string): T {
  const filePath = path.join(pamphletDir, pamphletId, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return data as T;
}

export interface IntroContent {
  badge: string;
  badgeLabel: string;
  title: string;
  description: string;
  overviewTitle: string;
  overviewSubtitle: string;
  overview: string;
  info: { label: string; value: string }[];
}

export interface ScheduleItem {
  time: string;
  timeEnd?: string;
  title: string;
  desc?: string;
}

export interface ScheduleDay {
  badge: string;
  date: string;
  items: ScheduleItem[];
}

export interface ScheduleContent {
  days: ScheduleDay[];
}

export interface MapContent {
  venueName: string;
  venueAddress: string;
  mapImage: string;
  mapLabel: string;
  traffic: { label: string; value: string }[];
  parkingNote: string;
  contactValue: string;
}

export interface NoticeItem {
  title: string;
  desc: string;
  emphasis?: boolean;
}

export interface NoticeContent {
  title: string;
  subtitle: string;
  items: NoticeItem[];
}

export interface PartnerCard {
  code: string;
  name: string;
  role: string;
  desc: string;
}

export interface PartnerGroup {
  emoji: string;
  title: string;
  partners: PartnerCard[];
}

export interface PartnersContent {
  groups: PartnerGroup[];
}

export function getIntroContent(pamphletId: string): IntroContent {
  return readFrontmatter<IntroContent>(pamphletId, "intro");
}

export function getScheduleContent(pamphletId: string): ScheduleContent {
  return readFrontmatter<ScheduleContent>(pamphletId, "schedule");
}

export function getMapContent(pamphletId: string): MapContent {
  return readFrontmatter<MapContent>(pamphletId, "map");
}

export function getNoticeContent(pamphletId: string): NoticeContent {
  return readFrontmatter<NoticeContent>(pamphletId, "notice");
}

export function getPartnersContent(pamphletId: string): PartnersContent {
  return readFrontmatter<PartnersContent>(pamphletId, "partners");
}
