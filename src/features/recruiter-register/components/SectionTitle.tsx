import type { ReactNode } from "react";

type SectionTitleProps = {
  icon: ReactNode;
  title: string;
};

export default function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="text-(--color-accent)">{icon}</div>
      <h3 className="text-base font-semibold text-(--color-text)">{title}</h3>
    </div>
  );
}
