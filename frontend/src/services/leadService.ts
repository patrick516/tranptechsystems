// src/services/leadService.ts
import apiClient from "./api";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  source: string;
  createdAt: string;
  updatedAt: string;
}

export const getLeads = async (status?: string): Promise<Lead[]> => {
  const { data } = await apiClient.get<{ success: boolean; leads: Lead[] }>(
    "/leads",
    {
      params: status ? { status } : {},
    },
  );
  return data.leads;
};

export const getLead = async (id: string): Promise<Lead> => {
  const { data } = await apiClient.get<{ success: boolean; lead: Lead }>(
    `/leads/${id}`,
  );
  return data.lead;
};

export const updateLead = async (
  id: string,
  updates: Partial<Lead>,
): Promise<Lead> => {
  const { data } = await apiClient.put<{ success: boolean; lead: Lead }>(
    `/leads/${id}`,
    updates,
  );
  return data.lead;
};

export const deleteLead = async (id: string): Promise<void> => {
  await apiClient.delete(`/leads/${id}`);
};
