import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { GetSaasPlansResponse } from "../types";

export const useGetSaasPlan = () => {
  return useQuery({
    queryKey: ["saas_plans"],
    queryFn: async () => {
      const { data } = await api.get<GetSaasPlansResponse>("/saas_plans");
      return data.plans;
    },
  });
};
