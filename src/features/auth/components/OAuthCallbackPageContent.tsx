"use client";

import { Loader2 } from "lucide-react";
import { useOAuthCallback } from "../hooks/useOAuthCallback";

export default function OAuthCallbackPageContent() {
  useOAuthCallback();

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-surface) px-6">
      <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-white p-8 text-center shadow-xl">
        <div className="mb-4 flex justify-center">
          <Loader2 className="animate-spin text-(--color-primary)" size={32} />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-(--color-primary)">
          Đang xử lý đăng nhập Google
        </h1>

        <p className="text-slate-600">Vui lòng chờ trong giây lát...</p>
      </div>
    </main>
  );
}
