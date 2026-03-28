"use client";

import { AlertCircle, Building2, Image, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import SectionTitle from "./SectionTitle";
import UploadBox from "./UploadBox";
import CustomSelect from "@/components/CustomSelect";
import { useRecruiterRegisterForm } from "../hooks/useRecruiterRegisterForm";
import { toast } from "sonner";

const COMPANY_SIZE_OPTIONS = [
  { label: "1-10 nhân viên", value: "1-10" },
  { label: "11-50 nhân viên", value: "11-50" },
  { label: "50-100 nhân viên", value: "50-100" },
  { label: "100-500 nhân viên", value: "100-500" },
  { label: "500+ nhân viên", value: "500+" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}

export default function RecruiterRegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isSubmitting,
    setValue,
    control,
  } = useRecruiterRegisterForm();

  const logo = useWatch({ control, name: "logo" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const officeImages = useWatch({ control, name: "officeImages" });
  const companySize = useWatch({ control, name: "company_size" });

  const logoPreview = useMemo(() => {
    return logo ? URL.createObjectURL(logo) : "";
  }, [logo]);

  const coverPreview = useMemo(() => {
    return coverImage ? URL.createObjectURL(coverImage) : "";
  }, [coverImage]);

  const officePreviewUrls = useMemo(() => {
    return officeImages?.length
      ? officeImages.map((file) => URL.createObjectURL(file))
      : [];
  }, [officeImages]);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  useEffect(() => {
    return () => {
      officePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [officePreviewUrls]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Upload */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <UploadBox
            label="Logo công ty"
            hint="PNG/JPG/WEBP, tối đa 5MB"
            size="sm"
            fileName={logo?.name}
            previewUrl={logoPreview}
            onRemove={() =>
              setValue("logo", undefined, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            onFileChange={(files) => {
              const file = files?.[0];
              if (!file) return; // ✅ cancel thì giữ ảnh cũ
              setValue("logo", file, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
          <FieldError message={errors.logo?.message as string | undefined} />
        </div>

        <div className="md:col-span-2">
          <UploadBox
            label="Ảnh bìa"
            hint="PNG/JPG/WEBP, tối đa 5MB"
            size="sm"
            fileName={coverImage?.name}
            previewUrl={coverPreview}
            onRemove={() =>
              setValue("coverImage", undefined, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            onFileChange={(files) => {
              const file = files?.[0];
              if (!file) return; // ✅ cancel thì giữ ảnh cũ
              setValue("coverImage", file, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
          <FieldError
            message={errors.coverImage?.message as string | undefined}
          />
        </div>
      </div>

      {/* Company */}
      <section>
        <SectionTitle
          icon={<Building2 size={18} />}
          title="Thông tin công ty"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Tên công ty
            </label>
            <input
              {...register("company_name")}
              placeholder="Công ty TNHH ABC"
              className={`w-full rounded-xl border px-4 py-3 outline-none ${
                errors.company_name ? "border-red-400" : "border-gray-300"
              }`}
            />
            <FieldError message={errors.company_name?.message} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Slogan</label>
            <input
              {...register("slogan")}
              placeholder="Công ty công nghệ..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Ngành nghề</label>
            <input
              {...register("industry")}
              placeholder="Information Technology"
              className={`w-full rounded-xl border px-4 py-3 ${
                errors.industry ? "border-red-400" : "border-gray-300"
              }`}
            />
            <FieldError message={errors.industry?.message} />
          </div>

          <div>
            <CustomSelect
              label="Quy mô công ty"
              placeholder="Chọn một tùy chọn"
              value={companySize}
              options={COMPANY_SIZE_OPTIONS}
              onChange={(value) =>
                setValue("company_size", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              error={errors.company_size?.message}
            />
            <FieldError message={errors.company_size?.message} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Website</label>
            <input
              {...register("website")}
              placeholder="https://company.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
            <FieldError message={errors.website?.message} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Mô tả</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>
        </div>
      </section>

      {/* Address */}
      <section>
        <SectionTitle icon={<MapPin size={18} />} title="Địa chỉ công ty" />

        <input
          {...register("address")}
          placeholder="Số nhà..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        />
        <FieldError message={errors.address?.message} />
      </section>

      {/* Contact */}
      <section>
        <SectionTitle icon={<Mail size={18} />} title="Liên hệ" />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              {...register("contact_email")}
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
            <FieldError message={errors.contact_email?.message} />
          </div>

          <div>
            <input
              {...register("contact_phone")}
              placeholder="Số điện thoại"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
            <FieldError message={errors.contact_phone?.message} />
          </div>
        </div>
      </section>

      {/* Office images */}
      <section>
        <SectionTitle
          icon={<Image size={18} aria-label="Preview ảnh văn phòng" />}
          title="Ảnh văn phòng"
        />

        <UploadBox
          multiple
          hint="Tối đa 6 ảnh. Khuyến nghị JPG/PNG/WEBP"
          maxFiles={6}
          fileCount={officeImages?.length ?? 0}
          previewUrls={officePreviewUrls}
          onFileChange={(files) => {
            if (!files || files.length === 0) return;

            const newFiles = Array.from(files);
            const currentFiles = officeImages || [];

            const merged = [...currentFiles, ...newFiles];

            const uniqueFiles = merged.filter(
              (file, index, self) =>
                index ===
                self.findIndex(
                  (f) => f.name === file.name && f.size === file.size,
                ),
            );

            if (uniqueFiles.length > 6) {
              toast.warning("Chỉ được chọn tối đa 6 ảnh văn phòng");
            }

            const finalFiles = uniqueFiles.slice(0, 6);

            setValue("officeImages", finalFiles, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
          onRemoveAt={(index) => {
            const nextFiles = officeImages.filter((_, i) => i !== index);
            setValue("officeImages", nextFiles, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        <FieldError
          message={errors.officeImages?.message as string | undefined}
        />
      </section>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border px-5 py-3"
        >
          Quay lại
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-cyan-500 px-5 py-3 text-white"
        >
          {isSubmitting ? "Đang xử lý..." : "Hoàn tất đăng ký"}
        </button>
      </div>
    </form>
  );
}
