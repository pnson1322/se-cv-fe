import type { ReactNode } from "react";
import { LogIn } from "lucide-react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-140 rounded-[30px] border border-white/70 bg-white px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:px-10 sm:py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-md">
          <LogIn size={28} />
        </div>

        <h1 className="text-[2.25rem] font-bold tracking-[-0.02em] text-[#1E3A8A]">
          Đăng nhập
        </h1>

        <p className="mt-3 text-base text-slate-500">
          Dành cho sinh viên, nhà tuyển dụng và quản trị viên
        </p>
      </div>

      {children}
    </div>
  );
}
