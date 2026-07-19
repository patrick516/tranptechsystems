// src/services/settingsService.ts
import apiClient from "./api";
import type { Admin } from "./authService";

export interface SiteSettings {
  _id?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
  };
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}

export const updateProfile = async (payload: {
  name: string;
  email: string;
}): Promise<Admin> => {
  const { data } = await apiClient.put<{ success: boolean; admin: Admin }>(
    "/auth/me",
    payload,
  );
  return data.admin;
};

export const updatePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  await apiClient.put("/auth/password", payload);
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data } = await apiClient.get<{
    success: boolean;
    settings: SiteSettings;
  }>("/settings");
  return data.settings;
};

export const updateSiteSettings = async (
  payload: Partial<SiteSettings>,
): Promise<SiteSettings> => {
  const { data } = await apiClient.put<{
    success: boolean;
    settings: SiteSettings;
  }>("/settings", payload);
  return data.settings;
};
