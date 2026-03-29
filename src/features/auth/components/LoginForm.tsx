"use client";

import Link from "next/link";
import { ROLE_CONFIG, type Role } from "../constants/roles";
import GoogleAuthButton from "./GoogleAuthButton";
import { useLoginForm } from "../hooks/useLoginForm";
import { AlertCircle } from "lucide-react";

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
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          Email
        </label>
        <input
          type="text"
          placeholder="email@example.com"
          {...register("email")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-(--color-text) outline-none transition focus:ring-2 ${
            errors.email
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)/20"
          }`}
        />
        {errors.email && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle size={16} />
            <span>{errors.email.message}</span>
          </div>
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
          className={`w-full rounded-xl border bg-white px-4 py-3 text-(--color-text) outline-none transition focus:ring-2 ${
            errors.password
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)/20"
          }`}
        />
        {errors.password && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle size={16} />
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          type="button"
          className="text-sm font-medium text-(--color-primary) transition hover:underline"
        >
          Quên mật khẩu?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-(--color-accent) px-4 py-3 font-semibold text-white shadow-md transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      {config.canUseGoogleAuth && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--color-border)" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-slate-400">hoặc</span>
            </div>
          </div>

          <GoogleAuthButton />
        </>
      )}

      {config.canRegister && (
        <div className="pt-1 text-center text-sm text-slate-600">
          <span>Chưa có tài khoản? </span>
          <Link
            href="/register/recruiter"
            className="font-semibold text-(--color-accent) transition hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      )}
    </form>
  );
}
