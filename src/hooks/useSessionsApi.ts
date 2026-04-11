import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";

export const useRecordSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { member_id: string }) => {
      // Assuming your backend expects a POST to /sessions/ with the member_id
      const response = await api.post("/sessions/", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Member successfully checked in!");
      // Invalidate logs so the owner dashboard instantly sees this activity
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to record session.");
    },
  });
};
