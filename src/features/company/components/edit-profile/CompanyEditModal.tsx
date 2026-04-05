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
  maxWidthClassName?: string;
};

export default function CompanyEditModal({
  open,
  title,
  children,
  footer,
  onClose,
  maxWidthClassName = "max-w-[520px]",
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
      <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/50 px-4 py-5 backdrop-blur-xs">
        <div
          className={`w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.24)] ${maxWidthClassName}`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Đóng"
            >
              <X size={30} strokeWidth={2.2} />
            </button>
          </div>

          <div className="px-8 py-6">{children}</div>

          {footer && (
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-8 py-5">
              {footer}
            </div>
          )}
        </div>
      </div>
    </ClientPortal>
  );
}
