"use client";

import Link from "next/link";
import {
  forwardRef,
  useRef,
  useState,
  type ClipboardEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import { AlertCircle } from "lucide-react";
import ForgotPasswordFlow from "./forgot-password/ForgotPasswordFlow";
import GoogleAuthButton from "./GoogleAuthButton";

type InputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    setValue,
  } = useLoginForm();

  const [manualMode, setManualMode] = useState(false);
  const [manualEmail, setManualEmail] = useState("");
  const [manualPassword, setManualPassword] = useState("");
  const [manualKey, setManualKey] = useState(0);

  const manualEmailRef = useRef<HTMLInputElement | null>(null);

  const emailField = register("email");
  const passwordField = register("password");

  const isAutofilled = (element: HTMLInputElement) => {
    const selectors = [":autofill", ":-webkit-autofill"];

    return selectors.some((selector) => {
      try {
        return element.matches(selector);
      } catch {
        return false;
      }
    });
  };

  const syncEmail = (value: string) => {
    setManualEmail(value);
    setValue("email", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const syncPassword = (value: string) => {
    setManualPassword(value);
    setValue("password", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const enterManualMode = (nextEmail = "") => {
    setManualMode(true);
    setManualKey((prev) => prev + 1);

    syncEmail(nextEmail);
    syncPassword("");

    requestAnimationFrame(() => {
      manualEmailRef.current?.focus();
    });
  };

  const handleAutofilledEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const element = e.currentTarget;

    if (!isAutofilled(element)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      enterManualMode("");
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      enterManualMode(e.key);
    }
  };

  const handleAutofilledEmailPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const element = e.currentTarget;

    if (!isAutofilled(element)) return;

    e.preventDefault();
    enterManualMode(e.clipboardData.getData("text"));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!manualMode ? (
        <>
          <Input
            id="email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="username"
            placeholder="email@example.com"
            error={errors.email?.message}
            onKeyDown={handleAutofilledEmailKeyDown}
            onPaste={handleAutofilledEmailPaste}
            {...emailField}
          />

          <Input
            id="current-password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...passwordField}
          />
        </>
      ) : (
        <>
          <Input
            key={`manual-email-${manualKey}`}
            ref={manualEmailRef}
            id={`manual-email-${manualKey}`}
            name={`manual-email-${manualKey}`}
            label="Email"
            type="text"
            inputMode="email"
            autoComplete="off"
            placeholder="email@example.com"
            error={errors.email?.message}
            value={manualEmail}
            onChange={(e) => {
              const nextValue = e.target.value;
              syncEmail(nextValue);

              if (nextValue === "" && manualPassword !== "") {
                syncPassword("");
              }
            }}
          />

          <Input
            key={`manual-password-${manualKey}`}
            id={`manual-password-${manualKey}`}
            name={`manual-password-${manualKey}`}
            label="Mật khẩu"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.password?.message}
            value={manualPassword}
            onChange={(e) => {
              syncPassword(e.target.value);
            }}
          />
        </>
      )}

      <div className="flex items-center justify-end">
        <ForgotPasswordFlow
          trigger={
            <button
              type="button"
              className="text-base font-medium text-[#1E3A8A] transition hover:underline"
            >
              Quên mật khẩu?
            </button>
          }
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-[#06B6D4] px-4 py-4 text-lg font-bold text-white shadow-md transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <Divider />

      <GoogleAuthButton />

      <div className="rounded-2xl bg-[#F3F4F6] px-5 py-4 text-center text-base text-slate-600">
        <span>Bạn là nhà tuyển dụng? </span>
        <Link
          href="/register/recruiter"
          className="font-semibold text-[#06B6D4] transition hover:underline"
        >
          Đăng ký tài khoản
        </Link>
      </div>
    </form>
  );
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, name, ...props },
  ref,
) {
  const inputId = id ?? name;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2.5 block text-[17px] font-semibold text-[#111827]"
      >
        {label}
      </label>

      <input
        ref={ref}
        id={inputId}
        name={name}
        {...props}
        className={`w-full rounded-2xl border px-4 py-4 text-base text-[#111827] outline-none transition ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-4 focus:ring-red-100"
            : "border-slate-200 bg-[#F8FAFC] focus:border-[#06B6D4] focus:ring-4 focus:ring-cyan-100"
        } ${className ?? ""}`}
      />

      {error && (
        <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
          <AlertCircle size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

function Divider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base text-slate-400">hoặc</span>
      </div>
    </div>
  );
}
