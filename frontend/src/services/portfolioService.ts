// src/services/portfolioService.ts
import apiClient from "./api";

export interface Portfolio {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category?: string;
  techStack: string[];
  coverImage?: string;
  images: string[];
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PortfolioInput = Omit<Portfolio, "_id" | "createdAt" | "updatedAt">;

export const getPortfoliosAdmin = async (): Promise<Portfolio[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    portfolios: Portfolio[];
  }>("/portfolio/admin");
  return data.portfolios;
};

export const createPortfolio = async (
  payload: PortfolioInput,
): Promise<Portfolio> => {
  const { data } = await apiClient.post<{
    success: boolean;
    portfolio: Portfolio;
  }>("/portfolio", payload);
  return data.portfolio;
};

export const updatePortfolio = async (
  id: string,
  updates: Partial<PortfolioInput>,
): Promise<Portfolio> => {
  const { data } = await apiClient.put<{
    success: boolean;
    portfolio: Portfolio;
  }>(`/portfolio/${id}`, updates);
  return data.portfolio;
};

export const deletePortfolio = async (id: string): Promise<void> => {
  await apiClient.delete(`/portfolio/${id}`);
};
