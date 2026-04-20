"use client";

import type {
  JobPostingStatus,
  JobPostingTag,
  SalaryType,
} from "../types/job-postings.types";

export function formatSalary(params: {
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: SalaryType | null;
  isSalaryNegotiable: boolean;
}) {
  const { salaryMin, salaryMax, salaryType, isSalaryNegotiable } = params;

  if (isSalaryNegotiable || salaryType === "NEGOTIABLE") {
    return "Thỏa thuận";
  }

  if (salaryMin == null || salaryMax == null) {
    return "Chưa cập nhật";
  }

  return `${formatCompactMoney(salaryMin)} - ${formatCompactMoney(salaryMax)}`;
}

function formatCompactMoney(value: number) {
  if (value >= 1_000_000) {
    const million = value / 1_000_000;
    return `${trimDecimal(million)} triệu VNĐ`;
  }

  return `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
}

function trimDecimal(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function formatRelativeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const diffMs = Date.now() - date.getTime();

  if (diffMs < 0) {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
    }).format(date);
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes} phút trước`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} giờ trước`;
  }

  if (diffMs < 30 * day) {
    const days = Math.floor(diffMs / day);
    return `${days} ngày trước`;
  }

  const months = Math.floor(diffMs / (30 * day));
  return `${months} tháng trước`;
}

export function getJobPostingStatusMeta(status: JobPostingStatus) {
  switch (status) {
    case "approved":
      return {
        label: "Đã duyệt",
        className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      };
    case "pending":
      return {
        label: "Chờ duyệt",
        className: "bg-amber-50 text-amber-700 border border-amber-100",
      };
    case "rejected":
      return {
        label: "Bị từ chối",
        className: "bg-red-50 text-red-700 border border-red-100",
      };
    case "restricted":
      return {
        label: "Bị hạn chế",
        className: "bg-orange-50 text-orange-700 border border-orange-100",
      };
    default:
      return {
        label: status,
        className: "bg-slate-100 text-slate-700 border border-slate-200",
      };
  }
}

export function getJobPostingTagMeta(tag: JobPostingTag) {
  switch (tag) {
    case "Active":
      return {
        label: "Đang hiển thị",
        className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      };
    case "Pending":
      return {
        label: "Chưa hiển thị",
        className: "bg-slate-100 text-slate-700 border border-slate-200",
      };
    case "Hidden":
      return {
        label: "Đã ẩn",
        className: "bg-slate-100 text-slate-700 border border-slate-200",
      };
    case "Closed":
      return {
        label: "Đã đóng",
        className: "bg-rose-50 text-rose-700 border border-rose-100",
      };
    default:
      return {
        label: tag,
        className: "bg-slate-100 text-slate-700 border border-slate-200",
      };
  }
}

export function getCompanyTagFilterOptions(): Array<{
  label: string;
  value: JobPostingTag | "";
}> {
  return [
    { label: "Tất cả trạng thái", value: "" },
    { label: "Đang hoạt động", value: "Active" },
    { label: "Chờ duyệt", value: "Pending" },
    { label: "Tạm ẩn", value: "Hidden" },
    { label: "Đã đóng", value: "Closed" },
  ];
}
