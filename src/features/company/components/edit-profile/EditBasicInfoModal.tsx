"use client";

import type { CompanyProfile } from "../../types/company.types";
import { useEditBasicInfoModal } from "../../hooks/useEditBasicInfoModal";
import CompanyEditModal from "./CompanyEditModal";
import CompanyFormField from "./CompanyFormField";
import CompanyModalActions from "./CompanyModalActions";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function EditBasicInfoModal({ open, company, onClose }: Props) {
  const {
    companyName,
    slogan,
    setCompanyName,
    setSlogan,
    handleSubmit,
    isSaving,
  } = useEditBasicInfoModal({
    company,
    onClose,
  });

  return (
    <CompanyEditModal
      open={open}
      title="Chỉnh sửa thông tin cơ bản"
      onClose={onClose}
      footer={<CompanyModalActions isSaving={isSaving} onCancel={onClose} />}
    >
      <form
        id="company-edit-form"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <CompanyFormField label="Tên công ty" required>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="Nhập tên công ty"
            required
          />
        </CompanyFormField>

        <CompanyFormField label="Slogan/Tagline">
          <input
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="Nhập slogan"
          />
        </CompanyFormField>
      </form>
    </CompanyEditModal>
  );
}
