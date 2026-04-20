"use client";

import { z } from "zod";
import { DEFAULT_POSITION_LEVEL } from "../constants/job-posting-form.constants";

export const createJobPostingSchema = z
  .object({
    jobTitle: z
      .string()
      .trim()
      .min(5, "Tiêu đề công việc phải có ít nhất 5 ký tự."),
    categoryId: z.string().trim().min(1, "Vui lòng chọn loại công việc."),
    city: z.string().trim().min(1, "Vui lòng nhập địa điểm."),
    applicationDeadline: z.string().trim().min(1, "Vui lòng chọn hạn chót."),
    salaryMode: z.enum(["RANGE", "NEGOTIABLE"]),
    salaryMin: z.string().trim(),
    salaryMax: z.string().trim(),
    numberOfPositions: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số lượng tuyển."),
    jobDescription: z
      .string()
      .trim()
      .min(20, "Mô tả công việc phải có ít nhất 20 ký tự."),
    requirements: z
      .string()
      .trim()
      .min(10, "Yêu cầu ứng viên phải có ít nhất 10 ký tự."),
    benefits: z.string().trim().min(1, "Vui lòng nhập quyền lợi."),
    experienceLevel: z.string().trim().min(1, "Vui lòng chọn trình độ."),
    skillIds: z.array(z.number()).min(1, "Vui lòng thêm ít nhất 1 kỹ năng."),
  })
  .superRefine((values, ctx) => {
    const positionCount = Number(values.numberOfPositions);

    if (!Number.isInteger(positionCount) || positionCount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberOfPositions"],
        message: "Số lượng tuyển phải là số nguyên lớn hơn 0.",
      });
    }

    if (values.salaryMode === "RANGE") {
      const salaryMin = Number(values.salaryMin);
      const salaryMax = Number(values.salaryMax);

      if (!values.salaryMin.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMin"],
          message: "Vui lòng nhập mức lương tối thiểu.",
        });
      }

      if (!values.salaryMax.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMax"],
          message: "Vui lòng nhập mức lương tối đa.",
        });
      }

      if (Number.isNaN(salaryMin) || salaryMin < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMin"],
          message: "Lương tối thiểu phải là số hợp lệ.",
        });
      }

      if (Number.isNaN(salaryMax) || salaryMax < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMax"],
          message: "Lương tối đa phải là số hợp lệ.",
        });
      }

      if (
        !Number.isNaN(salaryMin) &&
        !Number.isNaN(salaryMax) &&
        salaryMax < salaryMin
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salaryMax"],
          message: "Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu.",
        });
      }
    }
  })
  .transform((values) => {
    const isNegotiable = values.salaryMode === "NEGOTIABLE";

    return {
      jobTitle: values.jobTitle.trim(),
      categoryId: Number(values.categoryId),
      city: values.city.trim(),
      applicationDeadline: new Date(values.applicationDeadline).toISOString(),
      salaryMin: isNegotiable ? null : Number(values.salaryMin),
      salaryMax: isNegotiable ? null : Number(values.salaryMax),
      salaryType: values.salaryMode,
      isSalaryNegotiable: isNegotiable,
      numberOfPositions: Number(values.numberOfPositions),
      jobDescription: values.jobDescription.trim(),
      requirements: values.requirements.trim(),
      benefits: values.benefits.trim(),
      experienceLevel: values.experienceLevel,
      positionLevel: DEFAULT_POSITION_LEVEL,
      skillIds: values.skillIds,
      isUrgent: false,
    };
  });

export type CreateJobPostingFormValues = z.input<typeof createJobPostingSchema>;
export type CreateJobPostingPayload = z.output<typeof createJobPostingSchema>;
export type CreateJobPostingFieldErrors = Partial<
  Record<keyof CreateJobPostingFormValues, string>
>;
