import AuthSplitLayout from "./AuthSplitLayout";
import AuthCard from "./AuthCard";
import LoginForm from "./LoginForm";

export default function LoginPageContent() {
  return (
    <AuthSplitLayout>
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </AuthSplitLayout>
  );
}
