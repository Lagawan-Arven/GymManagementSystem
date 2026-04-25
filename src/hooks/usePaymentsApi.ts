import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { GetPaymentsResponse, Payment } from "../types";
import { isAxiosError } from "axios";

export const paymentKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
};

// --- FETCHING DATA ---
export const useGetPayments = () => {
  return useQuery({
    queryKey: paymentKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get<GetPaymentsResponse>("/payments/internal");
      return data.payments;
    },
  });
};

// --- MUTATING DATA ---
export const useRecordPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPayment: Record<string, any>) => {
      // Centavos conversion happens here so the UI can deal in whole Pesos
      const payload = {
        ...newPayment,
        amount: newPayment.amount * 100, // Convert ₱ to centavos for the backend
      };
      const { data } = await api.post<{ payment: Payment; success: boolean }>(
        "/payments/internal",
        payload,
      );
      return data.payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      // Also invalidate members so their "Expires At" date instantly updates on the Members page!
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Payment recorded successfully!");
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to record payment.",
      );
    },
  });
};
