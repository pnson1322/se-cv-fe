"use client";

import { ArrowUp, BriefcaseBusiness, Mail, MapPin, Phone } from "lucide-react";

export default function AppFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-[linear-gradient(135deg,#0F1F52_0%,#162D73_45%,#1E3A8A_100%)] text-white">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-400/16 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-8 h-48 w-48 rounded-full bg-blue-300/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[16px_16px]" />

      <div className="relative mx-auto max-w-360 px-6 py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-4 rounded-3xl border border-white/12 bg-white/12 px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/14 hover:shadow-[0_24px_50px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.10)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#06B6D4] to-[#38BDF8] text-white shadow-[0_14px_30px_rgba(6,182,212,0.38)]">
                <BriefcaseBusiness size={24} />
              </div>

              <div>
                <h3 className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-white md:text-[1.6rem]">
                  Kết nối Việc làm
                </h3>
                <p className="text-[0.95rem] font-semibold text-white/72 md:text-[1rem]">
                  Nền tảng kết nối sinh viên và doanh nghiệp
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-180 text-[1rem] font-semibold leading-8 text-white/92 md:text-[1.06rem]">
              Hỗ trợ sinh viên ngành Công nghệ Phần mềm tiếp cận cơ hội thực
              tập, việc làm và kết nối trực tiếp với nhà tuyển dụng trong hệ
              sinh thái học thuật và doanh nghiệp.
            </p>
          </div>

          <div>
            <div className="rounded-3xl border border-white/12 bg-white/12 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/14 hover:shadow-[0_24px_52px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.10)] md:p-7">
              <h4 className="text-[1.18rem] font-extrabold tracking-[-0.01em] text-white drop-shadow-[0_1px_0_rgba(255,255,255,0.04)] md:text-[1.3rem]">
                Thông tin liên hệ
              </h4>

              <div className="mt-5 space-y-4">
                <ContactItem
                  icon={<MapPin size={20} />}
                  text="Khoa Công nghệ Phần mềm, Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM"
                />
                <ContactItem icon={<Mail size={20} />} text="se@uit.edu.vn" />
                <ContactItem
                  icon={<Phone size={20} />}
                  text="(028) 3725 2002"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 text-center text-[0.92rem] font-semibold text-white/72 md:mt-10 md:flex-row md:items-center md:justify-between md:text-left md:text-[0.96rem]">
          <p>© 2026 Kết nối Việc làm - Khoa Công nghệ Phần mềm, UIT.</p>
          <p>Thiết kế cho sinh viên, nhà tuyển dụng và quản trị viên.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="group absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-cyan-500 text-white shadow-[0_16px_36px_rgba(6,182,212,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_22px_44px_rgba(6,182,212,0.48)] md:right-6 md:top-6 md:h-12 md:w-12"
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp
          size={20}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </button>
    </footer>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:shadow-[0_10px_24px_rgba(6,182,212,0.08)]">
      <div className="mt-0.5 shrink-0 text-[#22D3EE] transition duration-300 group-hover:scale-110 group-hover:text-cyan-300">
        {icon}
      </div>
      <span className="text-[0.98rem] font-bold leading-7 text-white/94 transition duration-300 group-hover:text-white md:text-[1.04rem]">
        {text}
      </span>
    </div>
  );
}
