import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { RegisterResponse, GymResponse } from "../types";
import { useAuth } from "../context/useAuth";
import { isAxiosError } from "axios";

export const systemKeys = {
  all: ["system"] as const,
  gym: () => [...systemKeys.all, "gym-details"] as const,
};

// ==========================================
// 1. REGISTER NEW GYM (Public Route)
// ==========================================
export const useRegisterGym = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { data } = await api.post<RegisterResponse>(
        "/gyms/register",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Registration success");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to register gym. Please try again.",
      );
    },
  });
};

// ==========================================
// 2. GET GYM DETAILS (Protected Route)
// ==========================================
export const useGetGymDetails = () => {
  const { setAuth } = useAuth();
  return useQuery({
    queryKey: systemKeys.gym(),
    queryFn: async () => {
      const { data } = await api.get<GymResponse>("/gyms/me");
      if (data.gym.subscription) {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
          setAuth(JSON.parse(storedUser), storedToken, data.gym.subscription);
        }
      }
      return data.gym;
    },
    refetchInterval: (query) => {
      const gym = query.state.data;
      if (gym?.subscription.days_remaining)
        return gym.subscription.isActive && gym.subscription.days_remaining < 7
          ? 0
          : 0;
    },
  });
};

// ==========================================
// 3. UPDATE GYM SETTINGS (Protected Route)
// ==========================================
export const useUpdateGym = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { name: string }) => {
      const { data } = await api.patch("/gyms/me", payload);
      return data;
    },
    onSuccess: () => {
      // Force the UI to re-fetch the new gym name
      queryClient.invalidateQueries({ queryKey: systemKeys.gym() });
      toast.success("Gym settings updated successfully.");
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to update gym settings.",
      );
    },
  });
};
