"use client";

import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

type Props = {
  companyName: string;
  companySize?: string | null;
  industry?: string | null;
  address?: string | null;
  website?: string | null;
  contactEmail?: string | null;
  fallbackCity?: string | null;
  onViewCompanyDetail: () => void;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-(--color-muted)">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[12px] font-medium text-(--color-muted)">{label}</p>
        <p className="mt-1 text-[14px] font-semibold leading-6 text-(--color-text)">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function JobPostingCompanyCard({
  companyName,
  companySize,
  industry,
  address,
  website,
  contactEmail,
  fallbackCity,
  onViewCompanyDetail,
}: Props) {
  return (
    <div className="rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm">
      <h3 className="text-[18px] font-bold text-(--color-text)">
        Thông tin công ty
      </h3>

      <div className="mt-6 space-y-4">
        <InfoRow
          icon={<Building2 size={16} />}
          label="Tên công ty"
          value={companyName}
        />

        <InfoRow
          icon={<Users size={16} />}
          label="Quy mô"
          value={companySize || "Chưa cập nhật"}
        />

        <InfoRow
          icon={<BriefcaseBusiness size={16} />}
          label="Lĩnh vực"
          value={industry || "Chưa cập nhật"}
        />

        <InfoRow
          icon={<MapPin size={16} />}
          label="Địa điểm"
          value={address || fallbackCity || "Chưa cập nhật"}
        />

        <InfoRow
          icon={<Globe size={16} />}
          label="Website"
          value={website || "Chưa cập nhật"}
        />

        <InfoRow
          icon={<Mail size={16} />}
          label="Email"
          value={contactEmail || "Chưa cập nhật"}
        />
      </div>

      <button
        type="button"
        onClick={onViewCompanyDetail}
        className="mt-6 w-full rounded-2xl border border-(--color-primary) bg-white py-3 text-[15px] font-semibold text-(--color-primary) transition hover:bg-slate-50"
      >
        Xem chi tiết công ty
      </button>
    </div>
  );
}
