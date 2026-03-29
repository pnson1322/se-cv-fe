"use client";

type PasswordStrength = "weak" | "medium" | "strong" | "empty";

type PasswordStrengthBarProps = {
  password: string;
};

function getPasswordStrength(password: string): {
  label: string;
  level: PasswordStrength;
  widthClass: string;
  colorClass: string;
} {
  if (!password) {
    return {
      label: "",
      level: "empty",
      widthClass: "w-0",
      colorClass: "bg-transparent",
    };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 6;

  const score = [hasLower, hasUpper, hasNumber, hasMinLength].filter(
    Boolean,
  ).length;

  if (score <= 2) {
    return {
      label: "Yếu",
      level: "weak",
      widthClass: "w-1/3",
      colorClass: "bg-red-500",
    };
  }

  if (score === 3) {
    return {
      label: "Trung bình",
      level: "medium",
      widthClass: "w-2/3",
      colorClass: "bg-orange-500",
    };
  }

  return {
    label: "Mạnh",
    level: "strong",
    widthClass: "w-full",
    colorClass: "bg-green-500",
  };
}

export default function PasswordStrengthBar({
  password,
}: PasswordStrengthBarProps) {
  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Độ mạnh:</span>
        <span
          className={
            strength.level === "weak"
              ? "font-semibold text-red-500"
              : strength.level === "medium"
                ? "font-semibold text-orange-500"
                : strength.level === "strong"
                  ? "font-semibold text-green-500"
                  : "text-transparent"
          }
        >
          {strength.label || "—"}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${strength.widthClass} ${strength.colorClass}`}
        />
      </div>
    </div>
  );
}
