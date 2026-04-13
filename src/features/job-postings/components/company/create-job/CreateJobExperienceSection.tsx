"use client";

import { Layers3 } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import CreateJobSectionTitle from "./CreateJobSectionTitle";

type Option = {
  label: string;
  value: string;
};

type Props = {
  experienceLevel: string;
  error?: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CreateJobExperienceSection({
  experienceLevel,
  error,
  options,
  onChange,
}: Props) {
  return (
    <section className="space-y-4 border-t border-(--color-border) pt-6">
      <CreateJobSectionTitle icon={<Layers3 size={20} />} title="Trình độ" />

      <div>
        <label className="mb-2 block text-[14px] font-semibold text-(--color-text)">
          Trình độ <span className="text-red-500">*</span>
        </label>

        <div
          data-field="experienceLevel"
          tabIndex={-1}
          className="rounded-2xl outline-none"
        >
          <CustomSelect
            label=""
            placeholder="Chọn trình độ"
            value={experienceLevel}
            options={options}
            error={error}
            onChange={onChange}
          />
        </div>

        {error ? (
          <p className="mt-2 text-[13px] text-red-500">{error}</p>
        ) : null}
      </div>
    </section>
  );
}
