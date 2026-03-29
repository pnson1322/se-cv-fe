"use client";

import ForgotPasswordModal from "./ForgotPasswordModal";
import OtpVerificationModal from "./OtpVerificationModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { useForgotPasswordFlow } from "@/features/auth/hooks/useForgotPasswordFlow";

type ForgotPasswordFlowProps = {
  trigger: React.ReactNode;
};

export default function ForgotPasswordFlow({
  trigger,
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

  return (
    <>
      <span onClick={openForgotPassword} className="inline-block">
        {trigger}
      </span>

      <ForgotPasswordModal
        isOpen={isOpen && step === "email"}
        email={email}
        onEmailChange={setEmail}
        onClose={closeForgotPassword}
        onCancel={closeForgotPassword}
        onSubmit={submitEmail}
        isLoading={isSendingEmail}
      />

      <OtpVerificationModal
        isOpen={isOpen && step === "otp"}
        email={email}
        otp={otp}
        countdown={countdown}
        onOtpChange={setOtp}
        onClose={closeForgotPassword}
        onCancel={closeForgotPassword}
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
        onClose={closeForgotPassword}
        onCancel={closeForgotPassword}
        onSubmit={submitResetPassword}
        isLoading={isResettingPassword}
      />
    </>
  );
}
