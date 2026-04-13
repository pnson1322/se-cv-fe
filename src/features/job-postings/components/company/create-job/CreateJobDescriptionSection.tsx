"use client";

import { CircleCheckBig, FileText, ScrollText } from "lucide-react";
import CreateJobSectionTitle from "./CreateJobSectionTitle";
import type { CreateJobPostingFieldErrors } from "../../../schemas/create-job-posting.schema";

type Props = {
  jobDescription: string;
  requirements: string;
  benefits: string;
  errors: CreateJobPostingFieldErrors;
  onJobDescriptionChange: (value: string) => void;
  onRequirementsChange: (value: string) => void;
  onBenefitsChange: (value: string) => void;
};

export default function CreateJobDescriptionSection({
  jobDescription,
  requirements,
  benefits,
  errors,
  onJobDescriptionChange,
  onRequirementsChange,
  onBenefitsChange,
}: Props) {
  return (
    <section className="space-y-6 border-t border-(--color-border) pt-6">
      <div className="space-y-3">
        <CreateJobSectionTitle
          icon={<FileText size={20} />}
          title="Mô tả công việc"
          required
        />

        <textarea
          data-field="jobDescription"
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Mô tả chi tiết công việc và trách nhiệm..."
          rows={6}
          className={`w-full resize-none rounded-2xl bg-white px-4 py-3 text-[15px] leading-7 text-(--color-text) outline-none transition ${
            errors.jobDescription
              ? "border border-red-400"
              : "border border-(--color-border) focus:border-(--color-accent)"
          }`}
        />

        {errors.jobDescription ? (
          <p className="text-[13px] text-red-500">{errors.jobDescription}</p>
        ) : null}
      </div>

      <div className="space-y-3">
        <CreateJobSectionTitle
          icon={<ScrollText size={20} />}
          title="Yêu cầu ứng viên"
          required
        />

        <textarea
          data-field="requirements"
          value={requirements}
          onChange={(e) => onRequirementsChange(e.target.value)}
          placeholder="Nhập mỗi yêu cầu trên một dòng..."
          rows={6}
          className={`w-full resize-none rounded-2xl bg-white px-4 py-3 text-[15px] leading-7 text-(--color-text) outline-none transition ${
            errors.requirements
              ? "border border-red-400"
              : "border border-(--color-border) focus:border-(--color-accent)"
          }`}
        />

        <p className="text-[13px] text-(--color-muted)">
          💡 Mỗi yêu cầu nên bắt đầu một dòng mới
        </p>

        {errors.requirements ? (
          <p className="text-[13px] text-red-500">{errors.requirements}</p>
        ) : null}
      </div>

      <div className="space-y-3">
        <CreateJobSectionTitle
          icon={<CircleCheckBig size={20} />}
          title="Quyền lợi"
          required
        />

        <textarea
          data-field="benefits"
          value={benefits}
          onChange={(e) => onBenefitsChange(e.target.value)}
          placeholder="Nhập mỗi quyền lợi trên một dòng..."
          rows={6}
          className={`w-full resize-none rounded-2xl bg-white px-4 py-3 text-[15px] leading-7 text-(--color-text) outline-none transition ${
            errors.benefits
              ? "border border-red-400"
              : "border border-(--color-border) focus:border-(--color-accent)"
          }`}
        />

        <p className="text-[13px] text-(--color-muted)">
          💡 Mỗi quyền lợi nên bắt đầu một dòng mới
        </p>

        {errors.benefits ? (
          <p className="text-[13px] text-red-500">{errors.benefits}</p>
        ) : null}
      </div>
    </section>
  );
}
