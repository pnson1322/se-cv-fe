import type { ReactNode } from "react";
import AuthBrandPanel from "./AuthBrandPanel";

type Props = {
  children: ReactNode;
};

export default function AuthSplitLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-[#F3F4F6] p-3 md:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-360 overflow-visible rounded-4xl bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative z-30 hidden overflow-visible lg:block">
          <AuthBrandPanel />
        </div>

        <div className="relative z-20 flex min-h-[calc(100vh-1.5rem)] items-center justify-center rounded-r-4xl bg-[#F8FAFC] px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          {children}
        </div>
      </div>
    </main>
  );
}
