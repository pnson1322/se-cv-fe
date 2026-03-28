import { api } from "@/lib/axios";
import type {
  CreateCompanyResponse,
  RecruiterRegisterFormValues,
} from "../types/recruiterRegister.types";

export async function createRecruiterCompany(
  payload: RecruiterRegisterFormValues,
) {
  const formData = new FormData();

  formData.append("company_name", payload.company_name);
  formData.append("industry", payload.industry);
  formData.append("slogan", payload.slogan);
  formData.append("company_size", payload.company_size);
  formData.append("website", payload.website);
  formData.append("description", payload.description);
  formData.append("address", payload.address);
  formData.append("contact_email", payload.contact_email);
  formData.append("contact_phone", payload.contact_phone);

  if (payload.logo) {
    formData.append("logo", payload.logo);
  }

  if (payload.coverImage) {
    formData.append("coverImage", payload.coverImage);
  }

  payload.officeImages.forEach((file) => {
    formData.append("officeImages", file);
  });

  const res = await api.post<CreateCompanyResponse>("/company", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
