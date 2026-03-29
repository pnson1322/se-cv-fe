"use client";

import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useMemo, useState } from "react";
import PasswordStrengthBar from "../forgot-password/PasswordStrengthBar";

type ChangePasswordModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  onForgotPassword?: () => void;
};

export default function ChangePasswordModal({
  isOpen,
  isLoading = false,
  onClose,
  onCancel,
  onSubmit,
  onForgotPassword,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = newPassword.length >= 6;
  const hasLower = /[a-z]/.test(newPassword);
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const isStrongRule = useMemo(() => {
    return hasMinLength && hasLower && hasUpper && hasNumber;
  }, [hasLower, hasMinLength, hasNumber, hasUpper]);

  const isMatch =
    !!newPassword && !!confirmPassword && newPassword === confirmPassword;

  const handleSubmit = () => {
    onSubmit({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-140 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
              <Lock size={22} />
            </div>
            <h2 className="text-2xl font-bold text-(--color-text)">
              Đổi mật khẩu
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 transition hover:text-slate-600"
          >
            <X size={28} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-base font-semibold text-(--color-text)">
              Mật khẩu cũ <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
              <Lock className="text-slate-400" size={20} />
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className="hide-password-toggle w-full text-base text-(--color-text) outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-(--color-text)">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
              <Lock className="text-slate-400" size={20} />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                className="hide-password-toggle w-full text-base text-(--color-text) outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mt-3">
              <PasswordStrengthBar password={newPassword} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-(--color-text)">
              Xác nhận mật khẩu mới <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
              <Lock className="text-slate-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className="hide-password-toggle w-full text-base text-(--color-text) outline-none placeholder:text-slate-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!!confirmPassword && !isMatch && (
              <p className="mt-2 text-sm text-red-500">
                Mật khẩu xác nhận không khớp
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-base font-medium text-(--color-accent) transition hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-(--color-border) bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="rounded-2xl border border-(--color-border) bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-2xl bg-(--color-accent) px-6 py-3 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </div>
    </div>
  );
}
