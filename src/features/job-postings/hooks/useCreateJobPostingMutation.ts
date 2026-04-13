"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createJobPosting } from "../api/job-postings.api";
import type { CreateJobPostingPayload } from "../schemas/create-job-posting.schema";
import { getApiErrorMessage } from "@/utils/api-error";

export function useCreateJobPostingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJobPostingPayload) => createJobPosting(payload),
    onSuccess: async () => {
      toast.success("Đăng tin tuyển dụng thành công");

      await Promise.all([
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
