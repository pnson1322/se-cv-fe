"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  CircleX,
  ShieldAlert,
} from "lucide-react";

type Tone = "cyan" | "blue" | "green" | "red" | "orange";

type Props = {
  title: string;
  content: string;
  tone?: Tone;
  listMode?: boolean;
};

function getToneClassName(tone: Tone) {
  if (tone === "blue") {
    return {
      bg: "bg-blue-50",
      text: "text-blue-500",
      contentText: "text-slate-700",
    };
  }

  if (tone === "green") {
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-500",
      contentText: "text-slate-700",
    };
  }

  if (tone === "red") {
    return {
      bg: "bg-red-50",
      text: "text-red-500",
      contentText: "text-red-700",
    };
  }

  if (tone === "orange") {
    return {
      bg: "bg-orange-50",
      text: "text-orange-500",
      contentText: "text-orange-700",
    };
  }

  return {
    bg: "bg-cyan-50",
    text: "text-(--color-accent)",
    contentText: "text-slate-700",
  };
}

function renderContent(
  content: string,
  listMode: boolean | undefined,
  contentTextClassName: string,
) {
  if (!listMode) {
    return (
      <div
        className={`space-y-4 text-[15px] leading-8 ${contentTextClassName}`}
      >
        {content.split("\n").map((paragraph, index) => (
          <p key={`${paragraph}-${index}`}>{paragraph}</p>
        ))}
      </div>
    );
  }

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {lines.map((line, index) => (
        <div
          key={`${line}-${index}`}
          className={`flex items-start gap-3 text-[15px] leading-8 ${contentTextClassName}`}
        >
          <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-500" />
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
}

export default function JobPostingDetailSection({
  title,
  content,
  tone = "cyan",
  listMode = false,
}: Props) {
  const toneClassName = getToneClassName(tone);

  const icon =
    tone === "blue" ? (
      <FileText size={20} className={toneClassName.text} />
    ) : tone === "green" ? (
      <CheckCircle2 size={20} className={toneClassName.text} />
    ) : tone === "red" ? (
      <CircleX size={20} className={toneClassName.text} />
    ) : tone === "orange" ? (
      <ShieldAlert size={20} className={toneClassName.text} />
    ) : (
      <BriefcaseBusiness size={20} className={toneClassName.text} />
    );

  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneClassName.bg}`}
        >
          {icon}
        </div>

        <h2 className="text-[20px] font-bold text-(--color-text)">{title}</h2>
      </div>

      {renderContent(content, listMode, toneClassName.contentText)}
    </section>
  );
}
