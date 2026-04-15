import JobPostingDetailPageContent from "@/features/job-postings/components/company/JobPostingDetailPageContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <JobPostingDetailPageContent jobId={Number(id)} />;
}
