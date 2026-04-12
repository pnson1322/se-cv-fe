"use client";

import type { CompanyProfile } from "../../types/company.types";
import { useEditContactModal } from "../../hooks/useEditContactModal";
import CompanyEditModal from "./CompanyEditModal";
import CompanyFormField from "./CompanyFormField";
import CompanyModalActions from "./CompanyModalActions";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function EditContactModal({ open, company, onClose }: Props) {
  const {
    website,
    contactEmail,
    contactPhone,
    setWebsite,
    setContactEmail,
    setContactPhone,
    handleSubmit,
    isSaving,
  } = useEditContactModal({
    company,
    onClose,
  });

  return (
    <CompanyEditModal
      open={open}
      title="Chỉnh sửa thông tin liên hệ"
      onClose={onClose}
      footer={<CompanyModalActions isSaving={isSaving} onCancel={onClose} />}
    >
      <form
        id="company-edit-form"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <CompanyFormField label="Website">
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="https://..."
          />
        </CompanyFormField>

        <CompanyFormField label="Email liên hệ" required>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="careers@company.com"
            required
          />
        </CompanyFormField>

        <CompanyFormField label="Số điện thoại">
          <input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="0123 456 789"
          />
        </CompanyFormField>
      </form>
    </CompanyEditModal>
  );
}
