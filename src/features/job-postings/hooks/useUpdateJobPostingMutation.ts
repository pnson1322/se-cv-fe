"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putJobPosting } from "../api/job-postings.api";
import { getApiErrorMessage } from "@/utils/api-error";
import type { PutBody } from "../types/job-postings.types";

type Params = {
  jobId: number;
};

export function useUpdateJobPostingMutation({ jobId }: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PutBody) => putJobPosting(jobId, payload),
    onSuccess: async () => {
      toast.success("Cập nhật tin tuyển dụng thành công");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "detail", jobId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "company", "cards"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "company", "stats"],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
