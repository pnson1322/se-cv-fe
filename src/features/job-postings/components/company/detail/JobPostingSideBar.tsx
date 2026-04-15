"use client";

import JobPostingCompanyCard from "./JobPostingCompanyCard";

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

export default function JobPostingSidebar({
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
    <aside className="xl:sticky xl:top-32 xl:self-start">
      <div className="max-h-[calc(100vh-144px)] overflow-y-auto pr-1">
        <JobPostingCompanyCard
          companyName={companyName}
          companySize={companySize}
          industry={industry}
          address={address}
          website={website}
          contactEmail={contactEmail}
          fallbackCity={fallbackCity}
          onViewCompanyDetail={onViewCompanyDetail}
        />
      </div>
    </aside>
  );
}
