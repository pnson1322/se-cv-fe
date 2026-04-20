"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleJobPostingActive } from "../api/job-postings.api";
import { getApiErrorMessage } from "@/utils/api-error";

type Params = {
  jobId: number;
};

export function useToggleJobPostingActiveMutation({ jobId }: Params) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleJobPostingActive(jobId),
    onSuccess: async () => {
      toast.success("Cập nhật trạng thái hiển thị thành công");

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
