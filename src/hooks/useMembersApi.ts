import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../api/axios";
import type { GetMembersResponse, Member } from "../types";

// Query Keys (Keeps our cache organized)
export const memberKeys = {
  all: ["members"] as const,
  lists: () => [...memberKeys.all, "list"] as const,
  details: () => [...memberKeys.all, "detail"] as const,
  detail: (id: string) => [...memberKeys.details(), id] as const,
};

// --- FETCHING DATA ---
export const useGetMembers = () => {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get<GetMembersResponse>("/members");
      return data.members;
    },
  });
};

// --- MUTATING DATA ---
export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMember: Record<string, any>) => {
      const { data } = await api.post<{ member: Member; success: boolean }>(
        "/members",
        newMember,
      );
      return data.member;
    },
    onSuccess: () => {
      // This tells Tanstack: "The members list is stale, go fetch it again!"
      // Your UI will update instantly without you having to manually manage state.
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success("Member successfully added!");
    },
    onError: () => {
      toast.error("Failed to add member.");
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, any>;
    }) => {
      const response = await api.patch<{ member: Member; success: boolean }>(
        `/members/${id}`,
        data,
      );
      return response.data.member;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success("Member updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update member.");
    },
  });
};

export const useRenewMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await api.post<{ member: Member; success: boolean }>(
        `/members/${id}`,
      );
      return response.data.member;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success("Member renewed successfully!");
    },
    onError: () => {
      toast.error("Failed to renew member.");
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/members/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success("Member removed from the system.");
    },
    onError: () => {
      toast.error("Failed to delete member.");
    },
  });
};
