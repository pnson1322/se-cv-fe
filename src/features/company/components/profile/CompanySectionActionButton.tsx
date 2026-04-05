"use client";

import { Pencil } from "lucide-react";

export default function CompanySectionActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[0.92rem] font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      <Pencil size={15} />
      {children}
    </button>
  );
}
