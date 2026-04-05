import { AxiosError } from "axios";
import { getMyCompany } from "@/features/company/api/company.api";
import type { AuthUser } from "../types/auth.types";

export async function resolvePostLoginRoute(user: AuthUser) {
  if (user.role === "STUDENT") {
    return "/student/dashboard";
  }

  if (user.role === "ADMIN") {
    return "/admin/dashboard";
  }

  if (user.role === "COMPANY") {
    try {
      const companyRes = await getMyCompany();
      const company = companyRes.data;

      const hasNoCompany = !company || !company.companyId;

      if (hasNoCompany) {
        return "/recruiter/company/create";
      }

      if (company.status !== "APPROVED") {
        return "/recruiter/profile";
      }

      return "/recruiter/dashboard";
    } catch (error) {
      const axiosError = error as AxiosError;

      if (
        axiosError.response?.status === 403 ||
        axiosError.response?.status === 404
      ) {
        return "/recruiter/company/create";
      }

      throw error;
    }
  }

  return "/";
}
