import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";

export const useGetAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await api.get("/admins");
      return data.admins || data;
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/admins", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Staff account created successfully!");
    },
    onError: () => {
      toast.error("Failed to create admin account.");
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adminId: string) => {
      await api.delete(`/admins/${adminId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin account removed.");
    },
    onError: () => {
      toast.error("Failed to remove admin account.");
    },
  });
};
