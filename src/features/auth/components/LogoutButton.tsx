"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-4 py-2 text-white"
    >
      Đăng xuất
    </button>
  );
}
