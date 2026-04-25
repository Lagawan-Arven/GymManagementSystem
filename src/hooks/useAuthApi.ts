import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { LoginResponse, GoogleAuthResponse } from "../types";
import { useAuth } from "../context/useAuth";
import { isAxiosError } from "axios";

export const useDemoLogin = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<LoginResponse>("/auth/login/demo");
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.access_token, data.subscription);
      toast.success(`Welcome, ${data.user.name}!`);
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed. Please try again.",
      );
    },
  });
};

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
      setAuth(data.user, data.access_token, data.subscription);
      toast.success(`Welcome back, ${data.user.name}!`);
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Login failed. Please try again.",
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
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Google authentication failed.",
      );
    },
    // We don't call setAuth here in onSuccess because it might be a 202 "requires_completion" response.
    // The component using this hook will handle that logic.
  });
};

export const useUpdateProfile = () => {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      username: string;
    }) => {
      // Assuming your FastAPI route is PUT /users/me
      const { data } = await api.patch("/users/me", payload);
      return data.user; // This should return the updated User object from your backend
    },
    onSuccess: (updatedUser) => {
      // 1. Grab the existing token so we don't accidentally log them out
      const currentToken = localStorage.getItem("token");
      const currentSub = localStorage.getItem("subscription");

      // 2. Overwrite the Auth Context with the new user details!
      if (currentToken && currentSub) {
        setAuth(updatedUser, currentToken, JSON.parse(currentSub));
      }

      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.detail) ||
          "Failed to update profile.",
      );
    },
  });
};
