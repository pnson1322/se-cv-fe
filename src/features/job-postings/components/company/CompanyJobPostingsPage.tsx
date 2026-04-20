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
  const { searchInput, setSearchInput, tag, setTag, cards, stats, isLoading } =
    useCompanyJobPostingsPage();

  return (
    <div className="mx-6 space-y-6 xl:mx-8">
      <JobPostingStatsGrid stats={stats} />

      <JobPostingToolbar
        searchValue={searchInput}
        tagValue={tag}
        onSearchChange={setSearchInput}
        onTagChange={setTag}
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
