"use client";

import { Mail, Send, X } from "lucide-react";

type ForgotPasswordModalProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isOpen: boolean;
  isLoading?: boolean;
};

export default function ForgotPasswordModal({
  email,
  onEmailChange,
  onClose,
  onCancel,
  onSubmit,
  isOpen,
  isLoading = false,
}: ForgotPasswordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-140 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-(--color-border) px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Mail size={22} />
            </div>
            <h2 className="text-2xl font-bold text-(--color-text)">
              Quên mật khẩu
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

        <div className="px-6 py-6">
          <p className="mb-6 text-base leading-7 text-slate-500">
            Nhập địa chỉ email bạn đã đăng ký. Chúng tôi sẽ gửi mã xác nhận để
            bạn có thể đặt lại mật khẩu.
          </p>

          <div>
            <label className="mb-2 block text-base font-semibold text-(--color-text)">
              Email <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--color-border) px-4 py-3">
              <Mail className="text-slate-400" size={20} />
              <input
                type="text"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="email@example.com"
                className="w-full text-base text-(--color-text) outline-none placeholder:text-slate-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSubmit();
                  }
                }}
              />
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
            className="inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-6 py-3 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            <Send size={18} />
            {isLoading ? "Đang gửi..." : "Gửi mã xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
