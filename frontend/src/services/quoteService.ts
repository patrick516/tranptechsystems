// src/services/quoteService.ts
import apiClient from "./api";

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  _id: string;
  quoteNumber: string;
  lead?: { _id: string; name: string; email: string } | null;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  items: QuoteItem[];
  discount: number;
  currency: string;
  paymentTerms: string;
  notes: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  subtotal: number;
  total: number;
  createdAt: string;
}

export type QuoteInput = Omit<
  Quote,
  "_id" | "quoteNumber" | "lead" | "subtotal" | "total" | "createdAt"
> & { lead?: string };

export const getQuotes = async (): Promise<Quote[]> => {
  const { data } = await apiClient.get<{ success: boolean; quotes: Quote[] }>(
    "/quotes",
  );
  return data.quotes;
};

export const createQuote = async (payload: QuoteInput): Promise<Quote> => {
  const { data } = await apiClient.post<{ success: boolean; quote: Quote }>(
    "/quotes",
    payload,
  );
  return data.quote;
};

export const updateQuote = async (
  id: string,
  payload: Partial<QuoteInput>,
): Promise<Quote> => {
  const { data } = await apiClient.put<{ success: boolean; quote: Quote }>(
    `/quotes/${id}`,
    payload,
  );
  return data.quote;
};

export const deleteQuote = async (id: string): Promise<void> => {
  await apiClient.delete(`/quotes/${id}`);
};

export const openQuotePdf = async (id: string): Promise<void> => {
  const response = await apiClient.get(`/quotes/${id}/pdf`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => window.URL.revokeObjectURL(url), 30000);
};

export const sendQuoteEmail = async (id: string): Promise<Quote> => {
  const { data } = await apiClient.post<{ success: boolean; quote: Quote }>(
    `/quotes/${id}/send`,
  );
  return data.quote;
};
