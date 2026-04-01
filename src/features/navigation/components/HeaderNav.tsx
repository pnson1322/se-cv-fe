"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "../config/header-nav.config";

export default function HeaderNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 xl:flex">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-[18px] px-5 py-2.5 text-[1.04rem] font-semibold transition-all duration-200 ${
              isActive
                ? "bg-white text-[#06B6D4] shadow-[0_6px_18px_rgba(255,255,255,0.18)]"
                : "text-white/88 hover:bg-white/14 hover:text-white"
            }`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
