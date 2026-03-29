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
