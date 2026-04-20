"use client";

import { Ban, CircleX } from "lucide-react";

type Props = {
  type: "rejected" | "restricted";
  reason: string | null | undefined;
  date?: string;
};

export default function JobPostingStatusReasonCard({
  type,
  reason,
  date,
}: Props) {
  const isRejected = type === "rejected";

  return (
    <section
      className={`rounded-3xl border p-6 shadow-sm ${
        isRejected
          ? "border-red-200 bg-red-50"
          : "border-orange-200 bg-orange-50"
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          isRejected ? "text-red-700" : "text-orange-700"
        }`}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80">
          {isRejected ? <CircleX size={24} /> : <Ban size={24} />}
        </div>

        <h3 className="text-[18px] font-bold">
          {isRejected ? "Tin đã bị từ chối" : "Tin đang bị hạn chế"}
        </h3>
      </div>

      {date ? (
        <p
          className={`mt-4 text-[15px] ${
            isRejected ? "text-red-600" : "text-orange-600"
          }`}
        >
          {isRejected ? "Ngày từ chối" : "Ngày hạn chế"}: {date}
        </p>
      ) : null}

      <div className="mt-4 rounded-2xl border border-current/15 bg-white/80 p-5">
        <p
          className={`text-[15px] font-semibold ${
            isRejected ? "text-red-700" : "text-orange-700"
          }`}
        >
          {isRejected ? "Lý do từ chối:" : "Lý do hạn chế:"}
        </p>

        <p
          className={`mt-3 whitespace-pre-line text-[15px] leading-8 ${
            isRejected ? "text-red-600" : "text-orange-600"
          }`}
        >
          {reason}
        </p>
      </div>
    </section>
  );
}
