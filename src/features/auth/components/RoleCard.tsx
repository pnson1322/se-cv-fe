import Link from "next/link";
import type { Role } from "../constants/roles";
import { ROLE_CONFIG } from "../constants/roles";

type RoleCardProps = {
  role: Role;
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

export default function RoleCard({ role }: RoleCardProps) {
  const config = ROLE_CONFIG[role];

  return (
    <Link
      href={config.loginPath}
      className="block rounded-2xl bg-(--color-surface) p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl">
        {getIcon(role)}
      </div>

      <h2 className="mb-3 text-center text-2xl font-bold text-(--color-text)">
        {config.title}
      </h2>

      <p className="text-center text-base leading-7 text-slate-600">
        {config.description}
      </p>
    </Link>
  );
}
