"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyProfile, OfficeImage } from "../types/company.types";
import {
  useAddOfficeImageMutation,
  useDeleteOfficeImageMutation,
  useReplaceOfficeImageMutation,
} from "./useCompanyMutations";

const MAX_IMAGES = 6;
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type Params = {
  open: boolean;
  company: CompanyProfile;
};

export function useOfficeImagesManager({ open, company }: Params) {
  const [images, setImages] = useState<OfficeImage[]>(
    company.officeImages || [],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [busyImageId, setBusyImageId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addInputRef = useRef<HTMLInputElement | null>(null);

  const addMutation = useAddOfficeImageMutation();
  const deleteMutation = useDeleteOfficeImageMutation();
  const replaceMutation = useReplaceOfficeImageMutation();

  useEffect(() => {
    if (!open) return;
    setImages(company.officeImages || []);
    setErrorMessage("");
    setBusyImageId(null);
    setIsAdding(false);
  }, [open, company.officeImages]);

  const validateFile = (file: File | null) => {
    if (!file) return "Vui lòng chọn ảnh.";

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Chỉ hỗ trợ JPG hoặc PNG.";
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Ảnh phải nhỏ hơn ${MAX_FILE_SIZE_MB}MB.`;
    }

    return "";
  };

  const handleAddImage = async (file: File | null) => {
    setErrorMessage("");

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!file) return;

    if (images.length >= MAX_IMAGES) {
      setErrorMessage(`Chỉ được tối đa ${MAX_IMAGES} ảnh văn phòng.`);
      return;
    }

    try {
      setIsAdding(true);
      await addMutation.mutateAsync(file);
    } catch {
      setErrorMessage("Không thể thêm ảnh. Vui lòng thử lại.");
    } finally {
      setIsAdding(false);
      if (addInputRef.current) {
        addInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    setErrorMessage("");

    const previousImages = images;
    setImages((prev) => prev.filter((item) => item.imageId !== imageId));

    try {
      setBusyImageId(imageId);
      await deleteMutation.mutateAsync(String(imageId));
    } catch {
      setImages(previousImages);
      setErrorMessage("Không thể xóa ảnh. Vui lòng thử lại.");
    } finally {
      setBusyImageId(null);
    }
  };

  const handleReplaceImage = async (imageId: number, file: File | null) => {
    setErrorMessage("");

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!file) return;

    const previousImages = images;

    try {
      setBusyImageId(imageId);
      setImages((prev) => prev.filter((item) => item.imageId !== imageId));

      await replaceMutation.mutateAsync({
        imageId,
        file,
      });
    } catch {
      setImages(previousImages);
      setErrorMessage("Không thể thay thế ảnh. Vui lòng thử lại.");
    } finally {
      setBusyImageId(null);
    }
  };

  return {
    images,
    errorMessage,
    busyImageId,
    isAdding,
    addInputRef,
    maxImages: MAX_IMAGES,
    handleAddImage,
    handleDeleteImage,
    handleReplaceImage,
  };
}
