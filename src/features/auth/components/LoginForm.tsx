"use client";

import Link from "next/link";
import { ROLE_CONFIG, type Role } from "../constants/roles";
import GoogleAuthButton from "./GoogleAuthButton";
import { useLoginForm } from "../hooks/useLoginForm";

type LoginFormProps = {
  role: Role;
};

export default function LoginForm({ role }: LoginFormProps) {
  const config = ROLE_CONFIG[role];

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          Email
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-(--color-accent)"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          Mật khẩu
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-(--color-accent)"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-(--color-accent) px-4 py-3 font-semibold text-white hover:opacity-90"
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      {config.canUseGoogleAuth && <GoogleAuthButton mode="login" />}

      {config.canRegister && (
        <div className="text-center text-sm">
          <span>Chưa có tài khoản? </span>
          <Link
            href="/register/recruiter"
            className="font-semibold text-(--color-accent) hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      )}
    </form>
  );
}
