"use client";

import { Plus, Tag, X } from "lucide-react";
import CreateJobSectionTitle from "./CreateJobSectionTitle";
import type { SkillItem } from "../../../types/job-postings.types";

type Props = {
  skillKeyword: string;
  selectedSkills: SkillItem[];
  suggestions: SkillItem[];
  error?: string;
  onKeywordChange: (value: string) => void;
  onAddSkill: () => void;
  onAddSkillById: (skillId: number) => void;
  onRemoveSkill: (skillId: number) => void;
};

export default function CreateJobSkillsSection({
  skillKeyword,
  selectedSkills,
  suggestions,
  error,
  onKeywordChange,
  onAddSkill,
  onAddSkillById,
  onRemoveSkill,
}: Props) {
  return (
    <section className="space-y-4 border-t border-(--color-border) pt-6">
      <CreateJobSectionTitle icon={<Tag size={20} />} title="Kỹ năng yêu cầu" />

      <div className="flex gap-3">
        <input
          data-field="skillIds"
          value={skillKeyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Nhập kỹ năng (VD: React, NodeJS...)"
          className={`h-12 flex-1 rounded-2xl bg-white px-4 text-[15px] text-(--color-text) outline-none transition ${
            error
              ? "border border-red-400"
              : "border border-(--color-border) focus:border-(--color-accent)"
          }`}
        />

        <button
          type="button"
          onClick={onAddSkill}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-accent) text-white transition hover:brightness-95"
          aria-label="Thêm kỹ năng"
        >
          <Plus size={20} />
        </button>
      </div>

      {suggestions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((skill) => (
            <button
              key={skill.skillId}
              type="button"
              onClick={() => onAddSkillById(skill.skillId)}
              className="rounded-full border border-(--color-border) bg-white px-3 py-1.5 text-[13px] text-(--color-text) transition hover:border-(--color-accent) hover:text-(--color-accent)"
            >
              {skill.skillName}
            </button>
          ))}
        </div>
      ) : null}

      {selectedSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill.skillId}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-surface) px-3 py-1.5 text-[13px] text-(--color-text)"
            >
              {skill.skillName}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill.skillId)}
                className="text-(--color-muted) transition hover:text-red-500"
                aria-label={`Xóa ${skill.skillName}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {error ? <p className="text-[13px] text-red-500">{error}</p> : null}
    </section>
  );
}
