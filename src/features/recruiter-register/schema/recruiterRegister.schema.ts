import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Ảnh tối đa 5MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Ảnh phải là JPG, PNG hoặc WEBP",
  });

export const recruiterRegisterSchema = z.object({
  company_name: z.string().trim().min(1, "Vui lòng nhập tên công ty"),

  industry: z.string().trim().min(1, "Vui lòng nhập ngành nghề"),

  slogan: z.string().trim(),

  company_size: z.string().trim().min(1, "Vui lòng chọn quy mô công ty"),

  website: z
    .string()
    .trim()
    .refine((value) => !value || /^https?:\/\/.+/.test(value), {
      message: "Website phải bắt đầu bằng http:// hoặc https://",
    }),

  description: z.string().trim(),

  address: z.string().trim().min(1, "Vui lòng nhập địa chỉ công ty"),

  contact_email: z
    .string()
    .trim()
    .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Email liên hệ không đúng định dạng",
    }),

  contact_phone: z
    .string()
    .trim()
    .refine((value) => !value || /^[0-9+\-\s()]{8,15}$/.test(value), {
      message: "Số điện thoại không hợp lệ",
    }),

  logo: z
    .union([fileSchema, z.undefined()])
    .refine((file) => file instanceof File, {
      message: "Vui lòng tải logo công ty",
    }),

  coverImage: z
    .union([fileSchema, z.undefined()])
    .refine((file) => file instanceof File, {
      message: "Vui lòng tải ảnh bìa công ty",
    }),

  officeImages: z.array(fileSchema).max(6, "Tối đa 6 ảnh văn phòng"),
});
