import { Role } from "../constants/roles";
import AuthCard from "./AuthCard";
import LoginForm from "./LoginForm";

type LoginPageContentRole = {
  role: Role;
};

export default function LoginPageContent({ role }: LoginPageContentRole) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-surface) px-6 py-12">
      <AuthCard role={role}>
        <LoginForm role={role} />
      </AuthCard>
    </main>
  );
}
