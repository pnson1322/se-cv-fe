"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminJobPostingsStats } from "../api/job-postings.api";

export function useAdminJobPostingStats() {
  return useQuery({
    queryKey: ["job-postings", "admin", "stats"],
    queryFn: getAdminJobPostingsStats,
  });
}
