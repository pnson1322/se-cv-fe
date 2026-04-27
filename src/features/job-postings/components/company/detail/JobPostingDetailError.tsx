"use client";

import { AlertCircle, FileSearch } from "lucide-react";

type Props = {
  isStudent: boolean;
};

export default function JobPostingDetailError({ isStudent }: Props) {
  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 pb-12 md:px-6 lg:px-8">
      <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
        <div className="mx-auto flex max-w-130 flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertCircle size={30} />
          </div>

          <h2 className="mt-5 text-[24px] font-bold text-(--color-text)">
            Không thể tải chi tiết công việc
          </h2>

          <p className="mt-3 text-[15px] leading-7 text-(--color-muted)">
            {isStudent
              ? "Tin tuyển dụng này có thể chưa được phê duyệt, đã bị ẩn hoặc bạn không có quyền xem ở thời điểm hiện tại."
              : "Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử tải lại trang hoặc quay lại sau."}
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-600">
            <FileSearch size={16} />
            <span>
              {isStudent
                ? "Sinh viên chỉ xem được các tin tuyển dụng đã được phê duyệt."
                : "Không tìm thấy dữ liệu phù hợp hoặc phiên làm việc đã thay đổi."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
