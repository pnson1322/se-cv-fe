"use client";

import { ImageUp } from "lucide-react";
import type { CompanyProfile } from "../../types/company.types";
import { useEditLogoModal } from "../../hooks/useEditLogoModal";
import CompanyEditModal from "./CompanyEditModal";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function EditLogoModal({ open, company, onClose }: Props) {
  const { previewUrl, errorMessage, isSaving, handleChangeFile, handleSubmit } =
    useEditLogoModal({
      company,
      onClose,
    });

  return (
    <CompanyEditModal
      open={open}
      title="Đổi logo công ty"
      onClose={onClose}
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
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="group flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Logo preview"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            ) : null}
          </div>
        </div>

        <label className="group block cursor-pointer">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={(e) => handleChangeFile(e.target.files?.[0] || null)}
          />

          <div className="flex min-h-33 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition duration-200 hover:border-cyan-400 hover:bg-cyan-50/40">
            <div className="flex flex-col items-center gap-3 text-slate-500 transition group-hover:text-cyan-600">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:bg-cyan-100">
                <ImageUp size={28} />
              </div>
              <p className="text-[15px] font-medium">
                Click để chọn ảnh logo mới
              </p>
            </div>
          </div>
        </label>

        <p className="text-[14px] text-slate-500">
          Khuyến nghị: 400x400px, định dạng JPG/PNG, dưới 2MB
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
