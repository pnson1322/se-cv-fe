"use client";

import { useMemo, useState } from "react";
import type { Role } from "@/features/auth/constants/roles";
import type { CompanyProfile } from "../../types/company.types";
import CompanyProfileHeader from "./CompanyProfileHeader";
import CompanyProfileStats from "./CompanyProfileStats";
import CompanyProfileTabs, { type ProfileTab } from "./CompanyProfileTabs";
import CompanyAboutSection from "./CompanyAboutSection";
import CompanyJobsSection from "./CompanyJobsSection";
import CompanyReviewsSection from "./CompanyReviewsSection";

type CompanyProfilePageProps = {
  company: CompanyProfile;
  viewerRole: Role;
  isOwner?: boolean;
  onEditBasicInfo?: () => void;
  onEditDescription?: () => void;
  onEditDetail?: () => void;
  onEditContact?: () => void;
  onManageOfficeImages?: () => void;
  onChangeLogo?: () => void;
  onChangeCoverImage?: () => void;
  onFollow?: () => void;
  onRestrict?: () => void;
};

export type MockJob = {
  id: number;
  title: string;
  location: string;
  salary: string;
  type: string;
  postedAt: string;
};

export type MockReview = {
  id: number;
  authorName: string;
  authorRole: string;
  rating: number;
  content: string;
  createdAt: string;
};

const mockJobs: MockJob[] = [
  {
    id: 1,
    title: "Thực tập sinh Lập trình Web",
    location: "Hà Nội",
    salary: "5-7 triệu VNĐ",
    type: "Fulltime",
    postedAt: "2 ngày trước",
  },
  {
    id: 2,
    title: "Junior Frontend Developer",
    location: "Hà Nội",
    salary: "8-12 triệu VNĐ",
    type: "Fulltime",
    postedAt: "1 tuần trước",
  },
  {
    id: 3,
    title: "Backend Developer (NodeJS)",
    location: "Hà Nội",
    salary: "10-15 triệu VNĐ",
    type: "Fulltime",
    postedAt: "3 ngày trước",
  },
];

const mockReviews: MockReview[] = [
  {
    id: 1,
    authorName: "Nguyễn Văn A",
    authorRole: "Software Engineer",
    rating: 5,
    content:
      "Môi trường làm việc chuyên nghiệp, đồng nghiệp thân thiện. Cơ hội học hỏi và phát triển rất tốt. Rất phù hợp cho sinh viên mới ra trường.",
    createdAt: "2 tuần trước",
  },
  {
    id: 2,
    authorName: "Trần Thị B",
    authorRole: "Business Analyst",
    rating: 4,
    content:
      "Công ty tốt, dự án đa dạng. Lương thưởng hợp lý, có nhiều benefit cho nhân viên. Văn hóa công ty cởi mở và năng động.",
    createdAt: "1 tháng trước",
  },
  {
    id: 3,
    authorName: "Lê Minh C",
    authorRole: "Intern",
    rating: 5,
    content:
      "Được đào tạo bài bản từ đầu, mentor nhiệt tình. Công việc thử thách nhưng rất bổ ích. Recommend cho các bạn sinh viên!",
    createdAt: "2 tháng trước",
  },
];

export default function CompanyProfilePage({
  company,
  viewerRole,
  isOwner = false,
  onEditBasicInfo,
  onEditDescription,
  onEditDetail,
  onEditContact,
  onManageOfficeImages,
  onChangeLogo,
  onChangeCoverImage,
  onFollow,
  onRestrict,
}: CompanyProfilePageProps) {
  const isStudent = viewerRole === "STUDENT";

  const tabs = useMemo<ProfileTab[]>(() => {
    if (isStudent) return ["about", "jobs"];
    return ["about", "jobs", "reviews"];
  }, [isStudent]);

  const [activeTab, setActiveTab] = useState<ProfileTab>("about");

  return (
    <div className="mx-10 space-y-6">
      <CompanyProfileHeader
        company={company}
        viewerRole={viewerRole}
        isOwner={isOwner}
        onEditBasicInfo={onEditBasicInfo}
        onChangeLogo={onChangeLogo}
        onChangeCoverImage={onChangeCoverImage}
        onFollow={onFollow}
        onRestrict={onRestrict}
      />

      <CompanyProfileStats company={company} totalJobs={mockJobs.length} />

      <CompanyProfileTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        reviewCount={mockReviews.length}
      />

      {activeTab === "about" && (
        <CompanyAboutSection
          company={company}
          isOwner={isOwner}
          onEditDescription={onEditDescription}
          onEditDetail={onEditDetail}
          onEditContact={onEditContact}
          onManageOfficeImages={onManageOfficeImages}
        />
      )}

      {activeTab === "jobs" && (
        <CompanyJobsSection jobs={mockJobs} viewerRole={viewerRole} />
      )}

      {activeTab === "reviews" && !isStudent && (
        <CompanyReviewsSection
          reviews={mockReviews}
          viewerRole={viewerRole}
          averageRating={company.rating ?? 4.5}
        />
      )}
    </div>
  );
}
