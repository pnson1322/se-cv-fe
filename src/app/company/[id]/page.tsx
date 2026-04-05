import CompanyProfilePageContent from "@/features/company/components/profile/CompanyProfilePageContent";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <ProtectedRoute allowedRoles={["STUDENT", "ADMIN"]}>
      <CompanyProfilePageContent companyId={id} />
    </ProtectedRoute>
  );
}
