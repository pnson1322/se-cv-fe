import type { ReactNode } from "react";
import { LogIn } from "lucide-react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-130 rounded-[28px] border border-white/70 bg-white px-6 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:px-8 sm:py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-md">
          <LogIn size={24} />
        </div>

        <h1 className="text-[2rem] font-bold tracking-[-0.02em] text-[#1E3A8A]">
          Đăng nhập
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Dành cho sinh viên, nhà tuyển dụng và quản trị viên
        </p>
      </div>

      {children}
    </div>
  );
}
