"use client";

import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, Menu, X, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppHeader } from "../hooks/useAppHeader";
import HeaderNav from "./HeaderNav";
import HeaderNotification from "./HeaderNotification";
import HeaderUserMenu from "./HeaderUserMenu";

export default function AppHeader() {
  const pathname = usePathname();

  const {
    isReady,
    isScrolled,
    openMobile,
    headerState,
    homeHref,
    handleLogout,
    closeMobileMenu,
    openMobileMenu,
    setIsNotificationOpen,
  } = useAppHeader();

  if (!isReady || !headerState) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-120 border-b border-white/10 bg-[#1E3A8A]/95 text-white backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "px-4 py-2.5 shadow-[0_14px_32px_rgba(15,23,42,0.16)] md:px-5"
            : "px-4 py-3 md:px-5"
        }`}
      >
        <div className="flex min-w-0 items-center gap-4 lg:gap-8">
          <Link
            href={homeHref}
            className="flex shrink-0 items-center gap-3"
          >
            <div
              className={`flex shrink-0 items-center justify-center rounded-[14px] bg-cyan-500 text-white shadow-[0_8px_20px_rgba(6,182,212,0.28)] transition-all duration-300 ${
                isScrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <BriefcaseBusiness size={isScrolled ? 18 : 20} />
            </div>

            <div className="hidden min-w-0 leading-tight 2xl:block">
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

          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <HeaderNotification onOpenChange={setIsNotificationOpen} />
            <div className="hidden h-8 w-px bg-white/15 md:block" />
            <HeaderUserMenu
              name={headerState.name}
              roleLabel={headerState.roleLabel}
              avatarUrl={headerState.avatarUrl}
            />

            <button
              type="button"
              className="rounded-xl p-2 text-white transition hover:bg-white/12 xl:hidden"
              onClick={openMobileMenu}
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
            onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
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
                      onClick={closeMobileMenu}
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
