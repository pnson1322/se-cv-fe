"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompanyById, getMyCompany } from "../api/company.api";
import type { Role } from "@/features/auth/constants/roles";

type UseCompanyProfileParams = {
  viewerRole: Role;
  companyId?: string;
};

export function useCompanyProfile({
  viewerRole,
  companyId,
}: UseCompanyProfileParams) {
  const isOwnerView = viewerRole === "COMPANY" && !companyId;

  return useQuery({
    queryKey: ["company-profile", viewerRole, companyId || "me"],
    queryFn: async () => {
      if (isOwnerView) {
        return getMyCompany();
      }

      if (!companyId) {
        throw new Error("companyId is required");
      }

      return getCompanyById(companyId);
    },
  });
}
