"use client";

import { useState } from "react";
import type { CompanyProfile } from "../types/company.types";
import { useUpdateContactCompanyMutation } from "./useCompanyMutations";

type Params = {
  company: CompanyProfile;
  onClose: () => void;
};

export function useEditContactModal({ company, onClose }: Params) {
  const [website, setWebsite] = useState(company.website || "");
  const [contactEmail, setContactEmail] = useState(company.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(company.contactPhone || "");

  const mutation = useUpdateContactCompanyMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({
      website: website.trim() || null,
      contact_email: contactEmail.trim() || null,
      contact_phone: contactPhone.trim() || null,
    });

    onClose();
  };

  return {
    website,
    contactEmail,
    contactPhone,
    setWebsite,
    setContactEmail,
    setContactPhone,
    handleSubmit,
    isSaving: mutation.isPending,
  };
}
