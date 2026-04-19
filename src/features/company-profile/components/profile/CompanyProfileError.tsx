"use client";

import { AlertCircle, Building2 } from "lucide-react";

export default function CompanyProfileError() {
  return (
    <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
      <div className="mx-auto flex max-w-135 flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={30} />
        </div>

        <h2 className="mt-5 text-[24px] font-bold text-(--color-text)">
          Không thể tải hồ sơ công ty
        </h2>

        <p className="mt-3 text-[15px] leading-7 text-(--color-muted)">
          Hồ sơ có thể không tồn tại, đã bị ẩn hoặc bạn không có quyền xem ở
          thời điểm hiện tại.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-600">
          <Building2 size={16} />
          <span>
            Vui lòng kiểm tra lại liên kết hoặc thử tải lại trang sau.
          </span>
        </div>
      </div>
    </div>
  );
}
