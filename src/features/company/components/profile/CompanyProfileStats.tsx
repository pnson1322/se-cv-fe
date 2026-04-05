"use client";

import { BriefcaseBusiness, Building2, Users } from "lucide-react";
import type { CompanyProfile } from "../../types/company.types";
import CompanyStatCard from "./CompanyStatCard";

type Props = {
  company: CompanyProfile;
  totalJobs: number;
};

export default function CompanyProfileStats({ company, totalJobs }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <CompanyStatCard
        icon={<BriefcaseBusiness size={21} />}
        value={String(company.totalJobsPosted ?? totalJobs)}
        label="Vị trí đang tuyển"
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />
      <CompanyStatCard
        icon={<Users size={21} />}
        value={formatNumber(company.totalFollowers ?? 0)}
        label="Người theo dõi"
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <CompanyStatCard
        icon={<Building2 size={21} />}
        value={company.companySize || "Chưa cập nhật"}
        label="Quy mô công ty"
        iconBg="bg-fuchsia-50"
        iconColor="text-fuchsia-600"
      />
    </section>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}
