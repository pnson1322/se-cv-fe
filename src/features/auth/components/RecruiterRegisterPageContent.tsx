import RecruiterRegisterCard from "./RecruiterRegisterCard";
import RecruiterRegisterForm from "./RecruiterRegisterForm";

export default function RecruiterRegisterPageContent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-surface) px-6 py-12">
      <RecruiterRegisterCard>
        <RecruiterRegisterForm />
      </RecruiterRegisterCard>
    </main>
  );
}
