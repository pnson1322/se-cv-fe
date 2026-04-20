"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesList, getSkillList } from "../api/job-postings.api";
import { useUpdateJobPostingMutation } from "./useUpdateJobPostingMutation";
import {
  createJobPostingSchema,
  type CreateJobPostingFieldErrors,
  type CreateJobPostingFormValues,
} from "../schemas/create-job-posting.schema";
import { EXPERIENCE_LEVEL_OPTIONS } from "../constants/job-posting-form.constants";
import { mapJobPostingToFormValues } from "../utils/job-posting-form.utils";
import type { JobPosting, PutBody } from "../types/job-postings.types";

type Params = {
  job: JobPosting;
  onClose: () => void;
};

export function useEditJobPostingModal({ job, onClose }: Params) {
  const [values, setValues] = useState<CreateJobPostingFormValues>(() =>
    mapJobPostingToFormValues(job),
  );
  const [errors, setErrors] = useState<CreateJobPostingFieldErrors>({});
  const [skillKeyword, setSkillKeyword] = useState("");

  const updateMutation = useUpdateJobPostingMutation({ jobId: job.jobId });

  const categoriesQuery = useQuery({
    queryKey: ["job-postings", "categories"],
    queryFn: getCategoriesList,
  });

  const skillsQuery = useQuery({
    queryKey: ["job-postings", "skills"],
    queryFn: getSkillList,
  });

  const categories = useMemo(
    () => categoriesQuery.data?.data ?? [],
    [categoriesQuery.data],
  );

  const skills = useMemo(
    () => skillsQuery.data?.data ?? [],
    [skillsQuery.data],
  );

  const selectedSkills = useMemo(() => {
    return skills.filter((skill) => values.skillIds.includes(skill.skillId));
  }, [skills, values.skillIds]);

  const availableSkillSuggestions = useMemo(() => {
    const keyword = skillKeyword.trim().toLowerCase();

    if (!keyword) return [];

    return skills
      .filter(
        (skill) =>
          !values.skillIds.includes(skill.skillId) &&
          skill.skillName.toLowerCase().includes(keyword),
      )
      .slice(0, 5);
  }, [skillKeyword, skills, values.skillIds]);

  function focusFirstError(fieldErrors: CreateJobPostingFieldErrors) {
    const order: (keyof CreateJobPostingFieldErrors)[] = [
      "jobTitle",
      "categoryId",
      "city",
      "applicationDeadline",
      "salaryMin",
      "salaryMax",
      "numberOfPositions",
      "skillIds",
      "jobDescription",
      "requirements",
      "benefits",
      "experienceLevel",
    ];

    requestAnimationFrame(() => {
      for (const key of order) {
        if (!fieldErrors[key]) continue;

        const container = document.querySelector<HTMLElement>(
          `[data-field="${key}"]`,
        );

        if (!container) continue;

        container.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          const focusTarget = container.matches("input, textarea, button")
            ? container
            : container.querySelector<HTMLElement>("input, textarea, button");

          if (!focusTarget) return;

          focusTarget.focus();

          if (
            focusTarget instanceof HTMLInputElement ||
            focusTarget instanceof HTMLTextAreaElement
          ) {
            const length = focusTarget.value.length;
            focusTarget.setSelectionRange(length, length);
          }
        }, 250);

        break;
      }
    });
  }

  function setFieldValue<K extends keyof CreateJobPostingFormValues>(
    field: K,
    value: CreateJobPostingFormValues[K],
  ) {
    setValues((prev) => {
      if (field === "salaryMode" && value === "NEGOTIABLE") {
        return {
          ...prev,
          salaryMode: value,
          salaryMin: "",
          salaryMax: "",
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      ...(field === "salaryMode"
        ? {
            salaryMin: undefined,
            salaryMax: undefined,
          }
        : {}),
    }));
  }

  function addSkillById(skillId: number) {
    if (values.skillIds.includes(skillId)) return;

    setValues((prev) => ({
      ...prev,
      skillIds: [...prev.skillIds, skillId],
    }));

    setSkillKeyword("");
    setErrors((prev) => ({
      ...prev,
      skillIds: undefined,
    }));
  }

  function handleAddSkill() {
    const keyword = skillKeyword.trim().toLowerCase();

    if (!keyword) return;

    const matchedSkill = skills.find(
      (skill) =>
        !values.skillIds.includes(skill.skillId) &&
        skill.skillName.toLowerCase() === keyword,
    );

    if (matchedSkill) {
      addSkillById(matchedSkill.skillId);
      return;
    }

    const firstSuggested = availableSkillSuggestions[0];

    if (firstSuggested) {
      addSkillById(firstSuggested.skillId);
    }
  }

  function removeSkill(skillId: number) {
    setValues((prev) => ({
      ...prev,
      skillIds: prev.skillIds.filter((id) => id !== skillId),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = createJobPostingSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      const mappedErrors = {
        jobTitle: fieldErrors.jobTitle?.[0],
        categoryId: fieldErrors.categoryId?.[0],
        city: fieldErrors.city?.[0],
        applicationDeadline: fieldErrors.applicationDeadline?.[0],
        salaryMin: fieldErrors.salaryMin?.[0],
        salaryMax: fieldErrors.salaryMax?.[0],
        numberOfPositions: fieldErrors.numberOfPositions?.[0],
        jobDescription: fieldErrors.jobDescription?.[0],
        requirements: fieldErrors.requirements?.[0],
        benefits: fieldErrors.benefits?.[0],
        experienceLevel: fieldErrors.experienceLevel?.[0],
        skillIds: fieldErrors.skillIds?.[0],
      };

      setErrors(mappedErrors);
      focusFirstError(mappedErrors);
      return;
    }

    const payload: PutBody = {
      ...parsed.data,
      salaryMin: parsed.data.isSalaryNegotiable ? null : parsed.data.salaryMin,
      salaryMax: parsed.data.isSalaryNegotiable ? null : parsed.data.salaryMax,
      salaryType: parsed.data.isSalaryNegotiable ? "NEGOTIABLE" : "RANGE",
    };

    console.log(payload);

    try {
      await updateMutation.mutateAsync(payload);
      onClose();
    } catch {}
  }

  return {
    values,
    errors,
    skillKeyword,
    setSkillKeyword,
    selectedSkills,
    availableSkillSuggestions,
    categoryOptions: categories.map((item) => ({
      label: item.categoryName,
      value: String(item.categoryId),
    })),
    experienceOptions: EXPERIENCE_LEVEL_OPTIONS.map((item) => ({
      label: item.label,
      value: item.value,
    })),
    isLoadingOptions: categoriesQuery.isLoading || skillsQuery.isLoading,
    isSubmitting: updateMutation.isPending,
    setFieldValue,
    addSkillById,
    handleAddSkill,
    removeSkill,
    handleSubmit,
  };
}
