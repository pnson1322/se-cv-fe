"use client";

import Image from "next/image";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    company: "VNG Corporation",
    salary: "8-12 triệu VNĐ",
    logo: "/images/company-logo-placeholder.png",
  },
  {
    id: 2,
    title: "Thực tập Data Analyst",
    company: "Viettel Solutions",
    salary: "6-8 triệu VNĐ",
    logo: "/images/company-logo-placeholder.png",
  },
  {
    id: 3,
    title: "Mobile Developer Intern",
    company: "Tiki Corporation",
    salary: "7-10 triệu VNĐ",
    logo: "/images/company-logo-placeholder.png",
  },
];

export default function SimilarJobsSection() {
  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <h3 className="text-[18px] font-bold text-(--color-text)">
        Việc làm tương tự
      </h3>

      <div className="mt-5 space-y-4">
        {MOCK_JOBS.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-(--color-border) px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={job.logo}
                  alt={job.company}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[16px] font-semibold text-(--color-text)">
                  {job.title}
                </p>
                <p className="mt-1 text-[14px] text-(--color-muted)">
                  {job.company}
                </p>
              </div>
            </div>

            <p className="shrink-0 text-[15px] font-semibold text-(--color-accent)">
              {job.salary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
