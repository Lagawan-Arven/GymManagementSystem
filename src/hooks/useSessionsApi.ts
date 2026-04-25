import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { SessionPayload } from "../types";
import { isAxiosError } from "axios";

export const useRecordSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SessionPayload) => {
      const response = await api.post("/sessions", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Member successfully checked in!");
      // Invalidate logs so the owner dashboard instantly sees this activity
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to record session.",
      );
    },
  });
};
