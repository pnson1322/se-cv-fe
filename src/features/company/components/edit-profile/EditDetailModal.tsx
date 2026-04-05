"use client";

import CustomSelect from "@/components/CustomSelect";
import type { CompanyProfile } from "../../types/company.types";
import {
  COMPANY_SIZE_OPTIONS,
  useEditDetailModal,
} from "../../hooks/useEditDetailModal";
import CompanyEditModal from "./CompanyEditModal";
import CompanyFormField from "./CompanyFormField";
import CompanyModalActions from "./CompanyModalActions";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function EditDetailModal({ open, company, onClose }: Props) {
  const {
    industry,
    companySize,
    address,
    setIndustry,
    setCompanySize,
    setAddress,
    handleSubmit,
    isSaving,
  } = useEditDetailModal({
    company,
    onClose,
  });

  return (
    <CompanyEditModal
      open={open}
      title="Chỉnh sửa thông tin chi tiết"
      onClose={onClose}
      footer={<CompanyModalActions isSaving={isSaving} onCancel={onClose} />}
    >
      <form
        id="company-edit-form"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <CompanyFormField label="Ngành nghề" required>
          <input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="Nhập ngành nghề"
            required
          />
        </CompanyFormField>

        <CompanyFormField label="Quy mô" required>
          <CustomSelect
            label=""
            placeholder="Chọn quy mô"
            value={companySize}
            options={COMPANY_SIZE_OPTIONS}
            onChange={setCompanySize}
          />
        </CompanyFormField>

        <CompanyFormField label="Địa chỉ văn phòng" required>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-[15px] leading-7 text-slate-800 outline-none transition focus:border-cyan-400"
            placeholder="Nhập địa chỉ văn phòng"
            required
          />
        </CompanyFormField>
      </form>
    </CompanyEditModal>
  );
}
