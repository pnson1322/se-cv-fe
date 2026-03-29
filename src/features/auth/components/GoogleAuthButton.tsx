"use client";

import { Chrome } from "lucide-react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useGoogleAuth();

  return (
    <button
      type="button"
      onClick={loginWithGoogle}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-(--color-border) bg-white px-4 py-3 font-medium text-(--color-text) shadow-sm transition hover:bg-slate-50"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
        <Chrome size={16} strokeWidth={2.2} />
      </div>
      <span>Đăng nhập bằng Google</span>
    </button>
  );
}
