export interface SearchItem {
  type: "post" | "project";
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export type { SearchItem as SearchResult };
