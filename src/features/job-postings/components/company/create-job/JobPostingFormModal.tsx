"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import ClientPortal from "@/components/ClientPortal";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
};

export default function JobPostingFormModal({
  open,
  title,
  children,
  footer,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-400 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-xs">
        <div className="flex h-[min(860px,92vh)] w-full max-w-225 flex-col overflow-hidden rounded-[28px] border border-(--color-border) bg-white shadow-[0_24px_80px_rgba(15,23,42,0.26)]">
          <div className="flex items-center justify-between border-b border-(--color-border) px-8 py-6">
            <h2 className="text-[24px] font-bold tracking-[-0.02em] text-(--color-text)">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-(--color-muted) transition hover:bg-(--color-surface) hover:text-(--color-text)"
              aria-label="Đóng"
            >
              <X size={28} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
            {children}
          </div>

          {footer ? (
            <div className="flex items-center justify-end gap-3 border-t border-(--color-border) bg-white px-8 py-5">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </ClientPortal>
  );
}
