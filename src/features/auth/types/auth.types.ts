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
  id: string | number;
  email: string;
  fullName?: string;
  role: Role;
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
