"use client";

import { useMemo, useState } from "react";
import { useUpdateCoverImageCompanyMutation } from "./useCompanyMutations";

type Params = {
  onClose: () => void;
};

export function useEditCoverImageModal({ onClose }: Params) {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const mutation = useUpdateCoverImageCompanyMutation();

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const validateFile = (selectedFile: File | null) => {
    if (!selectedFile) return "Vui lòng chọn ảnh bìa.";
    if (!["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
      return "Chỉ hỗ trợ JPG hoặc PNG.";
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      return "Ảnh bìa phải nhỏ hơn 5MB.";
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
