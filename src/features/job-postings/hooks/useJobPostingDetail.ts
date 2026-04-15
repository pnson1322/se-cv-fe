"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobPostingById } from "../api/job-postings.api";

export function useJobPostingDetail(jobId: number) {
  return useQuery({
    queryKey: ["job-postings", "detail", jobId],
    queryFn: () => getJobPostingById(jobId),
    enabled: !!jobId,
  });
}
