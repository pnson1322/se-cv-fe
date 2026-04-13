"use client";

import { Loader2 } from "lucide-react";
import { useCreateJobPostingModal } from "../../../hooks/useCreateJobPostingModal";
import JobPostingFormModal from "./JobPostingFormModal";
import CreateJobBasicInfoSection from "./CreateJobBasicInfoSection";
import CreateJobSkillsSection from "./CreateJobSkillsSection";
import CreateJobDescriptionSection from "./CreateJobDescriptionSection";
import CreateJobExperienceSection from "./CreateJobExperienceSection";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateJobPostingModal({ open, onClose }: Props) {
  const {
    values,
    errors,
    skillKeyword,
    setSkillKeyword,
    selectedSkills,
    availableSkillSuggestions,
    categoryOptions,
    experienceOptions,
    isLoadingOptions,
    isSubmitting,
    setFieldValue,
    addSkillById,
    handleAddSkill,
    removeSkill,
    handleSubmit,
  } = useCreateJobPostingModal({
    onClose,
  });

  return (
    <JobPostingFormModal
      open={open}
      title="Đăng tin tuyển dụng mới"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-2xl border border-(--color-border) bg-white px-5 py-2.5 text-[15px] font-semibold text-(--color-text) transition hover:bg-(--color-surface) disabled:opacity-60"
          >
            Hủy
          </button>

          <button
            type="submit"
            form="create-job-posting-form"
            disabled={isSubmitting || isLoadingOptions}
            className="inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-6 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Đang đăng...
              </>
            ) : (
              "Đăng tin"
            )}
          </button>
        </>
      }
    >
      {isLoadingOptions ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-(--color-muted)" />
        </div>
      ) : (
        <form
          id="create-job-posting-form"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <CreateJobBasicInfoSection
            values={values}
            errors={errors}
            categoryOptions={categoryOptions}
            onChange={setFieldValue}
          />

          <CreateJobSkillsSection
            skillKeyword={skillKeyword}
            selectedSkills={selectedSkills}
            suggestions={availableSkillSuggestions}
            error={errors.skillIds}
            onKeywordChange={setSkillKeyword}
            onAddSkill={handleAddSkill}
            onAddSkillById={addSkillById}
            onRemoveSkill={removeSkill}
          />

          <CreateJobDescriptionSection
            jobDescription={values.jobDescription}
            requirements={values.requirements}
            benefits={values.benefits}
            errors={errors}
            onJobDescriptionChange={(value) =>
              setFieldValue("jobDescription", value)
            }
            onRequirementsChange={(value) =>
              setFieldValue("requirements", value)
            }
            onBenefitsChange={(value) => setFieldValue("benefits", value)}
          />

          <CreateJobExperienceSection
            experienceLevel={values.experienceLevel}
            error={errors.experienceLevel}
            options={experienceOptions}
            onChange={(value) => setFieldValue("experienceLevel", value)}
          />
        </form>
      )}
    </JobPostingFormModal>
  );
}
