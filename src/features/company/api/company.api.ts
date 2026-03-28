import { api } from "@/lib/axios";
import type { GetMyCompanyResponse } from "../types/company.types";

export async function getMyCompany() {
  const res = await api.get<GetMyCompanyResponse>("/company/me");
  return res.data;
}
