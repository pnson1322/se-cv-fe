"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { useJobPostingDetail } from "../../hooks/useJobPostingDetail";
import EditJobPostingModal from "./edit/EditJobPostingModal";
import JobPostingBackBar from "./detail/JobPostingBackBar";
import JobPostingDetailHeader from "./detail/JobPostingDetailHeader";
import JobPostingDetailSection from "./detail/JobPostingDetailSection";
import JobPostingSidebar from "./detail/JobPostingSideBar";
import {
  formatRelativeDate,
  formatSalary,
  getJobPostingStatusMeta,
} from "../../utils/job-postings.utils";

type Props = {
  jobId: number;
};

export default function JobPostingDetailPageContent({ jobId }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const viewerRole = user?.role;
  const [openEdit, setOpenEdit] = useState(false);

  const jobDetailQuery = useJobPostingDetail(jobId);
  const job = jobDetailQuery.data?.data;

  const companyProfileQuery = useCompanyProfile({
    viewerRole: viewerRole!,
  });

  if (!viewerRole) return null;

  if (jobDetailQuery.isLoading) {
    return (
      <div className="mx-24 mt-5 rounded-3xl border border-(--color-border) bg-white px-8 py-12 text-center text-[15px] text-(--color-muted)">
        Đang tải chi tiết công việc...
      </div>
    );
  }

  if (jobDetailQuery.error || !job) {
    return (
      <div className="mx-24 mt-5 rounded-3xl border border-red-200 bg-red-50 px-8 py-12 text-center text-[15px] text-red-600">
        Không thể tải chi tiết công việc.
      </div>
    );
  }

  const company = companyProfileQuery.data?.data;
  const statusMeta = getJobPostingStatusMeta(job.status);

  return (
    <>
      <div className="mx-32 mt-4 space-y-7 pb-12">
        <JobPostingBackBar onBack={() => router.back()} />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 space-y-6">
            <JobPostingDetailHeader
              jobTitle={job.jobTitle}
              companyName={company?.companyName || "Chưa cập nhật"}
              companyLogoUrl={company?.logoUrl || job.logoUrl || null}
              city={job.city}
              salaryText={formatSalary({
                salaryMin: job.salaryMin,
                salaryMax: job.salaryMax,
                salaryType: job.salaryType,
                isSalaryNegotiable: job.isSalaryNegotiable,
              })}
              postedAtText={`Đăng ${formatRelativeDate(job.createdAt)}`}
              deadlineText={new Date(
                job.applicationDeadline,
              ).toLocaleDateString("vi-VN")}
              applicantCount={job.applicantCount}
              statusLabel={statusMeta.label}
              statusClassName={statusMeta.className}
              onEdit={() => setOpenEdit(true)}
            />

            <JobPostingDetailSection
              title="Mô tả công việc"
              content={job.jobDescription}
              tone="cyan"
            />

            <JobPostingDetailSection
              title="Yêu cầu ứng viên"
              content={job.requirements}
              tone="blue"
              listMode
            />

            <JobPostingDetailSection
              title="Quyền lợi"
              content={job.benefits}
              tone="green"
              listMode
            />
          </div>

          <JobPostingSidebar
            companyName={company?.companyName || "Chưa cập nhật"}
            companySize={company?.companySize}
            industry={company?.industry}
            address={company?.address}
            website={company?.website}
            contactEmail={company?.contactEmail}
            fallbackCity={job.city}
            onViewCompanyDetail={() => router.push("/recruiter/profile")}
          />
        </div>
      </div>

      {openEdit ? (
        <EditJobPostingModal
          key={job.jobId}
          open
          job={job}
          onClose={() => setOpenEdit(false)}
        />
      ) : null}
    </>
  );
}
