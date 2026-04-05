"use client";

import { useState } from "react";
import type { CompanyProfile } from "../types/company.types";
import { useUpdateDetailCompanyMutation } from "./useCompanyMutations";

type Params = {
  company: CompanyProfile;
  onClose: () => void;
};

export const COMPANY_SIZE_OPTIONS = [
  { label: "1-10 nhân viên", value: "1-10" },
  { label: "11-50 nhân viên", value: "11-50" },
  { label: "50-100 nhân viên", value: "50-100" },
  { label: "100-500 nhân viên", value: "100-500" },
  { label: "500+ nhân viên", value: "500+" },
];

export function useEditDetailModal({ company, onClose }: Params) {
  const [industry, setIndustry] = useState(company.industry || "");
  const [companySize, setCompanySize] = useState(company.companySize || "");
  const [address, setAddress] = useState(company.address || "");

  const mutation = useUpdateDetailCompanyMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({
      industry: industry.trim(),
      company_size: companySize || null,
      address: address.trim() || null,
    });

    onClose();
  };

  return {
    industry,
    companySize,
    address,
    setIndustry,
    setCompanySize,
    setAddress,
    handleSubmit,
    isSaving: mutation.isPending,
  };
}
