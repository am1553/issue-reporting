import { api, clearAuthToken, setAuthToken } from "./client";
import type { UserSummary } from "../types/user";

const USER_KEY = "issue_tracker_user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: UserSummary;
}

export const getStoredUser = (): UserSummary | null => {
  const rawUser = window.localStorage.getItem(USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as UserSummary;
  } catch {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const login = async (input: LoginInput): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", input);

  setAuthToken(response.data.token);

  if (response.data.user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
  }

  return response.data;
};

export const logout = (): void => {
  clearAuthToken();
  window.localStorage.removeItem(USER_KEY);
};
