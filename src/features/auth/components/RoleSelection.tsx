import RoleCard from "./RoleCard";
import { ROLES } from "../constants/roles";

export default function RoleSelection() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-(--color-primary) to-(--color-accent) px-6 py-12">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center text-white">
          <h1 className="mb-3 text-5xl font-bold">Hệ thống Kết nối Việc làm</h1>
          <p className="text-2xl text-cyan-100">Chọn vai trò để tiếp tục</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <RoleCard role={ROLES.STUDENT} />
          <RoleCard role={ROLES.RECRUITER} />
          <RoleCard role={ROLES.ADMIN} />
        </div>
      </div>
    </main>
  );
}
