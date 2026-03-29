"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../schema/login.schema";
import { useLogin } from "./useLogin";

export function useLoginForm() {
  const { login, isLoading } = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: LoginSchemaType) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return {
    ...form,
    onSubmit,
    isLoading,
  };
}
