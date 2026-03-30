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
    <section className="relative h-full min-h-190 overflow-visible text-white">
      <div className="absolute inset-0 overflow-hidden rounded-l-4xl bg-[#1E3A8A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(rgba(255, 255, 255, 0.20)_1px,transparent_1px)] bg-size-[18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%,rgba(6,182,212,0.04)_100%)]" />

        <div className="absolute -left-20 bottom-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-20 flex h-full flex-col justify-between px-10 py-10 xl:px-14 xl:py-12">
        <div>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl font-bold backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              UIT
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-white/85">
                ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH
              </p>
              <p className="text-[2rem] font-bold leading-tight">
                TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
              </p>
            </div>
          </div>

          <div className="max-w-215">
            <h1 className="text-[3.5rem] font-bold leading-[1.08] tracking-[-0.03em] xl:text-[4rem]">
              Kết nối sinh viên{" "}
              <span className="text-[#06B6D4]">Công nghệ Phần mềm</span> với cơ
              hội nghề nghiệp
            </h1>

            <p className="mt-6 max-w-165 text-[1.22rem] leading-9 text-white/82">
              Hỗ trợ sinh viên tìm kiếm việc làm, thực tập và kết nối trực tiếp
              với nhà tuyển dụng trong hệ sinh thái học thuật và doanh nghiệp.
            </p>
          </div>

          <div className="relative z-20 mt-10 max-w-135 space-y-4 xl:max-w-140">
            <FeatureCard
              icon={<BriefcaseBusiness size={22} />}
              title="Tìm kiếm việc làm & thực tập"
              desc="Tiếp cận cơ hội phù hợp với kỹ năng và định hướng."
            />
            <FeatureCard
              icon={<FileUser size={22} />}
              title="Xây dựng hồ sơ chuyên nghiệp"
              desc="Quản lý CV và quá trình ứng tuyển hiệu quả."
            />
            <FeatureCard
              icon={<Building2 size={22} />}
              title="Kết nối doanh nghiệp"
              desc="Tạo cầu nối giữa sinh viên và nhà tuyển dụng."
            />
          </div>
        </div>

        <div className="relative z-20 mt-10 flex items-center gap-2 text-sm text-white/72">
          <CheckCircle2 size={16} />
          <span>University of Information Technology - VNUHCM</span>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-4 -right-20 z-30 xl:-right-25">
        <Image
          src="/illustrations/dev.svg"
          alt="Developer illustration"
          width={620}
          height={620}
          priority
          className="h-auto w-107.5 animate-[floatY_6s_ease-in-out_infinite] drop-shadow-[0_18px_40px_rgba(8,15,40,0.22)] xl:w-130"
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
    <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/16 text-[#06B6D4] transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/22">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-base leading-7 text-white/74">{desc}</p>
      </div>
    </div>
  );
}
