export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type JobPostingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "restricted";
type ExperienceLevel =
  | "INTERN"
  | "FRESHER"
  | "JUNIOR"
  | "MIDDLE"
  | "SENIOR"
  | "LEAD";
type PositionLevel =
  | "STAFF"
  | "MANAGER"
  | "TEAM_LEAD"
  | "SUPERVISOR"
  | "DIRECTOR"
  | "C_LEVEL";
export type SalaryType = "RANGE" | "NEGOTIABLE";

export type PostBody = {
  jobTitle: string;
  categoryId: number;
  city: string;
  applicationDeadline: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: string;
  isSalaryNegotiable: boolean;
  numberOfPositions: number;
  jobDescription: string;
  requirements: string;
  benefits: string;
  experienceLevel: string;
  positionLevel: string;
  skillIds: number[];
  isUrgent: boolean;
};

export type PostResponse = {
  jobId: number;
};

export type PutBody = {
  jobTitle?: string;
  categoryId?: number;
  city?: string;
  applicationDeadline?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryType?: string;
  isSalaryNegotiable?: boolean;
  numberOfPositions?: number;
  jobDescription?: string;
  requirements?: string;
  benefits?: string;
  experienceLevel?: string;
  positionLevel?: string;
  skillIds?: number[];
  isUrgent?: boolean;
};

export type PutResponse = {
  jobId: number;
  jobTitle: string;
};

export type PatchBody = {
  status: JobPostingStatus;
  admin_note?: string;
};

export type SkillItem = {
  skillId: number;
  skillName: string;
};

export type JobPosting = {
  jobId: number;
  companyId: number;
  categoryId: number;
  logoUrl: string;
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  benefits: string;
  experienceLevel: ExperienceLevel;
  positionLevel: PositionLevel;
  numberOfPositions: number;
  salaryMin: number;
  salaryMax: number;
  salaryType: SalaryType;
  isSalaryNegotiable: boolean;
  city: string;
  applicationDeadline: string;
  status: JobPostingStatus;
  applicantCount: number;
  createdAt: string;
  updatedAt: string;
  requiredSkills: SkillItem[];
};

export type JobPostingsListParam = {
  companyId?: number;
  page?: number;
  limit?: number;
};

export type JobPostingDataItem = {
  jobId: number;
  jobTitle: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: string;
  isSalaryNegotiable: boolean;
  approveAt: string;
  categoryId: number;
};

type JobPostingMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type JobPostingData<T> = {
  data: T[];
  meta: JobPostingMeta;
};

export type CategoryItem = {
  categoryId: number;
  categoryName: string;
};

export type JobItem = {
  jobId: number;
  jobTitle: string;
};

export type JobPostingCardsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: JobPostingStatus;
  city?: string;
};

export type JobPostingCardAdminCompanyItem = {
  jobId: number;
  companyName: string;
  logoUrl: string | null;
  jobTitle: string;
  city: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: SalaryType | null;
  isSalaryNegotiable: boolean;
  applicationDeadline: string;
  status: JobPostingStatus;
  applicantCount: number;
  skills: SkillItem[];
  createdAt: string;
};

export type JobPostingCardStudentItem = {
  jobId: number;
  companyId: number;
  companyName: string;
  logoUrl: string | null;
  jobTitle: string;
  city: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: SalaryType | null;
  isSalaryNegotiable: boolean;
  postedAt: string;
  applicantCount: number;
  skills: SkillItem[];
};

export type JobPostingsStats = {
  total: number;
  active: number;
  restricted: number;
  closed: number;
};
