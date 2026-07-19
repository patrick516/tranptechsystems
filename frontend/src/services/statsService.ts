// src/services/statsService.ts
import apiClient from "./api";
import type { Lead } from "./leadService";

export interface LeadsByStatus {
  status: string;
  count: number;
}

export interface LeadsByMonth {
  month: string;
  count: number;
}

export interface DashboardStats {
  totalLeads: number;
  leadsByStatus: LeadsByStatus[];
  leadsByMonth: LeadsByMonth[];
  totalPortfolios: number;
  publishedPortfolios: number;
  featuredPortfolios: number;
  recentLeads: Lead[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await apiClient.get<{
    success: boolean;
    stats: DashboardStats;
  }>("/stats/dashboard");
  return data.stats;
};
