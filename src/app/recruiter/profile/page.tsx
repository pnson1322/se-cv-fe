import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function RecruiterProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <div>lsjdjsdjskdjskjdjkls</div>
    </ProtectedRoute>
  );
}
