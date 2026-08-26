export interface SearchItem {
  type: "post" | "project" | "bootcamp" | "club";
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export type { SearchItem as SearchResult };
