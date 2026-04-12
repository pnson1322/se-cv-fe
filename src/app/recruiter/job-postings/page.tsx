"use client";

import { useState } from "react";
import CompanyJobPostingsPage from "@/features/job-postings/components/company/CompanyJobPostingsPage";

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

      {openCreateModal ? <div>TODO: Create Job Modal</div> : null}
    </>
  );
}
