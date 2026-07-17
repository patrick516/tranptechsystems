// src/services/authService.ts
import apiClient from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  admin: Admin;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  localStorage.setItem("adminToken", data.token);
  return data;
};

export const getMe = async (): Promise<Admin> => {
  const { data } = await apiClient.get<{ success: boolean; admin: Admin }>(
    "/auth/me",
  );
  return data.admin;
};

export const logout = (): void => {
  localStorage.removeItem("adminToken");
  window.location.href = "/login";
};
