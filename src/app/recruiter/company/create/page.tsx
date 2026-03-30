import RecruiterRegisterPageContent from "@/features/recruiter-register/components/RecruiterRegisterPageContent";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function RecruiterCompanyCreatePage() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <RecruiterRegisterPageContent />
    </ProtectedRoute>
  );
}
