import axios from "axios";

const TOKEN_KEY = "issue_tracker_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getAuthToken = (): string | null => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = (): void => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];

      if (typeof firstError?.message === "string") {
        return firstError.message;
      }
    }

    if (error.response?.status === 401) {
      return "Authentication is required for this action.";
    }

    return error.message || "The request failed.";
  }

  return "Something went wrong.";
};
