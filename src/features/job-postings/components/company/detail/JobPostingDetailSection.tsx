"use client";

import { BriefcaseBusiness, CheckCircle2, FileText } from "lucide-react";

type Tone = "cyan" | "blue" | "green";

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
    };
  }

  if (tone === "green") {
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-500",
    };
  }

  return {
    bg: "bg-cyan-50",
    text: "text-(--color-accent)",
  };
}

function renderContent(content: string, listMode?: boolean) {
  if (!listMode) {
    return (
      <div className="space-y-4">
        {content.split("\n").map((paragraph, index) => (
          <p
            key={`${paragraph}-${index}`}
            className="text-[15px] leading-8 text-(--color-muted)"
          >
            {paragraph}
          </p>
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
        <div key={`${line}-${index}`} className="flex items-start gap-3">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-emerald-500"
          />
          <p className="text-[15px] leading-7 text-(--color-muted)">{line}</p>
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
      <FileText size={19} />
    ) : tone === "green" ? (
      <CheckCircle2 size={19} />
    ) : (
      <BriefcaseBusiness size={19} />
    );

  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${toneClassName.bg} ${toneClassName.text}`}
        >
          {icon}
        </div>

        <h3 className="text-[18px] font-bold text-(--color-text)">{title}</h3>
      </div>

      {renderContent(content, listMode)}
    </section>
  );
}
