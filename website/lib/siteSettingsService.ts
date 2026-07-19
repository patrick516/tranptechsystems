// lib/siteSettingsService.ts
import apiClient from "./api";

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  address: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
    facebook: string;
  };
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data } = await apiClient.get<{
    success: boolean;
    settings: SiteSettings;
  }>("/settings");
  return data.settings;
};
