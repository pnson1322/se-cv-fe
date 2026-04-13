"use client";

type Props = {
  icon: React.ReactNode;
  title: string;
  required?: boolean;
};

export default function CreateJobSectionTitle({
  icon,
  title,
  required = false,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-(--color-accent)">{icon}</div>
      <h3 className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-(--color-text)">
        {title}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </h3>
    </div>
  );
}
