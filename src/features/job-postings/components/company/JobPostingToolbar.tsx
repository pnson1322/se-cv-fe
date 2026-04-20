"use client";

import { Plus, Search } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import type { JobPostingTag } from "../../types/job-postings.types";
import { getCompanyTagFilterOptions } from "../../utils/job-postings.utils";

type Props = {
  searchValue: string;
  tagValue: JobPostingTag | "";
  onSearchChange: (value: string) => void;
  onTagChange: (value: JobPostingTag | "") => void;
  onCreate: () => void;
};

export default function JobPostingToolbar({
  searchValue,
  tagValue,
  onSearchChange,
  onTagChange,
  onCreate,
}: Props) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px_170px]">
      <div className="flex h-11 items-center gap-3 rounded-2xl border border-(--color-border) bg-white px-4 shadow-sm transition focus-within:border-(--color-accent)">
        <Search size={20} className="shrink-0 text-(--color-muted)" />

        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm theo tên công việc..."
          className="w-full bg-transparent text-[15px] text-(--color-text) outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="min-w-0">
        <CustomSelect
          label=""
          placeholder="Tất cả trạng thái"
          value={tagValue}
          options={getCompanyTagFilterOptions()}
          onChange={(value) => onTagChange(value as JobPostingTag | "")}
        />
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-5 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-95"
      >
        <Plus size={18} />
        Đăng tin mới
      </button>
    </div>
  );
}
