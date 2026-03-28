import Link from "next/link";
import type { ReactNode } from "react";
import { UserPlus } from "lucide-react";

type RecruiterRegisterCardProps = {
  children: ReactNode;
};

export default function RecruiterRegisterCard({
  children,
}: RecruiterRegisterCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-md">
          <UserPlus size={34} strokeWidth={2.2} />
        </div>

        <h1 className="text-3xl font-bold text-(--color-primary)">
          Đăng ký tài khoản
        </h1>

        <p className="mt-2 text-lg text-slate-600">Nhà tuyển dụng</p>

        <Link
          href="/login/recruiter"
          className="mt-3 inline-block text-sm font-medium text-(--color-accent) hover:underline"
        >
          ← Quay lại đăng nhập
        </Link>
      </div>

      {children}
    </div>
  );
}
