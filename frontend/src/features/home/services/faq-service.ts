import api from "@/lib/api";
import type { StrapiResponse } from "@/types";
import type { FAQ } from "../types";

export class FAQService {
  static async getFAQs(): Promise<FAQ[]> {
    const response = await api.get<StrapiResponse<FAQ[]>>("/faqs");
    return response.data.data;
  }

  static async getFAQ(documentId: string): Promise<FAQ> {
    const response = await api.get<StrapiResponse<FAQ>>(`/faqs/${documentId}`);
    return response.data.data;
  }

  static async createFAQ(faqData: Partial<FAQ>): Promise<FAQ> {
    const response = await api.post<StrapiResponse<FAQ>>("/faqs", {
      data: faqData,
    });
    return response.data.data;
  }

  static async updateFAQ(
    documentId: string,
    faqData: Partial<FAQ>,
  ): Promise<FAQ> {
    const response = await api.put<StrapiResponse<FAQ>>(`/faqs/${documentId}`, {
      data: faqData,
    });
    return response.data.data;
  }

  static async deleteFAQ(documentId: string): Promise<void> {
    await api.delete(`/faqs/${documentId}`);
  }
}
