import AuthSplitLayout from "./AuthSplitLayout";
import RecruiterRegisterCard from "./RecruiterRegisterCard";
import RecruiterRegisterForm from "./RecruiterRegisterForm";

export default function RecruiterRegisterPageContent() {
  return (
    <AuthSplitLayout>
      <RecruiterRegisterCard>
        <RecruiterRegisterForm />
      </RecruiterRegisterCard>
    </AuthSplitLayout>
  );
}
