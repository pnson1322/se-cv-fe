import type { ReactNode } from "react";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { ROLES } from "@/features/auth/constants/roles";
import AppHeader from "@/features/navigation/components/AppHeader";
import AppFooter from "@/components/layout/AppFooter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="min-h-screen bg-[#F3F4F6]">
        <AppHeader />
        <main className="px-6 py-6">{children}</main>
        <AppFooter />
      </div>
    </ProtectedRoute>
  );
}
