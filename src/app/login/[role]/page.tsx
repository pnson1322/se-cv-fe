import { notFound } from "next/navigation";
import LoginPageContent from "@/features/auth/components/LoginPageContent";
import { isValidRole } from "@/features/auth/constants/roles";

type LoginRolePageProps = {
  params: Promise<{
    role: string;
  }>;
};

export default async function LoginRolePage({ params }: LoginRolePageProps) {
  const { role } = await params;

  if (!isValidRole(role)) {
    notFound();
  }

  return <LoginPageContent role={role} />;
}
