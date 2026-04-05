"use client";

import { ChevronDown } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type { MockJob } from "./CompanyProfilePage";
import CompanyJobCard from "./CompanyJobCard";

type Props = {
  jobs: MockJob[];
  viewerRole: Role;
};

export default function CompanyJobsSection({ jobs, viewerRole }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-[14px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span>Tất cả ngành nghề</span>
          <ChevronDown size={16} className="text-slate-400" />
        </button>

        <button
          type="button"
          className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-[14px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span>Tất cả mức lương</span>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {jobs.map((job) => (
          <CompanyJobCard key={job.id} job={job} viewerRole={viewerRole} />
        ))}
      </div>
    </section>
  );
}
