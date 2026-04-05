import Image from "next/image";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileUser,
} from "lucide-react";

export default function AuthBrandPanel() {
  return (
    <section className="relative h-full min-h-175 overflow-visible text-white xl:min-h-185">
      <div className="absolute inset-0 overflow-hidden rounded-l-4xl bg-[#1E3A8A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] bg-size-[18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%,rgba(6,182,212,0.04)_100%)]" />

        <div className="absolute -left-20 bottom-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-20 flex h-full flex-col justify-between px-7 py-7 xl:px-8 xl:py-8">
        <div>
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-base font-bold backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] xl:h-13 xl:w-13 xl:text-[17px]">
              UIT
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-wide text-white/85 xl:text-xs">
                ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH
              </p>
              <p className="max-w-115 text-[1.45rem] font-bold leading-tight xl:max-w-125 xl:text-[1.75rem]">
                TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
              </p>
            </div>
          </div>

          <div className="max-w-140">
            <h1 className="text-[2.45rem] font-bold leading-[1.08] tracking-[-0.03em] xl:text-[2.95rem]">
              Kết nối sinh viên{" "}
              <span className="text-[#06B6D4]">Công nghệ Phần mềm</span> với cơ
              hội nghề nghiệp
            </h1>

            <p className="mt-4 max-w-125 text-[0.95rem] leading-7 text-white/82 xl:text-[1rem]">
              Hỗ trợ sinh viên tìm kiếm việc làm, thực tập và kết nối trực tiếp
              với nhà tuyển dụng trong hệ sinh thái học thuật và doanh nghiệp.
            </p>
          </div>

          <div className="relative z-20 mt-7 max-w-117.5 space-y-3 xl:max-w-125">
            <FeatureCard
              icon={<BriefcaseBusiness size={18} />}
              title="Tìm kiếm việc làm & thực tập"
              desc="Tiếp cận cơ hội phù hợp với kỹ năng và định hướng."
            />
            <FeatureCard
              icon={<FileUser size={18} />}
              title="Xây dựng hồ sơ chuyên nghiệp"
              desc="Quản lý CV và quá trình ứng tuyển hiệu quả."
            />
            <FeatureCard
              icon={<Building2 size={18} />}
              title="Kết nối doanh nghiệp"
              desc="Tạo cầu nối giữa sinh viên và nhà tuyển dụng."
            />
          </div>
        </div>

        <div className="relative z-20 mt-7 flex items-center gap-2 text-xs text-white/72 xl:text-sm">
          <CheckCircle2 size={15} />
          <span>University of Information Technology - VNUHCM</span>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-2 -right-5 z-30 xl:-bottom-1 xl:-right-12.5">
        <Image
          src="/illustrations/dev.svg"
          alt="Developer illustration"
          width={520}
          height={520}
          priority
          className="h-auto w-90 animate-[floatY_6s_ease-in-out_infinite] drop-shadow-[0_18px_40px_rgba(8,15,40,0.22)] xl:w-100"
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/16 text-[#06B6D4] transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/22">
        {icon}
      </div>

      <div>
        <h3 className="text-[1rem] font-semibold xl:text-[1.08rem]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/74 xl:text-[0.94rem]">
          {desc}
        </p>
      </div>
    </div>
  );
}
