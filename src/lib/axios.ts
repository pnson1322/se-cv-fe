import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAuthStorage,
} from "@/features/auth/lib/auth-storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is missing in .env");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,

  async (err) => {
    const error = err as AxiosError & {
      config?: AxiosRequestConfig & {
        _retry?: boolean;
        headers?: Record<string, string>;
      };
    };

    const status = error.response?.status;
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url ?? "";
    const isLoginRequest = requestUrl.includes("/auth/login");
    const isRefreshRequest = requestUrl.includes("/auth/refresh");

    if (isLoginRequest || isRefreshRequest) {
      return Promise.reject(error);
    }

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (!originalRequest.headers) {
            originalRequest.headers = new AxiosHeaders();
          }

          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }

          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = refreshRes.data?.data?.access_token;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh API");
        }

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearAuthStorage();
        window.location.href = "/";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
