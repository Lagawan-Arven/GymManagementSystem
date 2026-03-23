import { apiClient } from "./client";

import type { LoginPayload, RegisterPayload } from "../../schemas";

export const LoginUser = async (payload: LoginPayload) => {
  const response = await apiClient.post("/auth/login", payload);

  return response.data;
};

export const RegisterUser = async (payload: RegisterPayload) => {
  console.log("[AuthService] User signing up...");

  const response = await apiClient.post("/auth/register", payload);

  return response.data;
};
