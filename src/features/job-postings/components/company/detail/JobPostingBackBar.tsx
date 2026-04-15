"use client";

type Props = {
  onBack: () => void;
};

export default function JobPostingBackBar({ onBack }: Props) {
  return (
    <div className="flex items-center gap-2 text-[15px] text-(--color-muted)">
      <button
        type="button"
        onClick={onBack}
        className="font-semibold text-(--color-text) transition hover:text-(--color-primary)"
      >
        ← Quay lại
      </button>
      <span>/</span>
      <span>Chi tiết công việc</span>
    </div>
  );
}
