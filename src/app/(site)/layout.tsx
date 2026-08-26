import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllProjects, getAllBlogItems, getAllBootcamps, getAllClubs } from "@/lib/mdx";
import { SearchItem } from "@/lib/search";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems: SearchItem[] = [
    ...getAllProjects().map((p) => ({
      type: "project" as const,
      title: p.title,
      description: p.description,
      tags: p.tags,
      href: "/portfolio",
    })),
    ...getAllBlogItems().map((p) => ({
      type: "post" as const,
      title: p.title,
      description: p.description ?? "",
      tags: p.tags ?? [],
      href: "/blog",
    })),
    ...getAllBootcamps().map((c) => ({
      type: "bootcamp" as const,
      title: c.name,
      description: c.description,
      tags: c.tags,
      href: `/bootcamp/${c.id}`,
    })),
    ...getAllClubs().map((c) => ({
      type: "club" as const,
      title: c.name,
      description: c.description,
      tags: c.tags,
      href: `/club/${c.id}`,
    })),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchItems={searchItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
