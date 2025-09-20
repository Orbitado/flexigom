import api from "@/lib/api";
import type { StrapiResponse } from "@/types";
import type { Review } from "../types";

export class ReviewService {
  static async getReviews(): Promise<Review[]> {
    const response = await api.get<StrapiResponse<Review[]>>("/reviews");
    return response.data.data;
  }

  static async getReview(documentId: string): Promise<Review> {
    const response = await api.get<StrapiResponse<Review>>(
      `/reviews/${documentId}`,
    );
    return response.data.data;
  }

  static async createReview(reviewData: Partial<Review>): Promise<Review> {
    const response = await api.post<StrapiResponse<Review>>("/reviews", {
      data: reviewData,
    });
    return response.data.data;
  }

  static async updateReview(
    documentId: string,
    reviewData: Partial<Review>,
  ): Promise<Review> {
    const response = await api.put<StrapiResponse<Review>>(
      `/reviews/${documentId}`,
      {
        data: reviewData,
      },
    );
    return response.data.data;
  }

  static async deleteReview(documentId: string): Promise<void> {
    await api.delete(`/reviews/${documentId}`);
  }
}
