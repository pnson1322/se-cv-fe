"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobPostingsListByCompanyId } from "@/features/job-postings/api/job-postings.api";

type Params = {
  companyId?: number;
  enabled?: boolean;
};

export function useCompanyProfileJobs({ companyId, enabled = true }: Params) {
  return useQuery({
    queryKey: ["company-profile", "jobs", companyId],
    enabled: enabled && !!companyId,
    queryFn: async () => {
      if (!companyId) {
        throw new Error("companyId is required");
      }

      return getJobPostingsListByCompanyId({
        companyId,
        page: 1,
        limit: 12,
      });
    },
  });
}
