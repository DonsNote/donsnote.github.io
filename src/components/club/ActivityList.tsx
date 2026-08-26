"use client";

import Link from "next/link";
import { ChevronSmallIcon } from "@/lib/icons";

interface ActivityItem {
  title: string;
  description?: string;
  content: string | null;
  slug: string;
}

interface ActivityListProps {
  clubId: string;
  activities: ActivityItem[];
  color: string;
}

export default function ActivityList({ clubId, activities, color }: ActivityListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {activities.map((activity, i) => {
        const hasContent = !!activity.content;

        const inner = (
          <>
            <span
              className="mt-0.5 text-xs font-mono font-medium flex-shrink-0 w-6 text-right"
              style={{ color }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {activity.title}
              </p>
              {activity.description && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {activity.description}
                </p>
              )}
            </div>
            {hasContent && (
              <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }}>
                <ChevronSmallIcon />
              </span>
            )}
          </>
        );

        if (!hasContent) {
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl text-left w-full"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {inner}
            </div>
          );
        }

        return (
          <Link
            key={i}
            href={`/club/${clubId}/${activity.slug}`}
            className="flex items-start gap-3 p-4 rounded-xl text-left transition-all w-full"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + "66")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
