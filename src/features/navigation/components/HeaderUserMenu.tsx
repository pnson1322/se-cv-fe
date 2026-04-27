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
        className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-white transition-all duration-200 ${
          open ? "bg-white/18" : "hover:bg-white/12"
        }`}
      >
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-cyan-500 shadow-[0_4px_12px_rgba(6,182,212,0.25)]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={17} />
          )}
        </div>

        <div className="text-left leading-tight">
          <p className="max-w-28 truncate text-[14px] font-semibold">{name}</p>
          <p className="mt-0.5 text-[12px] text-white/72">{roleLabel}</p>
        </div>

        <ChevronDown
          size={14}
          className={`ml-0.5 text-white/70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-210 w-60 animate-[fadeSlideDown_150ms_ease-out] overflow-hidden rounded-xl bg-white shadow-[0_12px_36px_rgba(15,23,42,0.12)]">
          <div className="bg-linear-to-r from-cyan-500 to-cyan-600 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/18">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={18} />
                )}
              </div>

              <div className="min-w-0">
                <p className="max-w-32 truncate text-[15px] font-bold leading-tight">
                  {name}
                </p>
                <p className="mt-0.5 text-[12px] text-white/90">
                  {roleLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 px-2 py-1.5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={15} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
