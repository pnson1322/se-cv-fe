"use client";

import { ImageUp } from "lucide-react";
import { useEditCoverImageModal } from "../../hooks/useEditCoverImageModal";
import CompanyEditModal from "./CompanyEditModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EditCoverImageModal({ open, onClose }: Props) {
  const { previewUrl, errorMessage, isSaving, handleChangeFile, handleSubmit } =
    useEditCoverImageModal({
      onClose,
    });

  return (
    <CompanyEditModal
      open={open}
      title="Đổi ảnh bìa"
      onClose={onClose}
      maxWidthClassName="max-w-[720px]"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Đang tải lên..." : "Tải lên"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <label className="group block cursor-pointer">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={(e) => handleChangeFile(e.target.files?.[0] || null)}
          />

          <div className="flex min-h-45 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-[#29489F] to-[#18B7D9] p-6 text-center text-white transition duration-200 hover:shadow-md">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-60 w-full rounded-xl object-cover transition duration-300 group-hover:scale-[1.01]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <ImageUp size={30} />
                </div>
                <p className="text-[15px] font-medium">
                  Kéo thả ảnh vào đây hoặc click để chọn
                </p>
              </div>
            )}
          </div>
        </label>

        <p className="text-[14px] text-slate-500">
          Khuyến nghị: 1200x400px, định dạng JPG/PNG, dưới 5MB
        </p>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
            {errorMessage}
          </div>
        )}
      </div>
    </CompanyEditModal>
  );
}
