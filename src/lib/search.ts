export interface SearchItem {
  type: "post" | "project" | "bootcamp";
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export type { SearchItem as SearchResult };
