"use client";

import { useMemo, useState } from "react";
import type { CompanyProfile } from "../types/company.types";
import { useUpdateLogoCompanyMutation } from "./useCompanyMutations";

type Params = {
  company: CompanyProfile;
  onClose: () => void;
};

export function useEditLogoModal({ company, onClose }: Params) {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useUpdateLogoCompanyMutation();

  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return company.logoUrl || null;
  }, [file, company.logoUrl]);

  const validateFile = (selectedFile: File | null) => {
    if (!selectedFile) return "Vui lòng chọn ảnh logo.";
    if (!["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
      return "Chỉ hỗ trợ JPG hoặc PNG.";
    }
    if (selectedFile.size > 2 * 1024 * 1024) {
      return "Logo phải nhỏ hơn 2MB.";
    }
    return "";
  };

  const handleChangeFile = (selectedFile: File | null) => {
    const validationError = validateFile(selectedFile);

    if (validationError) {
      setErrorMessage(validationError);
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const validationError = validateFile(file);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!file) return;

    await mutation.mutateAsync(file);
    onClose();
  };

  return {
    file,
    previewUrl,
    errorMessage,
    isSaving: mutation.isPending,
    handleChangeFile,
    handleSubmit,
  };
}
