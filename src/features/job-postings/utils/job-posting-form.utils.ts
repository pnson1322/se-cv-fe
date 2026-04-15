import type { JobPosting } from "../types/job-postings.types";
import type { CreateJobPostingFormValues } from "../schemas/create-job-posting.schema";

export function mapJobPostingToFormValues(
  job: JobPosting,
): CreateJobPostingFormValues {
  const deadlineDate = job.applicationDeadline
    ? new Date(job.applicationDeadline).toISOString().slice(0, 10)
    : "";

  return {
    jobTitle: job.jobTitle || "",
    categoryId: String(job.categoryId || ""),
    city: job.city || "",
    applicationDeadline: deadlineDate,
    salaryMode: job.isSalaryNegotiable ? "NEGOTIABLE" : "RANGE",
    salaryMin:
      job.salaryMin !== null && job.salaryMin !== undefined
        ? String(job.salaryMin)
        : "",
    salaryMax:
      job.salaryMax !== null && job.salaryMax !== undefined
        ? String(job.salaryMax)
        : "",
    numberOfPositions: String(job.numberOfPositions || 1),
    jobDescription: job.jobDescription || "",
    requirements: job.requirements || "",
    benefits: job.benefits || "",
    experienceLevel: job.experienceLevel || "",
    skillIds: job.requiredSkills?.map((skill) => skill.skillId) || [],
  };
}
