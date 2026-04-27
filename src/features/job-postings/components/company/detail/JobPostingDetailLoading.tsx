"use client";

import { Loader2 } from "lucide-react";

export default function JobPostingDetailLoading() {
  return (
    <div className="mx-auto mt-4 max-w-7xl space-y-7 px-4 pb-12 md:px-6 lg:px-8">
      <div className="h-6 w-48 rounded-full bg-slate-200" />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
            <div className="flex gap-5">
              <div className="h-28 w-28 shrink-0 rounded-3xl bg-slate-200" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-2/3 rounded-xl bg-slate-200" />
                <div className="h-5 w-40 rounded-lg bg-slate-100" />
                <div className="flex flex-wrap gap-3">
                  <div className="h-4 w-28 rounded-lg bg-slate-100" />
                  <div className="h-4 w-36 rounded-lg bg-slate-100" />
                  <div className="h-4 w-32 rounded-lg bg-slate-100" />
                  <div className="h-4 w-28 rounded-lg bg-slate-100" />
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-24 rounded-full bg-slate-100" />
                  <div className="h-8 w-28 rounded-full bg-slate-100" />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-(--color-border) pt-5">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="h-12 rounded-2xl bg-slate-200" />
                <div className="h-12 rounded-2xl bg-slate-100" />
                <div className="h-12 rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-slate-100" />
                <div className="h-6 w-40 rounded-lg bg-slate-200" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-11/12 rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm">
          <div className="h-7 w-40 rounded-lg bg-slate-200" />
          <div className="mt-6 space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 rounded bg-slate-100" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-12 rounded-2xl bg-slate-200" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-2 text-(--color-muted)">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-[15px] font-medium">
          Đang tải chi tiết công việc...
        </span>
      </div>
    </div>
  );
}
