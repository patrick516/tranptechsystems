// lib/leadService.ts
import apiClient from "./api";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message: string;
}

export const submitLead = async (payload: LeadPayload): Promise<void> => {
  await apiClient.post("/leads", payload);
};
