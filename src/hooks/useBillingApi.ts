import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { CheckoutLinkResponse } from "../types";
import { isAxiosError } from "axios";

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (planId: string) => {
      const { data } = await api.post<CheckoutLinkResponse>(
        "/payments/saas-checkout",
        { plan_id: planId },
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Redirecting to secure checkout...");
      // Push the user out of the React app and into PayMongo
      window.location.href = data.checkout_url;
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to initialize secure checkout.",
      );
    },
  });
};
