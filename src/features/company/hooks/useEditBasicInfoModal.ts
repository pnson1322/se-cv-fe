"use client";

import { useState } from "react";
import type { CompanyProfile } from "../types/company.types";
import { useUpdateBasicInfoCompanyMutation } from "./useCompanyMutations";

type Params = {
  company: CompanyProfile;
  onClose: () => void;
};

export function useEditBasicInfoModal({ company, onClose }: Params) {
  const [companyName, setCompanyName] = useState(company.companyName || "");
  const [slogan, setSlogan] = useState(company.slogan || "");
  const mutation = useUpdateBasicInfoCompanyMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({
      company_name: companyName.trim(),
      slogan: slogan.trim() || null,
    });

    onClose();
  };

  return {
    companyName,
    slogan,
    setCompanyName,
    setSlogan,
    handleSubmit,
    isSaving: mutation.isPending,
  };
}
