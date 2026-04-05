"use client";

import { Clock3, MapPin, Wallet } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type { MockJob } from "./CompanyProfilePage";

export default function CompanyJobCard({
  job,
  viewerRole,
}: {
  job: MockJob;
  viewerRole: Role;
}) {
  const canApply = viewerRole === "STUDENT";

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[16.5px] font-semibold text-slate-900 md:text-[17.5px]">
            {job.title}
          </h3>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] leading-6 text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {job.location}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Wallet size={14} className="text-slate-400" />
              {job.salary}
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-700">
              {job.type}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-slate-400" />
              {job.postedAt}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Xem chi tiết
          </button>

          {canApply && (
            <button
              type="button"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-cyan-600"
            >
              Ứng tuyển
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
