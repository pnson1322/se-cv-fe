"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type {
  CategoryItem,
  JobPostingDataItem,
} from "@/features/job-postings/types/job-postings.types";
import CompanyJobCard from "./CompanyJobCard";

type Props = {
  jobs: JobPostingDataItem[];
  categories: CategoryItem[];
  viewerRole: Role;
  isLoading?: boolean;
  onViewJobDetail: (jobId: number) => void;
};

type SalaryFilterValue =
  | "all"
  | "negotiable"
  | "under-10m"
  | "10m-20m"
  | "above-20m";

const salaryFilterOptions: Array<{
  label: string;
  value: SalaryFilterValue;
}> = [
  { label: "Tất cả mức lương", value: "all" },
  { label: "Thỏa thuận", value: "negotiable" },
  { label: "Dưới 10 triệu", value: "under-10m" },
  { label: "Từ 10 - 20 triệu", value: "10m-20m" },
  { label: "Trên 20 triệu", value: "above-20m" },
];

export default function CompanyJobsSection({
  jobs,
  categories,
  viewerRole,
  isLoading = false,
  onViewJobDetail,
}: Props) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [salaryFilter, setSalaryFilter] = useState<SalaryFilterValue>("all");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCategory =
        categoryFilter === "all" || String(job.categoryId) === categoryFilter;

      let matchSalary = true;

      if (salaryFilter !== "all") {
        if (salaryFilter === "negotiable") {
          matchSalary =
            job.isSalaryNegotiable || job.salaryType === "NEGOTIABLE";
        } else {
          if (job.isSalaryNegotiable || job.salaryType === "NEGOTIABLE") {
            matchSalary = false;
          } else {
            const avgSalary = (job.salaryMin + job.salaryMax) / 2;

            if (salaryFilter === "under-10m") {
              matchSalary = avgSalary < 10_000_000;
            }

            if (salaryFilter === "10m-20m") {
              matchSalary = avgSalary >= 10_000_000 && avgSalary <= 20_000_000;
            }

            if (salaryFilter === "above-20m") {
              matchSalary = avgSalary > 20_000_000;
            }
          }
        }
      }

      return matchCategory && matchSalary;
    });
  }, [jobs, categoryFilter, salaryFilter]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-[14px] font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-(--color-accent)"
          >
            <option value="all">Tất cả ngành nghề</option>
            {categories.map((category) => (
              <option
                key={category.categoryId}
                value={String(category.categoryId)}
              >
                {category.categoryName}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <div className="relative">
          <select
            value={salaryFilter}
            onChange={(e) =>
              setSalaryFilter(e.target.value as SalaryFilterValue)
            }
            className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-[14px] font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-(--color-accent)"
          >
            {salaryFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-10">
          <Loader2 size={22} className="animate-spin text-slate-400" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-[15px] text-slate-500">
          Không có tin tuyển dụng phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filteredJobs.map((job) => (
            <CompanyJobCard
              key={job.jobId}
              job={job}
              viewerRole={viewerRole}
              onViewDetail={onViewJobDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}
