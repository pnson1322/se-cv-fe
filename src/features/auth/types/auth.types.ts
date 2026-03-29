import type { Role } from "../constants/roles";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  user_id: string | number;
  email: string;
  role: Role;
  is_active: boolean;
  is_verified: boolean;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    user: AuthUser;
  };
};

export type RefreshTokenResponse = {
  success: boolean;
  data: {
    access_token: string;
  };
};

export type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: { accessToken: string; user: AuthUser }) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
};

export type RecruiterRegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RecruiterRegisterResponse = {
  success: boolean;
  message: string;
};

export type GoogleCallbackResponse = {
  url: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: string;
  message: string;
  data: {
    resetToken: string;
  };
};

export type ResetPasswordPayload = {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export type ChangePasswordPayload = {
  userId: number | string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};
