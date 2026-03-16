import Link from "next/link";
import type { ReactNode } from "react";
import type { Role } from "../constants/roles";
import { ROLE_CONFIG } from "../constants/roles";

type AuthCardProps = {
  role: Role;
  children: ReactNode;
};

function getIcon(role: Role) {
  switch (role) {
    case "student":
      return "👤";
    case "recruiter":
      return "🏢";
    case "admin":
      return "🛡️";
    default:
      return "•";
  }
}

export default function AuthCard({ role, children }: AuthCardProps) {
  const config = ROLE_CONFIG[role];

  return (
    <div className="w-full max-w-md rounded-2xl bg-(--color-surface) p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-accent) text-4xl text-white">
          {getIcon(role)}
        </div>

        <h1 className="text-4xl font-bold text-(--color-text)">Đăng nhập</h1>
        <p className="mt-2 text-xl text-slate-600">{config.title}</p>

        <Link
          href="/"
          className="mt-3 inline-block text-base font-medium text-(--color-accent) hover:underline"
        >
          Chọn vai trò khác
        </Link>
      </div>

      {children}
    </div>
  );
}
