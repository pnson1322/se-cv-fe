"use client";

import type { JobPostingsStats } from "../../types/job-postings.types";

type Props = {
  stats?: JobPostingsStats;
};

const defaultStats: JobPostingsStats = {
  total: 0,
  active: 0,
  restricted: 0,
  closed: 0,
};

export default function JobPostingStatsGrid({ stats = defaultStats }: Props) {
  const items = [
    {
      label: "Tổng tin",
      value: stats.total,
      className: "border-(--color-border)",
      valueClassName: "text-(--color-text)",
      labelClassName: "text-(--color-muted)",
    },
    {
      label: "Đang hoạt động",
      value: stats.active,
      className: "border-emerald-200",
      valueClassName: "text-emerald-600",
      labelClassName: "text-emerald-600",
    },
    {
      label: "Bị hạn chế",
      value: stats.restricted,
      className: "border-orange-200",
      valueClassName: "text-orange-600",
      labelClassName: "text-orange-600",
    },
    {
      label: "Đã đóng",
      value: stats.closed,
      className: "border-(--color-border)",
      valueClassName: "text-(--color-text)",
      labelClassName: "text-(--color-muted)",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl border bg-white px-5 py-4 shadow-sm ${item.className}`}
        >
          <p className={`text-[15px] font-medium ${item.labelClassName}`}>
            {item.label}
          </p>
          <p
            className={`mt-2 text-[40px] font-bold leading-none ${item.valueClassName}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
