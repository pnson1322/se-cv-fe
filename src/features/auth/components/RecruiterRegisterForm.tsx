"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InputHTMLAttributes } from "react";
import {
  recruiterRegisterSchema,
  type RecruiterRegisterSchemaType,
} from "../schema/recruiter-register.schema";
import { useRecruiterRegister } from "../hooks/useRecruiterRegister";
import GoogleAuthButton from "./GoogleAuthButton";

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}

function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div>
      <label className="mb-2.5 block text-[17px] font-semibold text-[#111827]">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-2xl border px-4 py-4 text-base text-[#111827] outline-none transition ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 bg-[#F8FAFC] focus:border-[#06B6D4] focus:ring-4 focus:ring-cyan-100"
        } ${className ?? ""}`}
      />
      <FieldError message={error} />
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
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="text"
        placeholder="user@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Nhập lại mật khẩu"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-[#06B6D4] px-4 py-4 text-lg font-bold text-white shadow-md transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </button>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-base text-slate-400">hoặc</span>
        </div>
      </div>

      <GoogleAuthButton />

      <div className="pt-1 text-center text-base text-slate-600">
        <span>Đã có tài khoản? </span>
        <Link
          href="/login"
          className="font-semibold text-[#06B6D4] transition hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
}
