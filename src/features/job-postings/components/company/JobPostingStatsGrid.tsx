"use client";

import { BriefcaseBusiness, CheckCircle2, EyeOff, Lock } from "lucide-react";
import type { JobPostingsStats } from "../../types/job-postings.types";

type Props = {
  stats?: JobPostingsStats;
};

const statItems = [
  {
    key: "total",
    label: "Tổng tin",
    icon: BriefcaseBusiness,
    cardClassName: "border-slate-200",
    textClassName: "text-slate-500",
    valueClassName: "text-slate-900",
    iconWrapperClassName: "bg-sky-50 text-sky-600",
  },
  {
    key: "active",
    label: "Đang hoạt động",
    icon: CheckCircle2,
    cardClassName: "border-emerald-200",
    textClassName: "text-emerald-600",
    valueClassName: "text-emerald-600",
    iconWrapperClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "hidden",
    label: "Tạm ẩn",
    icon: EyeOff,
    cardClassName: "border-orange-200",
    textClassName: "text-orange-500",
    valueClassName: "text-orange-500",
    iconWrapperClassName: "bg-orange-50 text-orange-500",
  },
  {
    key: "closed",
    label: "Đã đóng",
    icon: Lock,
    cardClassName: "border-slate-200",
    textClassName: "text-slate-500",
    valueClassName: "text-slate-900",
    iconWrapperClassName: "bg-rose-50 text-rose-600",
  },
] as const;

export default function JobPostingStatsGrid({ stats }: Props) {
  const values = {
    total: stats?.total ?? 0,
    active: stats?.active ?? 0,
    hidden: stats?.hidden ?? 0,
    closed: stats?.closed ?? 0,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.key}
            className={`rounded-3xl border bg-white p-6 shadow-sm ${item.cardClassName}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={`text-[15px] font-semibold ${item.textClassName}`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-3 text-[30px] font-bold ${item.valueClassName}`}
                >
                  {values[item.key]}
                </p>
              </div>

              <div
                className={`flex h-13 w-13 items-center justify-center rounded-2xl ${item.iconWrapperClassName}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
