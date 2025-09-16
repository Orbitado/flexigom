import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "../services/review-service";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: ReviewService.getReviews,
  });
}

export function useReview(documentId: string) {
  return useQuery({
    queryKey: ["review", documentId],
    queryFn: () => ReviewService.getReview(documentId),
    enabled: !!documentId,
  });
}