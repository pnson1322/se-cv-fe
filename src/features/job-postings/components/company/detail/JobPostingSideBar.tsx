"use client";

import type { JobPostingStatus } from "../../../types/job-postings.types";
import type { Role } from "@/features/auth/constants/roles";
import JobPostingCompanyCard from "./JobPostingCompanyCard";
import JobPostingStatusReasonCard from "./JobPostingStatusReasonCard";

type Props = {
  viewerRole: Role;
  status: JobPostingStatus;
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
      <div className="space-y-4">
        {(status === "rejected" || status === "restricted") &&
        viewerRole !== "STUDENT" ? (
          <JobPostingStatusReasonCard
            type={status}
            date={status === "rejected" ? "27/01/2025" : "25/01/2025"}
            reason={
              status === "rejected"
                ? "Yêu cầu công việc vi phạm quy định đăng tin. Mức lương không phù hợp."
                : "Nội dung mô tả còn thiếu chi tiết, cần bổ sung rõ ràng hơn."
            }
          />
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
