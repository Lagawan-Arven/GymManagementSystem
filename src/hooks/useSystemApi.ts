import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { type LoginResponse } from "../types";

export const systemKeys = {
  all: ["system"] as const,
  gym: () => [...systemKeys.all, "gym-details"] as const,
};

// ==========================================
// 1. REGISTER NEW GYM (Public Route)
// ==========================================
export const useRegisterGym = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      // Assuming your FastAPI expects: { name: str, owner: { firstname, lastname, ... } }
      const { data } = await api.post<LoginResponse>("/register", payload);
      return data;
    },
    onSuccess: (data) => {
      // Instantly log them in after a successful registration!
      setAuth(data.user, data.access_token, data.subscription);
      toast.success("Welcome to ArvFit! Your 7-day free trial has started.");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail ||
          "Failed to register gym. Please try again.",
      );
    },
  });
};

// ==========================================
// 2. GET GYM DETAILS (Protected Route)
// ==========================================
export const useGetGymDetails = () => {
  return useQuery({
    queryKey: systemKeys.gym(),
    queryFn: async () => {
      const { data } = await api.get("/gyms/me");
      return data;
    },
    // This is crucial data for your plan limits, so we keep it fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ==========================================
// 3. UPDATE GYM SETTINGS (Protected Route)
// ==========================================
export const useUpdateGym = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string }) => {
      const { data } = await api.put("/gyms/me", payload);
      return data;
    },
    onSuccess: () => {
      // Force the UI to re-fetch the new gym name
      queryClient.invalidateQueries({ queryKey: systemKeys.gym() });
      toast.success("Gym settings updated successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail || "Failed to update gym settings.",
      );
    },
  });
};
