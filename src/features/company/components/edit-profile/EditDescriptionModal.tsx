"use client";

import type { CompanyProfile } from "../../types/company.types";
import { useEditDescriptionModal } from "../../hooks/useEditDescriptionModal";
import CompanyEditModal from "./CompanyEditModal";
import CompanyFormField from "./CompanyFormField";
import CompanyModalActions from "./CompanyModalActions";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function EditDescriptionModal({
  open,
  company,
  onClose,
}: Props) {
  const {
    description,
    setDescription,
    handleSubmit,
    isSaving,
    characterCount,
  } = useEditDescriptionModal({
    company,
    onClose,
  });

  return (
    <CompanyEditModal
      open={open}
      title="Chỉnh sửa giới thiệu công ty"
      onClose={onClose}
      maxWidthClassName="max-w-[760px]"
      footer={<CompanyModalActions isSaving={isSaving} onCancel={onClose} />}
    >
      <form
        id="company-edit-form"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <CompanyFormField label="Mô tả công ty">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] leading-7 text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="Nhập mô tả công ty"
          />
        </CompanyFormField>

        <p className="text-[13px] text-slate-500">{characterCount} ký tự</p>
      </form>
    </CompanyEditModal>
  );
}
