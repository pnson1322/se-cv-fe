"use client";

import Image from "next/image";
import { Pencil, ShieldAlert, Camera } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type { CompanyProfile } from "../../types/company.types";

type Props = {
  company: CompanyProfile;
  viewerRole: Role;
  isOwner?: boolean;
  onEditBasicInfo?: () => void;
  onChangeLogo?: () => void;
  onChangeCoverImage?: () => void;
  onFollow?: () => void;
  onRestrict?: () => void;
};

export default function CompanyProfileHeader({
  company,
  viewerRole,
  isOwner = false,
  onEditBasicInfo,
  onChangeLogo,
  onChangeCoverImage,
  onFollow,
  onRestrict,
}: Props) {
  const isStudent = viewerRole === "STUDENT";
  const isAdmin = viewerRole === "ADMIN";

  const companyName = company.companyName || "Tên công ty";
  const slogan = company.slogan || "Chưa cập nhật slogan";
  const coverImage =
    company.coverImageUrl || "/images/company-cover-placeholder.jpg";
  const logoImage = company.logoUrl || "/images/company-logo-placeholder.png";

  return (
    <div className="space-y-4">
      {isOwner ? (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-[14px] text-slate-700">
          <span className="font-semibold">💡 Xem trước hồ sơ:</span> Đây là cách
          sinh viên nhìn thấy hồ sơ công ty của bạn. Sử dụng các nút chỉnh sửa
          để cập nhật thông tin.
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="group relative h-60 w-full overflow-hidden md:h-80">
          <Image
            src={coverImage}
            alt={companyName}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,58,147,0.65)_0%,rgba(30,64,175,0.3)_50%,rgba(6,182,212,0.25)_100%)]" />

          {isOwner ? (
            <button
              type="button"
              onClick={onChangeCoverImage}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-[13px] font-medium text-slate-700 opacity-0 shadow transition-all group-hover:opacity-100 hover:bg-white"
            >
              <Camera size={14} />
              Đổi ảnh bìa
            </button>
          ) : null}
        </div>

        <div className="relative px-5 pb-6 md:px-6">
          <div className="-mt-16 flex flex-col">
            <div className="group relative mb-4 h-32 w-32 overflow-hidden rounded-full border-[5px] border-white bg-white shadow md:h-36 md:w-36">
              <Image
                src={logoImage}
                alt={`${companyName} logo`}
                fill
                className="object-cover"
              />

              {isOwner ? (
                <button
                  type="button"
                  onClick={onChangeLogo}
                  className="absolute inset-0 flex items-center justify-center bg-black/28 opacity-0 transition group-hover:opacity-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-slate-700 shadow">
                    <Camera size={20} />
                  </div>
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between pb-2">
              <div className="w-full">
                <div className="flex w-full items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h1 className="wrap-break-word text-[28px] font-bold text-slate-900 md:text-[32px]">
                      {companyName}
                    </h1>

                    <p className="mt-2 text-[15px] text-slate-500">{slogan}</p>
                  </div>

                  {(isStudent || isAdmin) && (
                    <div className="shrink-0">
                      {isStudent && (
                        <button
                          type="button"
                          onClick={onFollow}
                          className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-500 px-5 text-[14px] font-semibold text-white transition hover:bg-cyan-600"
                        >
                          Theo dõi
                        </button>
                      )}

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={onRestrict}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-[14px] font-semibold text-white transition hover:bg-red-600"
                        >
                          <ShieldAlert size={16} />
                          Hạn chế
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isOwner ? (
                  <button
                    type="button"
                    onClick={onEditBasicInfo}
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Pencil size={16} />
                    Chỉnh sửa tên & slogan
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
