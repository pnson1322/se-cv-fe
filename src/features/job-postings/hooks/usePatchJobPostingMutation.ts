"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchJobPosting } from "../api/job-postings.api";
import type { PatchBody } from "../types/job-postings.types";
import { getApiErrorMessage } from "@/utils/api-error";

type ActionType = "approve" | "reject" | "restrict";

export function usePatchJobPostingMutation(jobId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      action,
    }: {
      payload: PatchBody;
      action: ActionType;
    }) => patchJobPosting(jobId, payload),

    onSuccess: async (_, variables) => {
      if (variables.action === "approve") {
        toast.success("Phê duyệt tin thành công");
      }

      if (variables.action === "reject") {
        toast.success("Đã từ chối tin tuyển dụng");
      }

      if (variables.action === "restrict") {
        toast.success("Đã hạn chế tin tuyển dụng");
      }

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
