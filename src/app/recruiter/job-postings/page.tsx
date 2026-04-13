"use client";

import { useState } from "react";
import CompanyJobPostingsPage from "@/features/job-postings/components/company/CompanyJobPostingsPage";
import CreateJobPostingModal from "@/features/job-postings/components/company/create-job/CreateJobPostingModal";

export default function RecruiterJobPostingsPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <CompanyJobPostingsPage
        onCreateJob={() => setOpenCreateModal(true)}
        onViewJobDetail={(jobId) => {
          console.log("view detail", jobId);
        }}
      />

      {openCreateModal ? (
        <CreateJobPostingModal open onClose={() => setOpenCreateModal(false)} />
      ) : null}
    </>
  );
}
