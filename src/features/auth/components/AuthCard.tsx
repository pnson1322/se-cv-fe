import Link from "next/link";
import type { ReactNode } from "react";
import type { Role } from "../constants/roles";
import { ROLE_CONFIG } from "../constants/roles";
import { Building2, Shield, User } from "lucide-react";

type AuthCardProps = {
  role: Role;
  children: ReactNode;
};

function RoleIcon({ role }: { role: Role }) {
  switch (role) {
    case "student":
      return <User size={34} strokeWidth={2.2} />;
    case "recruiter":
      return <Building2 size={34} strokeWidth={2.2} />;
    case "admin":
      return <Shield size={34} strokeWidth={2.2} />;
    default:
      return <User size={34} strokeWidth={2.2} />;
  }
}
export default function AuthCard({ role, children }: AuthCardProps) {
  const config = ROLE_CONFIG[role];

  return (
    <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary) text-4xl text-white shadow-md">
          <RoleIcon role={role} />
        </div>

        <h1 className="text-3xl font-bold text-(--color-primary)">Đăng nhập</h1>

        <p className="mt-2 text-lg text-slate-600">{config.title}</p>

        <Link
          href="/"
          className="mt-3 inline-block text-sm font-medium text-(--color-accent) hover:underline"
        >
          ← Chọn vai trò khác
        </Link>
      </div>

      {children}
    </div>
  );
}
