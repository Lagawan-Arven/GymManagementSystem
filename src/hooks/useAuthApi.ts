import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { LoginResponse, GoogleAuthResponse } from "../types";
import { useAuth } from "../context/AuthProvider";

export const useLogin = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (credentials: Record<string, any>) => {
      const { data } = await api.post<LoginResponse>(
        "/auth/login",
        credentials,
      );
      return data;
    },
    onSuccess: (data) => {
      // Automatically update global auth state on success!
      setAuth(data.user, data.access_token);
      toast.success(`Welcome back, ${data.user.name}!`);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail || "Login failed. Please try again.",
      );
    },
  });
};

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: async (payload: {
      token: string;
      role: string;
      gym_id?: string;
    }) => {
      const { data } = await api.post<GoogleAuthResponse>(
        "/auth/google",
        payload,
      );
      return data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.detail || "Google authentication failed.",
      );
    },
    // We don't call setAuth here in onSuccess because it might be a 202 "requires_completion" response.
    // The component using this hook will handle that logic.
  });
};
