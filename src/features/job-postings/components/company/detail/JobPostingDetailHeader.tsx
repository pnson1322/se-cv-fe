"use client";

import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  EyeOff,
  MapPin,
  Pencil,
  Users,
  Wallet,
} from "lucide-react";

type Props = {
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string | null;
  city?: string | null;
  salaryText: string;
  postedAtText: string;
  deadlineText: string;
  applicantCount: number;
  statusLabel: string;
  statusClassName: string;
  onEdit: () => void;
};

export default function JobPostingDetailHeader({
  jobTitle,
  companyName,
  companyLogoUrl,
  city,
  salaryText,
  postedAtText,
  deadlineText,
  applicantCount,
  statusLabel,
  statusClassName,
  onEdit,
}: Props) {
  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <div className="flex gap-5">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) text-(--color-muted)">
          {companyLogoUrl ? (
            <Image
              src={companyLogoUrl}
              alt={companyName}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <BriefcaseBusiness size={32} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-[25px] font-bold leading-tight text-(--color-text) md:text-[29px]">
            {jobTitle}
          </h1>

          <p className="mt-2 text-[16px] font-semibold text-(--color-accent)">
            {companyName}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-(--color-muted)">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} />
              {city || "Chưa cập nhật"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Wallet size={16} />
              {salaryText}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              {postedAtText}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              Hạn: {deadlineText}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${statusClassName}`}
            >
              {statusLabel}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[14px] text-(--color-muted)">
              <Users size={16} />
              {applicantCount} ứng viên
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-(--color-border) pt-5">
        <div className="grid gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-5 py-3 text-[15px] font-semibold text-white transition hover:brightness-95"
          >
            <Pencil size={18} />
            Chỉnh sửa
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-border) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-text) transition hover:bg-slate-50"
          >
            <EyeOff size={18} />
            Ẩn tin
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-accent) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-accent) transition hover:bg-cyan-50"
          >
            <Users size={18} />
            Xem ứng viên
          </button>
        </div>
      </div>
    </section>
  );
}
