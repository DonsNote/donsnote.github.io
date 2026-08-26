import { getAllClubs, type ClubItem, type ActivityItem } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdownComponents";

interface PageProps {
  params: Promise<{ id: string; activity: string }>;
}

function findActivity(
  clubId: string,
  slug: string
): { club: ClubItem; activity: ActivityItem } | null {
  const club = getAllClubs().find((c) => c.id === clubId);
  if (!club) return null;

  const activity =
    club.activities?.find((a) => a.slug === slug) ??
    club.groups?.flatMap((g) => g.activities).find((a) => a.slug === slug);
  if (!activity) return null;

  return { club, activity };
}

export async function generateStaticParams() {
  return getAllClubs().flatMap((club) => {
    const activities = club.activities ?? club.groups!.flatMap((g) => g.activities);
    return activities
      .filter((a) => a.content)
      .map((a) => ({ id: club.id, activity: a.slug }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, activity } = await params;
  const found = findActivity(id, activity);
  if (!found) return {};
  return {
    title: `${found.activity.title} | ${found.club.name} | DonsNote`,
    description: found.activity.description ?? found.club.description,
  };
}

export default async function ClubActivityPage({ params }: PageProps) {
  const { id, activity } = await params;
  const found = findActivity(id, activity);
  if (!found || !found.activity.content) notFound();

  const { club, activity: item } = found;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <div className="space-y-4">
        <Link
          href={`/club/${club.id}`}
          className="text-sm inline-block"
          style={{ color: "var(--text-muted)" }}
        >
          ← {club.name}
        </Link>
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: club.color }} />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            {item.title}
          </h1>
          {item.description && (
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {item.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
