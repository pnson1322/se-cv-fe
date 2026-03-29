"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recruiterRegisterSchema,
  type RecruiterRegisterSchemaType,
} from "../schema/recruiter-register.schema";
import { useRecruiterRegister } from "../hooks/useRecruiterRegister";
import GoogleAuthButton from "./GoogleAuthButton";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}

export default function RecruiterRegisterForm() {
  const { registerRecruiter, isLoading } = useRecruiterRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruiterRegisterSchemaType>({
    resolver: zodResolver(
      recruiterRegisterSchema,
    ) as unknown as Resolver<RecruiterRegisterSchemaType>,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: RecruiterRegisterSchemaType) => {
    registerRecruiter(values);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          Email
        </label>
        <input
          type="text"
          placeholder="user@example.com"
          {...register("email")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-(--color-text) outline-none transition focus:ring-2 ${
            errors.email
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)/20"
          }`}
        />
        <FieldError message={errors.email?.message} />
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
        <FieldError message={errors.password?.message} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          Nhập lại mật khẩu
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-(--color-text) outline-none transition focus:ring-2 ${
            errors.confirmPassword
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)/20"
          }`}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-(--color-accent) px-4 py-3 font-semibold text-white shadow-md transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-(--color-border)" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-slate-400">hoặc</span>
        </div>
      </div>

      <GoogleAuthButton />

      <div className="pt-1 text-center text-sm text-slate-600">
        <span>Đã có tài khoản? </span>
        <Link
          href="/login/recruiter"
          className="font-semibold text-(--color-accent) transition hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
}
