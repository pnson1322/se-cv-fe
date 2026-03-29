"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { changePassword } from "../api/auth.api";
import { useAuth } from "./useAuth";

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  errors?: unknown;
};

export function useChangePasswordFlow() {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const openChangePassword = () => {
    setIsOpen(true);
  };

  const closeChangePassword = () => {
    setIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      toast.success(
        typeof response.message === "string"
          ? response.message
          : "Đổi mật khẩu thành công",
      );
      closeChangePassword();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Không thể đổi mật khẩu");
    },
  });

  const submitChangePassword = (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!user?.user_id) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    if (!values.oldPassword || !values.newPassword || !values.confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (values.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    if (values.oldPassword === values.newPassword) {
      toast.error("Mật khẩu mới phải khác mật khẩu cũ");
      return;
    }

    mutation.mutate({
      userId: user.user_id,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };

  return {
    isOpen,
    openChangePassword,
    closeChangePassword,
    submitChangePassword,
    isChangingPassword: mutation.isPending,
  };
}
