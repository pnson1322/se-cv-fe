"use client";

import { ShieldCheck, X } from "lucide-react";
import OtpInput from "./OtpInput";
import ClientPortal from "@/components/ClientPortal";

type OtpVerificationModalProps = {
  isOpen: boolean;
  email: string;
  otp: string[];
  countdown: number;
  onOtpChange: (next: string[]) => void;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onResend: () => void;
  isLoading?: boolean;
};

export default function OtpVerificationModal({
  isOpen,
  email,
  otp,
  countdown,
  onOtpChange,
  onClose,
  onCancel,
  onConfirm,
  onResend,
  isLoading = false,
}: OtpVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/35 px-4">
        <div className="w-full max-w-130 overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <ShieldCheck size={22} />
              </div>
              <h2 className="text-2xl font-bold text-(--color-text)">
                Xác nhận mã OTP
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

          <div className="px-6 py-6 text-center">
            <p className="text-base text-slate-500">
              Mã xác nhận đã được gửi đến
            </p>
            <p className="mt-2 break-all text-xl font-bold text-(--color-text)">
              {email}
            </p>

            <div className="mt-8">
              <OtpInput value={otp} onChange={onOtpChange} />
            </div>

            <div className="mt-8 text-base text-slate-500">
              {countdown > 0 ? (
                <>
                  Gửi lại mã sau{" "}
                  <span className="font-semibold text-(--color-accent)">
                    {countdown}s
                  </span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onResend}
                  className="font-semibold text-(--color-accent) hover:underline"
                >
                  Gửi lại mã
                </button>
              )}
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
              onClick={onConfirm}
              disabled={isLoading}
              className="rounded-2xl bg-(--color-accent) px-6 py-3 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {isLoading ? "Đang xác nhận..." : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
