"use client";

import { Save } from "lucide-react";

type Props = {
  isSaving?: boolean;
  onCancel: () => void;
  cancelText?: string;
  saveText?: string;
  formId?: string;
};

export default function CompanyModalActions({
  isSaving = false,
  onCancel,
  cancelText = "Hủy",
  saveText = "Lưu thay đổi",
  formId = "company-edit-form",
}: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cancelText}
      </button>

      <button
        type="submit"
        form={formId}
        disabled={isSaving}
        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save size={16} />
        {isSaving ? "Đang lưu..." : saveText}
      </button>
    </>
  );
}
