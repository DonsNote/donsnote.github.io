import type { Metadata } from "next";
import SectionPage from "@/components/pamphlet/SectionPage";
import { CalendarIcon } from "@/components/pamphlet/icons";
import { getScheduleContent } from "@/lib/pamphlet";

export const metadata: Metadata = { title: "행사 일정 | 2026 전국 정모" };

const ACCENT = "#fb923c";

export default function SchedulePage() {
  const content = getScheduleContent("wrangler-2026");

  return (
    <SectionPage title="행사 일정" icon={<CalendarIcon size={16} />} homeHref="/pamphlet/wrangler-2026">
      <div className="flex flex-col gap-4">
        {content.days.map((day, dayIdx) => (
          <div key={day.badge}>
            {dayIdx > 0 && <div className="h-px mb-4" style={{ backgroundColor: "var(--border)" }} />}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: ACCENT, backgroundColor: ACCENT + "1a", border: `1px solid ${ACCENT}66` }}
                >
                  {day.badge}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {day.date}
                </span>
              </div>
              <div className="flex flex-col">
                {day.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center py-3">
                    <div className="flex flex-col gap-0.5 flex-shrink-0" style={{ width: 72 }}>
                      <span className="text-sm font-bold" style={{ color: ACCENT }}>
                        {item.time}
                      </span>
                      {item.timeEnd && (
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {item.timeEnd}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <p className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </p>
                      {item.desc && (
                        <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
