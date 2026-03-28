"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { useState } from "react";

type UploadBoxProps = {
  label?: string;
  hint?: string;
  size?: "sm" | "md" | "lg";
  multiple?: boolean;
  onFileChange?: (files: FileList | null) => void;
  fileCount?: number;
  maxFiles?: number;
  fileName?: string;
  previewUrl?: string;
  previewUrls?: string[];
  onRemove?: () => void;
  onRemoveAt?: (index: number) => void;
};

export default function UploadBox({
  label,
  hint,
  size = "md",
  multiple = false,
  onFileChange,
  fileCount,
  maxFiles,
  fileName,
  previewUrl,
  previewUrls,
  onRemove,
  onRemoveAt,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const sizeClass = size === "sm" ? "h-36" : size === "lg" ? "h-52" : "h-40";

  const hasSinglePreview = Boolean(previewUrl);
  const hasMultiPreview = Boolean(previewUrls && previewUrls.length > 0);

  const counterText =
    typeof fileCount === "number" && typeof maxFiles === "number"
      ? `${fileCount} / ${maxFiles} ảnh`
      : typeof fileCount === "number"
        ? `Đã chọn ${fileCount} ảnh`
        : "";

  return (
    <div>
      {label && (
        <label className="mb-2 block text-base font-bold text-(--color-text)">
          {label}
        </label>
      )}

      <div className="space-y-3">
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => {
            setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            onFileChange?.(event.dataTransfer.files);
          }}
          className={`relative flex w-full cursor-pointer ${sizeClass} flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed bg-white px-4 text-slate-500 transition ${
            isDragging
              ? "border-(--color-accent) bg-cyan-50"
              : "border-(--color-border)] hover:border-(--color-accent) hover:bg-slate-50"
          }`}
        >
          <input
            type="file"
            multiple={multiple}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={(event) => onFileChange?.(event.target.files)}
          />

          {hasSinglePreview ? (
            <>
              <img
                src={previewUrl}
                alt="Ảnh đã chọn"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-(--color-text) shadow">
                Đổi ảnh
              </div>
            </>
          ) : (
            <>
              <div className="mb-2 rounded-full bg-(--color-primary)/10 p-3 text-(--color-primary)">
                {size === "sm" ? <Upload size={18} /> : <ImagePlus size={22} />}
              </div>

              <span className="text-sm font-medium text-(--color-text)">
                {multiple ? "Thêm ảnh" : "Tải ảnh lên"}
              </span>

              {fileName && (
                <span className="mt-1 text-xs text-slate-500">{fileName}</span>
              )}

              {counterText && (
                <span className="mt-1 text-xs font-medium text-slate-500">
                  {counterText}
                </span>
              )}

              {hint && (
                <span className="mt-1 text-xs text-slate-400">{hint}</span>
              )}

              {multiple && (
                <span className="mt-1 text-xs text-slate-400">
                  Kéo thả ảnh vào đây hoặc bấm để chọn
                </span>
              )}
            </>
          )}
        </label>

        {hasSinglePreview && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-2 rounded-lg border border-(--color-border) bg-white px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
          >
            <X size={16} />
            Xóa ảnh
          </button>
        )}

        {hasMultiPreview && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {previewUrls!.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative overflow-hidden rounded-xl border border-(--color-border) bg-white shadow-sm"
              >
                <img
                  src={url}
                  alt={`Ảnh văn phòng ${index + 1}`}
                  className="h-28 w-full object-cover"
                />

                {onRemoveAt && (
                  <button
                    type="button"
                    onClick={() => onRemoveAt(index)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-red-500 shadow transition hover:bg-red-50"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
