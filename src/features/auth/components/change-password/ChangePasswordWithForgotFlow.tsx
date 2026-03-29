"use client";

import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import ForgotPasswordFlow from "../forgot-password/ForgotPasswordFlow";
import { useChangePasswordFlow } from "@/features/auth/hooks/useChangePasswordFlow";

type ChangePasswordWithForgotFlowProps = {
  trigger: React.ReactNode;
};

export default function ChangePasswordWithForgotFlow({
  trigger,
}: ChangePasswordWithForgotFlowProps) {
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const {
    isOpen,
    openChangePassword,
    closeChangePassword,
    submitChangePassword,
    isChangingPassword,
  } = useChangePasswordFlow();

  return (
    <>
      <span onClick={openChangePassword} className="inline-block">
        {trigger}
      </span>

      <ChangePasswordModal
        isOpen={isOpen}
        isLoading={isChangingPassword}
        onClose={closeChangePassword}
        onCancel={closeChangePassword}
        onSubmit={submitChangePassword}
        onForgotPassword={() => {
          closeChangePassword();
          setIsForgotOpen(true);
        }}
      />

      <ForgotPasswordFlow open={isForgotOpen} onOpenChange={setIsForgotOpen} />
    </>
  );
}
