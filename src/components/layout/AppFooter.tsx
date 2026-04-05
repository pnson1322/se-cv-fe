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
    <footer className="relative mt-8 overflow-hidden border-t border-white/10 bg-[linear-gradient(135deg,#0F1F52_0%,#162D73_45%,#1E3A8A_100%)] text-white">
      <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-cyan-400/14 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-8 h-36 w-36 rounded-full bg-blue-300/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[16px_16px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-6 md:py-7">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-white/12 bg-white/12 px-4 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#06B6D4] to-[#38BDF8] text-white shadow-[0_12px_24px_rgba(6,182,212,0.30)]">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-white md:text-[1.2rem]">
                  Kết nối Việc làm
                </h3>
                <p className="text-[0.82rem] font-medium text-white/72 md:text-[0.9rem]">
                  Nền tảng kết nối sinh viên và doanh nghiệp
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-155 text-[0.92rem] leading-7 text-white/88 md:text-[0.98rem]">
              Hỗ trợ sinh viên ngành Công nghệ Phần mềm tiếp cận cơ hội thực
              tập, việc làm và kết nối trực tiếp với nhà tuyển dụng trong hệ
              sinh thái học thuật và doanh nghiệp.
            </p>
          </div>

          <div>
            <div className="rounded-3xl border border-white/12 bg-white/12 p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 md:p-5">
              <h4 className="text-[1rem] font-bold tracking-[-0.01em] text-white md:text-[1.08rem]">
                Thông tin liên hệ
              </h4>

              <div className="mt-4 space-y-2.5">
                <ContactItem
                  icon={<MapPin size={18} />}
                  text="Khoa Công nghệ Phần mềm, Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM"
                />
                <ContactItem icon={<Mail size={18} />} text="se@uit.edu.vn" />
                <ContactItem
                  icon={<Phone size={18} />}
                  text="(028) 3725 2002"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-center text-[0.82rem] text-white/72 md:mt-7 md:flex-row md:items-center md:justify-between md:text-left md:text-[0.88rem]">
          <p>© 2026 Kết nối Việc làm - Khoa Công nghệ Phần mềm, UIT.</p>
          <p>Thiết kế cho sinh viên, nhà tuyển dụng và quản trị viên.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="group absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-cyan-500 text-white shadow-[0_14px_28px_rgba(6,182,212,0.32)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_18px_36px_rgba(6,182,212,0.40)] md:right-5 md:top-5 md:h-10 md:w-10"
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp
          size={18}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </button>
    </footer>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 hover:bg-cyan-300/10">
      <div className="mt-0.5 shrink-0 text-[#22D3EE] transition duration-300 group-hover:scale-110 group-hover:text-cyan-300">
        {icon}
      </div>
      <span className="text-[0.9rem] leading-6 text-white/92 transition duration-300 group-hover:text-white md:text-[0.95rem]">
        {text}
      </span>
    </div>
  );
}
