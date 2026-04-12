"use client";

import type { JobPostingCardAdminCompanyItem } from "../../types/job-postings.types";
import CompanyJobPostingCard from "./CompanyJobPostingCard";

type Props = {
  items: JobPostingCardAdminCompanyItem[];
  onViewDetail?: (jobId: number) => void;
};

export default function CompanyJobPostingGrid({ items, onViewDetail }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-(--color-border) bg-white px-6 py-14 text-center shadow-sm">
        <h3 className="text-[18px] font-semibold text-(--color-text)">
          Chưa có tin tuyển dụng phù hợp
        </h3>
        <p className="mt-2 text-[15px] text-(--color-muted)">
          Hãy thử đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {items.map((item) => (
        <CompanyJobPostingCard
          key={item.jobId}
          item={item}
          onViewDetail={onViewDetail}
        />
      ))}
    </section>
  );
}
