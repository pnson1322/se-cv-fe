export type CompanyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RESTRICTED"
  | string;

export type OfficeImage = {
  image_id: number;
  company_id: number;
  image_url: string;
};

export type CompanyProfile = {
  company_id?: number;
  user_id?: number;
  company_name?: string;
  industry?: string;
  slogan?: string | null;
  company_size?: string | null;
  website?: string | null;
  description?: string | null;
  address?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  logo_url?: string | null;
  cover_image_url?: string | null;
  is_verified?: boolean;
  rating?: number;
  total_jobs_posted?: number;
  total_followers?: number;
  status?: CompanyStatus;
  created_at?: string;
  updated_at?: string;
  office_images?: OfficeImage[];
};

export type GetMyCompanyResponse = {
  success: boolean;
  message: string;
  data: CompanyProfile | null;
};
