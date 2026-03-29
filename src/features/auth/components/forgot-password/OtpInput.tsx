"use client";

import { useRef } from "react";

type OtpInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  length?: number;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, inputValue: string) => {
    const digit = inputValue.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[index] = digit;
    onChange(next);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const next = Array.from({ length }, (_, i) => pasted[i] || "");
    onChange(next);

    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          maxLength={1}
          className="h-14 w-12 rounded-xl border border-(--color-border) bg-white text-center text-xl font-semibold text-(--color-text) outline-none transition focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 sm:h-16 sm:w-14 sm:text-2xl"
        />
      ))}
    </div>
  );
}
