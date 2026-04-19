"use client";

import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  EyeOff,
  Loader2,
  MapPin,
  Pencil,
  ShieldAlert,
  Users,
  Wallet,
  Check,
  X,
} from "lucide-react";

import type { JobPostingStatus } from "../../../types/job-postings.types";
import type { Role } from "@/features/auth/constants/roles";

type Props = {
  viewerRole: Role;
  status: JobPostingStatus;

  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string | null;

  city?: string | null;
  salaryText: string;
  postedAtText: string;
  deadlineText: string;

  isExpired?: boolean;
  isExpiringSoon?: boolean;

  applicantCount: number;

  statusLabel: string;
  statusClassName: string;

  isLoading?: boolean;

  onEdit: () => void;
  onHide?: () => void;
  onViewApplicants?: () => void;

  onApply?: () => void;
  onSave?: () => void;

  onApprove?: () => void;
  onReject?: () => void;
  onRestrict?: () => void;
  onReapprove?: () => void;
};

export default function JobPostingDetailHeader({
  viewerRole,
  status,

  jobTitle,
  companyName,
  companyLogoUrl,

  city,
  salaryText,
  postedAtText,
  deadlineText,

  isExpired = false,
  isExpiringSoon = false,

  applicantCount,

  statusLabel,
  statusClassName,

  isLoading = false,

  onEdit,
  onHide,
  onViewApplicants,

  onApply,
  onSave,

  onApprove,
  onReject,
  onRestrict,
  onReapprove,
}: Props) {
  const isCompany = viewerRole === "COMPANY";
  const isAdmin = viewerRole === "ADMIN";
  const isStudent = viewerRole === "STUDENT";

  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      {/* HEADER TOP */}
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

          {/* META */}
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

            {/* STUDENT TAG */}
            {isStudent && isExpired && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-[13px] font-semibold text-red-600">
                Đã hết hạn
              </span>
            )}

            {isStudent && !isExpired && isExpiringSoon && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[13px] font-semibold text-amber-700">
                Sắp hết hạn
              </span>
            )}
          </div>

          {/* STATUS + APPLICANTS */}
          {!isStudent && (
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
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 border-t border-(--color-border) pt-5">
        <div className="grid gap-3 md:grid-cols-3">
          {/* COMPANY */}
          {isCompany && (
            <>
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
                onClick={onHide}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-border) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-text)"
              >
                <EyeOff size={18} />
                Ẩn tin
              </button>

              <button
                type="button"
                onClick={onViewApplicants}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-accent) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-accent)"
              >
                <Users size={18} />
                Xem ứng viên
              </button>
            </>
          )}

          {/* STUDENT */}
          {isStudent && (
            <>
              <button
                onClick={onApply}
                className="rounded-2xl bg-(--color-accent) px-5 py-3 text-white font-semibold"
              >
                Ứng tuyển ngay
              </button>

              <button
                onClick={onSave}
                className="rounded-2xl border px-5 py-3 font-semibold"
              >
                Lưu tin
              </button>
            </>
          )}

          {/* ADMIN */}
          {isAdmin && status === "pending" && (
            <>
              <button
                disabled={isLoading}
                onClick={onApprove}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-white disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Check size={18} />
                )}
                Phê duyệt
              </button>

              <button
                disabled={isLoading}
                onClick={onReject}
                className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-white disabled:opacity-60"
              >
                <X size={18} />
                Từ chối
              </button>
            </>
          )}

          {isAdmin && status === "approved" && (
            <button
              disabled={isLoading}
              onClick={onRestrict}
              className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-white disabled:opacity-60"
            >
              <ShieldAlert size={18} />
              Hạn chế
            </button>
          )}

          {isAdmin && (status === "restricted" || status === "rejected") && (
            <button
              disabled={isLoading}
              onClick={onReapprove}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-white disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Check size={18} />
              )}
              Duyệt lại
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
