"use client";

import { Loader2 } from "lucide-react";

export default function CompanyProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm">
        <div className="h-56 w-full bg-slate-200" />
        <div className="px-8 pb-8">
          <div className="-mt-16 flex items-end gap-5">
            <div className="h-32 w-32 rounded-3xl border-4 border-white bg-slate-200 shadow-sm" />
            <div className="flex-1 space-y-3 pb-2">
              <div className="h-8 w-64 rounded-xl bg-slate-200" />
              <div className="h-5 w-40 rounded-lg bg-slate-100" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-(--color-border) p-6"
                >
                  <div className="mb-5 h-7 w-48 rounded-lg bg-slate-200" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-11/12 rounded bg-slate-100" />
                    <div className="h-4 w-3/4 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-(--color-border) p-6">
              <div className="mb-5 h-7 w-36 rounded-lg bg-slate-200" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-3 w-20 rounded bg-slate-100" />
                    <div className="h-4 w-32 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-2 text-(--color-muted)">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-[15px] font-medium">
          Đang tải hồ sơ công ty...
        </span>
      </div>
    </div>
  );
}
