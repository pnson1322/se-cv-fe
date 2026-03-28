import Link from "next/link";
import type { Role } from "../constants/roles";
import { ROLE_CONFIG } from "../constants/roles";
import { Building2, Shield, User } from "lucide-react";

type RoleCardProps = {
  role: Role;
};

function RoleIcon({ role }: { role: Role }) {
  switch (role) {
    case "STUDENT":
      return <User size={34} strokeWidth={2.2} />;
    case "COMPANY":
      return <Building2 size={34} strokeWidth={2.2} />;
    case "ADMIN":
      return <Shield size={34} strokeWidth={2.2} />;
    default:
      return <User size={34} strokeWidth={2.2} />;
  }
}

export default function RoleCard({ role }: RoleCardProps) {
  const config = ROLE_CONFIG[role];

  return (
    <Link
      href={config.loginPath}
      className="group block rounded-2xl border border-(--color-border) bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary)/10 text-4xl text-(--color-primary)">
        <RoleIcon role={role} />
      </div>

      <h2 className="mb-3 text-center text-2xl font-bold text-(--color-text)">
        {config.title}
      </h2>

      <p className="mb-6 text-center text-sm leading-6 text-slate-600">
        {config.description}
      </p>

      <p className="text-center text-sm font-medium text-(--color-accent) transition group-hover:underline">
        Tiếp tục →
      </p>
    </Link>
  );
}
