import {
  JobItem,
  JobPostingCardsParams,
  JobPostingsStats,
} from "./../types/job-postings.types";
import { api } from "@/lib/axios";
import {
  ApiResponse,
  CategoryItem,
  JobPosting,
  JobPostingData,
  JobPostingDataItem,
  JobPostingsListParam,
  PatchBody,
  PostBody,
  PostResponse,
  PutBody,
  PutResponse,
  SkillItem,
  JobPostingCardAdminCompanyItem,
  JobPostingCardStudentItem,
} from "../types/job-postings.types";

// for all:
export async function getJobPostingById(id: number) {
  const res = await api.get<ApiResponse<JobPosting>>(`/job-postings/${id}`);
  return res.data;
}

export async function getJobPostingsListByCompanyId(
  params: JobPostingsListParam,
) {
  const { companyId, page = 1, limit = 10 } = params;

  const res = await api.get<ApiResponse<JobPostingData<JobPostingDataItem>>>(
    `/job-postings/company/${companyId}`,
    {
      params: { page, limit },
    },
  );
  return res.data;
}

export async function getCategoriesList() {
  const res = await api.get<ApiResponse<CategoryItem[]>>(
    "/job-postings/categories",
  );
  return res.data;
}

export async function getSkillList() {
  const res = await api.get<ApiResponse<SkillItem[]>>("/job-postings/skills");
  return res.data;
}

export async function getJobPostingsAll(params: JobPostingsListParam) {
  const { page = 1, limit = 10 } = params;

  const res = await api.get<ApiResponse<JobPostingData<JobItem>>>(
    "/job-postings/all",
    {
      params: { page, limit },
    },
  );
  return res.data;
}

export async function getJobPostingsStats() {
  const res = await api.get<ApiResponse<JobPostingsStats>>(
    "/job-postings/stats",
  );
  return res.data;
}

// for Company:
export async function createJobPosting(payload: PostBody) {
  const res = await api.post<ApiResponse<PostResponse>>(
    "/job-postings",
    payload,
  );
  return res.data;
}

export async function putJobPosting(id: number, payload: PutBody) {
  const res = await api.put<ApiResponse<PutResponse>>(
    `/job-postings/${id}`,
    payload,
  );
  return res.data;
}

export async function getJobPostingCardsForCompany(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, status, city } = params;

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardAdminCompanyItem>>
  >("/job-postings/card", {
    params: {
      page,
      limit,
      search,
      status,
      city,
    },
  });

  return res.data;
}

// for Admin:
export async function patchJobPosting(id: number, payload: PatchBody) {
  const res = await api.patch<ApiResponse<number>>(
    `/job-postings/${id}/status`,
    payload,
  );
  return res.data;
}

export async function getJobPostingCardsForAdmin(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, status, city } = params;

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardAdminCompanyItem>>
  >("/job-postings/card", {
    params: {
      page,
      limit,
      search,
      status,
      city,
    },
  });

  return res.data;
}

// for Student:
export async function getJobPostingCardsForStudent(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, city } = params;

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardStudentItem>>
  >("/job-postings/card", {
    params: {
      page,
      limit,
      search,
      city,
    },
  });

  return res.data;
}
