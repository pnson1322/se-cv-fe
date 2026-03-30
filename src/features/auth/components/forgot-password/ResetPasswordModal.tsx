"use client";

import { CheckCircle2, CheckCircle, Eye, EyeOff, Lock, X } from "lucide-react";
import { useMemo, useState } from "react";
import PasswordStrengthBar from "./PasswordStrengthBar";
import ClientPortal from "@/components/ClientPortal";

type ResetPasswordModalProps = {
  isOpen: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

export default function ResetPasswordModal({
  isOpen,
  email,
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onClose,
  onCancel,
  onSubmit,
  isLoading = false,
}: ResetPasswordModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isStrongRule = useMemo(() => {
    return hasMinLength && hasLower && hasUpper && hasNumber;
  }, [hasLower, hasMinLength, hasNumber, hasUpper]);

  const isMatch =
    !!password && !!confirmPassword && password === confirmPassword;

  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/35 px-4">
        <div className="w-full max-w-160 overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <CheckCircle size={22} />
              </div>
              <h2 className="text-2xl font-bold text-(--color-text)">
                Đặt lại mật khẩu
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 transition hover:text-slate-600"
            >
              <X size={28} />
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-base text-green-700">
              ✓ Xác thực thành công cho{" "}
              <span className="font-bold">{email}</span>
            </div>

            <div>
              <label className="mb-2 block text-base font-semibold text-(--color-text)">
                Mật khẩu mới <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
                <Lock className="text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="••••••••"
                  className="hide-password-toggle w-full text-base text-(--color-text) outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mt-3">
                <PasswordStrengthBar password={password} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-base font-semibold text-(--color-text)">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
                <Lock className="text-slate-400" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => onConfirmPasswordChange(e.target.value)}
                  placeholder="••••••••"
                  className="hide-password-toggle w-full text-base text-(--color-text) outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {!!confirmPassword && !isMatch && (
                <p className="mt-2 text-sm text-red-500">
                  Mật khẩu xác nhận không khớp
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
              <div className="mb-3 text-base font-semibold text-(--color-text)">
                Yêu cầu mật khẩu:
              </div>

              <div className="space-y-2 text-base">
                <div
                  className={`flex items-center gap-2 ${
                    hasMinLength ? "text-blue-600" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2 size={18} />
                  <span>Ít nhất 6 ký tự</span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    isStrongRule ? "text-blue-600" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2 size={18} />
                  <span>Nên bao gồm chữ hoa, chữ thường và số</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-(--color-border) bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="rounded-2xl border border-(--color-border) bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="rounded-2xl bg-(--color-accent) px-6 py-3 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
