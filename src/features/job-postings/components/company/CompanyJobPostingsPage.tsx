"use client";

import { Loader2 } from "lucide-react";
import { useCompanyJobPostingsPage } from "../../hooks/useCompanyJobPostingsPage";
import JobPostingStatsGrid from "./JobPostingStatsGrid";
import JobPostingToolbar from "./JobPostingToolbar";
import CompanyJobPostingGrid from "./CompanyJobPostingGrid";

type Props = {
  onCreateJob?: () => void;
  onViewJobDetail?: (jobId: number) => void;
};

export default function CompanyJobPostingsPage({
  onCreateJob,
  onViewJobDetail,
}: Props) {
  const {
    searchInput,
    setSearchInput,
    status,
    setStatus,
    cards,
    stats,
    isLoading,
    error,
  } = useCompanyJobPostingsPage();

  if (error) {
    return (
      <div className="mx-12 space-y-6 xl:mx-16">
        <JobPostingStatsGrid stats={stats} />

        <JobPostingToolbar
          searchValue={searchInput}
          statusValue={status}
          onSearchChange={setSearchInput}
          onStatusChange={setStatus}
          onCreate={() => onCreateJob?.()}
        />

        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-[15px] text-red-600 shadow-sm">
          Không thể tải danh sách tin tuyển dụng.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-12 space-y-6 xl:mx-16">
      <JobPostingStatsGrid stats={stats} />

      <JobPostingToolbar
        searchValue={searchInput}
        statusValue={status}
        onSearchChange={setSearchInput}
        onStatusChange={setStatus}
        onCreate={() => onCreateJob?.()}
      />

      {isLoading ? (
        <div className="flex items-center justify-center rounded-3xl border border-(--color-border) bg-white px-6 py-16 shadow-sm">
          <Loader2 size={26} className="animate-spin text-(--color-muted)" />
        </div>
      ) : (
        <CompanyJobPostingGrid items={cards} onViewDetail={onViewJobDetail} />
      )}
    </div>
  );
}
