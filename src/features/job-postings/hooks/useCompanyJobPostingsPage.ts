"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getJobPostingCardsForCompany,
  getJobPostingsStats,
} from "../api/job-postings.api";
import type {
  JobPostingCardAdminCompanyItem,
  JobPostingStatus,
} from "../types/job-postings.types";

export function useCompanyJobPostingsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<JobPostingStatus | "">("");

  const statsQuery = useQuery({
    queryKey: ["job-postings", "company", "stats"],
    queryFn: getJobPostingsStats,
  });

  const cardsQuery = useQuery({
    queryKey: ["job-postings", "company", "cards", searchInput, status],
    queryFn: async () =>
      getJobPostingCardsForCompany({
        page: 1,
        limit: 9,
        search: searchInput.trim() || undefined,
        status: status || undefined,
      }),
  });

  const cards = useMemo<JobPostingCardAdminCompanyItem[]>(() => {
    return cardsQuery.data?.data?.data || [];
  }, [cardsQuery.data]);

  const stats = statsQuery.data?.data;

  return {
    searchInput,
    setSearchInput,
    status,
    setStatus,
    cards,
    stats,
    isLoading: statsQuery.isLoading || cardsQuery.isLoading,
    isFetching: statsQuery.isFetching || cardsQuery.isFetching,
    isEmpty: !cardsQuery.isLoading && cards.length === 0,
    error: statsQuery.error || cardsQuery.error,
    refetch: () => {
      statsQuery.refetch();
      cardsQuery.refetch();
    },
  };
}
