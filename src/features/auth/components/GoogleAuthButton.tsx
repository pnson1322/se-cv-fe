"use client";

import { Chrome } from "lucide-react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useGoogleAuth();

  return (
    <button
      type="button"
      onClick={loginWithGoogle}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#111827] shadow-sm transition hover:bg-slate-50"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Chrome size={20} strokeWidth={2.2} />
      </div>
      <span>Nhà tuyển dụng đăng nhập với Google</span>
    </button>
  );
}
