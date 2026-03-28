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
    const companyRes = await getMyCompany();
    const company = companyRes.data;

    const hasNoCompany = !company || !company.company_id;

    if (hasNoCompany) {
      return "/recruiter/company/create";
    }

    if (company.status !== "APPROVED") {
      return "/recruiter/profile";
    }

    return "/recruiter/dashboard";
  }

  return "/";
}
