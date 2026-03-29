"use client";

import { useEffect } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import OtpVerificationModal from "./OtpVerificationModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { useForgotPasswordFlow } from "@/features/auth/hooks/useForgotPasswordFlow";

type ForgotPasswordFlowProps = {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ForgotPasswordFlow({
  trigger,
  open,
  onOpenChange,
}: ForgotPasswordFlowProps) {
  const {
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
    isSendingEmail,
    isVerifyingOtp,
    isResettingPassword,
  } = useForgotPasswordFlow();

  useEffect(() => {
    if (open) {
      openForgotPassword();
    } else if (open === false && isOpen) {
      closeForgotPassword();
    }
  }, [open, isOpen, openForgotPassword, closeForgotPassword]);

  const handleClose = () => {
    closeForgotPassword();
    onOpenChange?.(false);
  };

  return (
    <>
      {trigger ? (
        <span
          onClick={() => {
            openForgotPassword();
            onOpenChange?.(true);
          }}
          className="inline-block"
        >
          {trigger}
        </span>
      ) : null}

      <ForgotPasswordModal
        isOpen={isOpen && step === "email"}
        email={email}
        onEmailChange={setEmail}
        onClose={handleClose}
        onCancel={handleClose}
        onSubmit={submitEmail}
        isLoading={isSendingEmail}
      />

      <OtpVerificationModal
        isOpen={isOpen && step === "otp"}
        email={email}
        otp={otp}
        countdown={countdown}
        onOtpChange={setOtp}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={submitOtp}
        onResend={resendOtp}
        isLoading={isVerifyingOtp}
      />

      <ResetPasswordModal
        isOpen={isOpen && step === "reset"}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onClose={handleClose}
        onCancel={handleClose}
        onSubmit={submitResetPassword}
        isLoading={isResettingPassword}
      />
    </>
  );
}
