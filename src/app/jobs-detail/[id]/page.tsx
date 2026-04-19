import JobPostingDetailPageContent from "@/features/job-postings/components/company/JobPostingDetailPageContent";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import AppHeader from "@/features/navigation/components/AppHeader";
import AppFooter from "@/components/layout/AppFooter";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
        <AppHeader />
        <main className="px-6 py-6 flex-1">
          <JobPostingDetailPageContent jobId={Number(id)} />
        </main>
        <AppFooter />
      </div>
    </ProtectedRoute>
  );
}
