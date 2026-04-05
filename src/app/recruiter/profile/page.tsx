import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import CompanyProfilePageContent from "@/features/company/components/profile/CompanyProfilePageContent";

export default function RecruiterProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <CompanyProfilePageContent />
    </ProtectedRoute>
  );
}
