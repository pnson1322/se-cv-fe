import type { ReactNode } from "react";
import { UserPlus } from "lucide-react";

type RecruiterRegisterCardProps = {
  children: ReactNode;
};

export default function RecruiterRegisterCard({
  children,
}: RecruiterRegisterCardProps) {
  return (
    <div className="w-full max-w-130 rounded-[28px] border border-white/70 bg-white px-6 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] sm:px-8 sm:py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-md">
          <UserPlus size={24} strokeWidth={2.2} />
        </div>

        <h1 className="text-[2rem] font-bold tracking-[-0.02em] text-[#1E3A8A]">
          Đăng ký tài khoản
        </h1>

        <p className="mt-2 text-base text-slate-500">Nhà tuyển dụng</p>
      </div>

      {children}
    </div>
  );
}
