"use client";

import { Loader2 } from "lucide-react";
import JobPostingFormModal from "../create-job/JobPostingFormModal";
import CreateJobBasicInfoSection from "../create-job/CreateJobBasicInfoSection";
import CreateJobSkillsSection from "../create-job/CreateJobSkillsSection";
import CreateJobDescriptionSection from "../create-job/CreateJobDescriptionSection";
import CreateJobExperienceSection from "../create-job/CreateJobExperienceSection";
import { useEditJobPostingModal } from "../../../hooks/useEditJobPostingModal";
import type { JobPosting } from "../../../types/job-postings.types";

type Props = {
  open: boolean;
  job: JobPosting;
  onClose: () => void;
};

export default function EditJobPostingModal({ open, job, onClose }: Props) {
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
  } = useEditJobPostingModal({
    job,
    onClose,
  });

  return (
    <JobPostingFormModal
      open={open}
      title="Chỉnh sửa tin tuyển dụng"
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
            form="edit-job-posting-form"
            disabled={isSubmitting || isLoadingOptions}
            className="inline-flex items-center gap-2 rounded-2xl bg-(--color-accent) px-6 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
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
          id="edit-job-posting-form"
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
