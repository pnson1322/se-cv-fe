"use client";

import { Star } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type { MockReview } from "./CompanyProfilePage";
import CompanySectionCard from "./CompanySectionCard";
import CompanyReviewCard from "./CompanyReviewCard";

type Props = {
  reviews: MockReview[];
  viewerRole: Role;
  averageRating: number;
};

export default function CompanyReviewsSection({
  reviews,
  viewerRole,
  averageRating,
}: Props) {
  const isCompany = viewerRole === "COMPANY";

  const reviewSummary = {
    average: averageRating,
    total: 89,
    breakdown: [
      { label: "5 sao", percent: 60 },
      { label: "4 sao", percent: 30 },
      { label: "3 sao", percent: 10 },
      { label: "2 sao", percent: 10 },
      { label: "1 sao", percent: 10 },
    ],
  };

  return (
    <div className="space-y-5">
      <CompanySectionCard>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-[2.35rem] font-bold text-slate-900">
              {reviewSummary.average}
            </p>

            <div className="mt-2 flex justify-center gap-1 lg:justify-start">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={19}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="mt-2 text-[14px] font-medium text-slate-500">
              {reviewSummary.total} đánh giá
            </p>
          </div>

          <div className="space-y-3">
            {reviewSummary.breakdown.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[48px_1fr_52px] items-center gap-4"
              >
                <span className="text-[14px] text-slate-500">{item.label}</span>

                <div className="h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-amber-400"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <span className="text-right text-[14px] text-slate-500">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CompanySectionCard>

      <CompanySectionCard>
        <h3 className="text-[18px] font-semibold text-slate-900">
          Đánh giá từ sinh viên
        </h3>

        <p className="mt-2 text-[14px] text-slate-500">
          Tổng cộng {reviewSummary.total} đánh giá
        </p>

        {isCompany && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-[13px] text-amber-800">
            <span className="font-semibold">💡 Lưu ý:</span> Tất cả đánh giá đều
            ẩn danh để bảo vệ quyền riêng tư của sinh viên.
          </div>
        )}

        <div className="mt-5 space-y-4">
          {reviews.map((review) => (
            <CompanyReviewCard
              key={review.id}
              review={review}
              viewerRole={viewerRole}
            />
          ))}
        </div>
      </CompanySectionCard>
    </div>
  );
}
