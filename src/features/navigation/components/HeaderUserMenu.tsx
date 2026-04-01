"use client";

import Image from "next/image";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  roleLabel: string;
  avatarUrl?: string | null;
};

export default function HeaderUserMenu({ name, roleLabel, avatarUrl }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl px-2.5 py-1.5 text-white transition hover:bg-white/12"
      >
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cyan-500 shadow-[0_8px_18px_rgba(6,182,212,0.28)]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={21} />
          )}
        </div>

        <div className="text-left leading-tight">
          <p className="max-w-35 truncate text-[1.05rem] font-bold">{name}</p>
          <p className="mt-0.5 text-[0.9rem] text-white/82">{roleLabel}</p>
        </div>

        <ChevronDown size={17} className="ml-0.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-210 w-65 overflow-hidden rounded-[22px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
          <div className="bg-linear-to-r from-cyan-500 to-cyan-600 px-5 py-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/18">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={22} />
                )}
              </div>

              <div>
                <p className="max-w-37.5 truncate text-[1.3rem] font-bold leading-tight">
                  {name}
                </p>
                <p className="mt-1 text-[0.95rem] text-white/90">{roleLabel}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-[1rem] font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
