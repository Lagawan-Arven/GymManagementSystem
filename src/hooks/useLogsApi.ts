import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { AuditLog } from "../types";

export const useGetLogs = () => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const { data } = await api.get<{ logs: AuditLog[]; success: boolean }>(
        "/logs/",
      );
      return data.logs;
    },
  });
};
