"use client";

import { useState } from "react";
import type { CompanyProfile } from "../types/company.types";
import { useUpdateDescriptionCompanyMutation } from "./useCompanyMutations";

type Params = {
  company: CompanyProfile;
  onClose: () => void;
};

export function useEditDescriptionModal({ company, onClose }: Params) {
  const [description, setDescription] = useState(company.description || "");
  const mutation = useUpdateDescriptionCompanyMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({
      description: description.trim(),
    });

    onClose();
  };

  return {
    description,
    setDescription,
    handleSubmit,
    isSaving: mutation.isPending,
    characterCount: description.length,
  };
}
