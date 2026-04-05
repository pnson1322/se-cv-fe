"use client";

import { Loader2 } from "lucide-react";
import type { OfficeImage } from "../../types/company.types";

type Props = {
  image: OfficeImage;
  isBusy?: boolean;
  onDelete: (imageId: number) => void;
  onReplace: (imageId: number, file: File | null) => void;
};

export default function OfficeImageTile({
  image,
  isBusy = false,
  onDelete,
  onReplace,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-1.75/1 w-full overflow-hidden">
        <img
          src={image.imageUrl}
          alt="Office"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="absolute inset-0 bg-black/35 opacity-0 transition duration-200 group-hover:opacity-100" />

      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition duration-200 group-hover:opacity-100">
        <label
          className={`inline-flex cursor-pointer items-center rounded-2xl bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 ${
            isBusy ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {isBusy ? <Loader2 size={16} className="animate-spin" /> : "Thay thế"}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            disabled={isBusy}
            onChange={(e) =>
              onReplace(image.imageId, e.target.files?.[0] || null)
            }
          />
        </label>

        <button
          type="button"
          onClick={() => onDelete(image.imageId)}
          disabled={isBusy}
          className="inline-flex items-center rounded-2xl bg-red-500 px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? <Loader2 size={16} className="animate-spin" /> : "Xóa"}
        </button>
      </div>
    </div>
  );
}
