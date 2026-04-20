"use client";

import type { JobPostingStatus } from "../../../types/job-postings.types";
import type { Role } from "@/features/auth/constants/roles";
import JobPostingCompanyCard from "./JobPostingCompanyCard";
import JobPostingStatusReasonCard from "./JobPostingStatusReasonCard";

type Props = {
  viewerRole: Role;
  status: JobPostingStatus;
  adminNote?: string | null;
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
  viewerRole,
  status,
  adminNote,
  companyName,
  companySize,
  industry,
  address,
  website,
  contactEmail,
  fallbackCity,
  onViewCompanyDetail,
}: Props) {
  const shouldShowReasonCard =
    viewerRole !== "STUDENT" &&
    (status === "rejected" || status === "restricted") &&
    !!adminNote?.trim();

  return (
    <aside className="xl:sticky xl:top-32 xl:self-start">
      <div className="space-y-4">
        {shouldShowReasonCard ? (
          <JobPostingStatusReasonCard type={status} reason={adminNote} />
        ) : null}

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
