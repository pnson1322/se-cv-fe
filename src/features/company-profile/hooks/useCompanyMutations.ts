"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteOfficeImage,
  updataCoverImageCompany,
  updataLogoCompany,
  updataOfficeImagesCompany,
  updateBasicInfoCompany,
  updateContactCompany,
  updateDescriptionCompany,
  updateDetailCompany,
} from "../api/company.api";
import type {
  BasicInfoBody,
  ContactBody,
  DetailBody,
} from "../types/company.types";
import { getApiErrorMessage } from "@/utils/api-error";

function useInvalidateCompanyProfile() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ["company-profile"],
    });
  };
}

export function useUpdateBasicInfoCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (payload: BasicInfoBody) => updateBasicInfoCompany(payload),
    onSuccess: async () => {
      toast.success("Cập nhật thông tin cơ bản thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateDescriptionCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (payload: { description: string }) =>
      updateDescriptionCompany(payload),
    onSuccess: async () => {
      toast.success("Cập nhật mô tả thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateContactCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (payload: ContactBody) => updateContactCompany(payload),
    onSuccess: async () => {
      toast.success("Cập nhật thông tin liên hệ thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateDetailCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (payload: DetailBody) => updateDetailCompany(payload),
    onSuccess: async () => {
      toast.success("Cập nhật thông tin chi tiết thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateLogoCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (file: File) => updataLogoCompany(file),
    onSuccess: async () => {
      toast.success("Đổi logo thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateCoverImageCompanyMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (file: File) => updataCoverImageCompany(file),
    onSuccess: async () => {
      toast.success("Đổi ảnh bìa thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useAddOfficeImageMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (file: File) => updataOfficeImagesCompany([file]),
    onSuccess: async () => {
      toast.success("Thêm ảnh thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteOfficeImageMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: (id: string) => deleteOfficeImage(id),
    onSuccess: async () => {
      toast.success("Xóa ảnh thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useReplaceOfficeImageMutation() {
  const invalidate = useInvalidateCompanyProfile();

  return useMutation({
    mutationFn: async ({ imageId, file }: { imageId: number; file: File }) => {
      await deleteOfficeImage(String(imageId));
      await updataOfficeImagesCompany([file]);
    },
    onSuccess: async () => {
      toast.success("Thay ảnh thành công");
      await invalidate();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
