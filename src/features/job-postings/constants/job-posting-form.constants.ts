"use client";

export const EXPERIENCE_LEVEL_OPTIONS = [
  { label: "Intern", value: "INTERN" },
  { label: "Fresher", value: "FRESHER" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Middle", value: "MIDDLE" },
  { label: "Senior", value: "SENIOR" },
  { label: "Lead", value: "LEAD" },
] as const;

export const SALARY_MODE_OPTIONS = [
  { label: "Khoảng lương", value: "RANGE" },
  { label: "Thỏa thuận", value: "NEGOTIABLE" },
] as const;

export const DEFAULT_POSITION_LEVEL = "STAFF";
