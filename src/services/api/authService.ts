import { apiClient } from "./client";

interface SigninPayload {
  emailUsername: string;
  password: string;
}

interface SingupPayload {
  name: string;
  age: number;
  sex: string;
  email: string;
  password: string;
}

export const signinUser = async (signinData: SigninPayload) => {
  const response = await apiClient.post("/auth/signin", signinData);

  return response.data;
};

export const signupUser = async (signupData: SingupPayload) => {
  console.log("[AuthService] User signing up...");

  const response = await apiClient.post("/auth/signup", signupData);

  return response.data;
};
