// lib/portfolioService.ts
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
}

export const getPortfolios = async (
  featuredOnly = false,
): Promise<Portfolio[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    portfolios: Portfolio[];
  }>("/portfolio", { params: featuredOnly ? { featured: "true" } : {} });
  return data.portfolios;
};

export const getPortfolioBySlug = async (slug: string): Promise<Portfolio> => {
  const { data } = await apiClient.get<{
    success: boolean;
    portfolio: Portfolio;
  }>(`/portfolio/${slug}`);
  return data.portfolio;
};
