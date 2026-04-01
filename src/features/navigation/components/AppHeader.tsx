"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, Menu, X, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { CompanyProfile } from "@/features/company/types/company.types";
import { getMyCompany } from "@/features/company/api/company.api";
import {
  adminNav,
  recruiterNav,
  recruiterPendingNav,
  studentNav,
} from "../config/header-nav.config";
import HeaderNav from "./HeaderNav";
import HeaderNotification from "./HeaderNotification";
import HeaderUserMenu from "./HeaderUserMenu";

export default function AppHeader() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (user?.role !== "COMPANY") return;

    let mounted = true;

    getMyCompany()
      .then((res) => {
        if (mounted) setCompany(res.data ?? null);
      })
      .catch(() => {
        if (mounted) setCompany(null);
      });

    return () => {
      mounted = false;
    };
  }, [user?.role]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openMobile) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  const headerState = useMemo(() => {
    if (!user) return null;

    if (user.role === "STUDENT") {
      return {
        roleLabel: "Sinh viên",
        name: user.full_name || user.email.split("@")[0],
        avatarUrl: user.avatar_url,
        navItems: studentNav,
        pendingBadge: null,
      };
    }

    if (user.role === "ADMIN") {
      return {
        roleLabel: "Quản trị viên",
        name: user.full_name || user.email.split("@")[0],
        avatarUrl: user.avatar_url,
        navItems: adminNav,
        pendingBadge: null,
      };
    }

    const isApproved = company?.status === "APPROVED";

    return {
      roleLabel: "Nhà tuyển dụng",
      name: user.full_name || company?.company_name || user.email.split("@")[0],
      avatarUrl: user.avatar_url || company?.logo_url || null,
      navItems: isApproved ? recruiterNav : recruiterPendingNav,
      pendingBadge: isApproved ? null : "Chờ duyệt",
    };
  }, [user, company]);

  const homeHref = useMemo(() => {
    if (!user) return "/login";

    if (user.role === "STUDENT") return "/student/dashboard";
    if (user.role === "ADMIN") return "/admin/dashboard";

    return company?.status === "APPROVED"
      ? "/recruiter/dashboard"
      : "/recruiter/profile";
  }, [user, company]);

  const handleLogout = () => {
    setOpenMobile(false);
    logout();
    router.replace("/login");
  };

  if (isLoading || !user || !headerState) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-120 border-b border-white/10 bg-[#1E3A8A]/95 text-white backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "px-4 py-2.5 shadow-[0_14px_32px_rgba(15,23,42,0.16)] md:px-5"
            : "px-4 py-3 md:px-5"
        }`}
      >
        <div className="flex items-center gap-4 lg:gap-8">
          <Link
            href={homeHref}
            className="flex min-w-0 shrink-0 items-center gap-3"
          >
            <div
              className={`flex items-center justify-center rounded-[14px] bg-cyan-500 text-white shadow-[0_8px_20px_rgba(6,182,212,0.28)] transition-all duration-300 ${
                isScrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <BriefcaseBusiness size={isScrolled ? 18 : 20} />
            </div>

            <div className="min-w-0 leading-tight">
              <p
                className={`truncate font-bold text-white transition-all duration-300 ${
                  isScrolled ? "text-[1.22rem]" : "text-[1.35rem]"
                }`}
              >
                Kết nối Việc làm
              </p>

              <div className="mt-1 flex items-center gap-2">
                <p className="truncate text-[0.92rem] font-medium text-white/82">
                  {headerState.roleLabel}
                </p>

                {headerState.pendingBadge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1 text-[0.8rem] font-bold text-amber-900">
                    <BadgeCheck size={13} />
                    {headerState.pendingBadge}
                  </span>
                )}
              </div>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center xl:flex">
            <HeaderNav items={headerState.navItems} />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
            <HeaderNotification />
            <div className="hidden h-8 w-px bg-white/15 md:block" />
            <HeaderUserMenu
              name={headerState.name}
              roleLabel={headerState.roleLabel}
              avatarUrl={headerState.avatarUrl}
            />

            <button
              type="button"
              className="rounded-xl p-2 text-white transition hover:bg-white/12 xl:hidden"
              onClick={() => setOpenMobile(true)}
              aria-label="Mở menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {openMobile && (
        <div className="fixed inset-0 z-200 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            onClick={() => setOpenMobile(false)}
            aria-label="Đóng menu"
          />

          <div className="absolute right-0 top-0 flex h-full w-75 max-w-[86vw] flex-col bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-[#111827]">Menu</p>
                <p className="text-sm text-slate-500">
                  {headerState.roleLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Đóng menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-2">
                {headerState.navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMobile(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[1rem] font-semibold transition ${
                        isActive
                          ? "bg-[#E0F7FA] text-[#06B6D4]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={19} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-[1rem] font-semibold text-red-500 transition hover:bg-red-100"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
