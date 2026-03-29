import { notFound } from "next/navigation";
import LoginPageContent from "@/features/auth/components/LoginPageContent";
import { slugToRole } from "@/features/auth/constants/roles";

type LoginRolePageProps = {
  params: Promise<{
    role: string;
  }>;
};

export default async function LoginRolePage({ params }: LoginRolePageProps) {
  const { role } = await params;
  const mappedRole = slugToRole(role);

  if (!mappedRole) {
    notFound();
  }

  return <LoginPageContent role={mappedRole} />;
}
