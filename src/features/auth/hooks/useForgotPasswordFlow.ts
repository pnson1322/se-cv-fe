"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { forgotPassword, verifyOtp, resetPassword } from "../api/auth.api";

type Step = "email" | "otp" | "reset" | null;

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
};

export function useForgotPasswordFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(54);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    if (step !== "otp" || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, step]);

  const otpValue = useMemo(() => otp.join(""), [otp]);

  const openForgotPassword = () => {
    setIsOpen(true);
    setStep("email");
  };

  const closeForgotPassword = () => {
    setIsOpen(false);
    setStep(null);
    setOtp(["", "", "", "", "", ""]);
    setCountdown(54);
    setPassword("");
    setConfirmPassword("");
    setResetToken("");
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.",
      );
      setOtp(["", "", "", "", "", ""]);
      setCountdown(54);
      setStep("otp");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Không thể gửi mã xác nhận");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      setResetToken(response.data.resetToken);
      toast.success("Xác nhận OTP thành công");
      setStep("reset");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "OTP không hợp lệ");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response.message || "Đổi mật khẩu thành công");
      closeForgotPassword();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Không thể đặt lại mật khẩu",
      );
    },
  });

  const submitEmail = () => {
    if (!email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
      toast.error("Email không đúng định dạng");
      return;
    }

    forgotPasswordMutation.mutate({ email: email.trim() });
  };

  const submitOtp = () => {
    if (otpValue.length !== 6) {
      toast.error("Vui lòng nhập đủ 6 số OTP");
      return;
    }

    verifyOtpMutation.mutate({
      email: email.trim(),
      otp: otpValue,
    });
  };

  const resendOtp = () => {
    if (countdown > 0) return;

    if (email.trim()) {
      toast.error("Thiếu email để gửi lại OTP");
      return;
    }

    forgotPasswordMutation.mutate({ email: email.trim() });
  };

  const submitResetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ mật khẩu");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    resetPasswordMutation.mutate({
      resetToken,
      newPassword: password,
      confirmPassword,
    });
  };

  return {
    isOpen,
    step,
    email,
    setEmail,
    otp,
    setOtp,
    countdown,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    openForgotPassword,
    closeForgotPassword,

    submitEmail,
    submitOtp,
    resendOtp,
    submitResetPassword,

    isSendingEmail: forgotPasswordMutation.isPending,
    isVerifyingOtp: verifyOtpMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
  };
}
