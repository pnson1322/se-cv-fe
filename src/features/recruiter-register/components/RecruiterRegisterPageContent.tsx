import { Building2 } from "lucide-react";
import RecruiterRegisterForm from "./RecruiterRegisterForm";

export default function RecruiterRegisterPageContent() {
  return (
    <main className="min-h-screen bg-(--color-surface) px-4 py-8 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-xl">
          <div className="flex items-center justify-between bg-(--color-primary) px-6 py-5 text-white">
            <div>
              <h1 className="text-2xl font-bold">Đăng ký Nhà tuyển dụng</h1>
              <p className="mt-1 text-sm text-blue-100">
                Hoàn thiện thông tin công ty của bạn
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Building2 size={22} />
            </div>
          </div>

          <div className="p-6 md:p-8">
            <RecruiterRegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
