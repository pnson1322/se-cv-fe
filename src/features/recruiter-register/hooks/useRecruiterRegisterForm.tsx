"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { recruiterRegisterSchema } from "../schema/recruiterRegister.schema";
import { createRecruiterCompany } from "../api/recruiterRegister.api";
import type {
  CreateCompanyErrorResponse,
  RecruiterRegisterFormValues,
} from "../types/recruiterRegister.types";

export function useRecruiterRegisterForm() {
  const router = useRouter();

  const form = useForm<RecruiterRegisterFormValues>({
    resolver: zodResolver(
      recruiterRegisterSchema,
    ) as unknown as Resolver<RecruiterRegisterFormValues>,
    defaultValues: {
      company_name: "",
      industry: "",
      slogan: "",
      company_size: "",
      website: "",
      description: "",
      address: "",
      contact_email: "",
      contact_phone: "",
      logo: undefined,
      coverImage: undefined,
      officeImages: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: createRecruiterCompany,

    onSuccess: (response) => {
      toast.success(response.message || "Đăng ký công ty thành công");
      router.push("/recruiter/dashboard");
    },

    onError: (error: AxiosError<CreateCompanyErrorResponse>) => {
      const message =
        error.response?.data?.message ||
        "Đăng ký công ty thất bại, vui lòng thử lại";

      toast.error(message);
      console.error("Create company failed:", error);
    },
  });

  const onSubmit = (values: RecruiterRegisterFormValues) => {
    mutation.mutate(values);
  };

  return {
    ...form,
    onSubmit,
    isSubmitting: mutation.isPending,
  };
}
