export type RecruiterRegisterFormValues = {
  company_name: string;
  industry: string;
  slogan: string;
  company_size: string;
  website: string;
  description: string;
  address: string;
  contact_email: string;
  contact_phone: string;

  logo: File | undefined;
  coverImage: File | undefined;
  officeImages: File[];
};

export type CreateCompanyResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export type CreateCompanyErrorResponse = {
  success?: boolean;
  message?: string;
};
