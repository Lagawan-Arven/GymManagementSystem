import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../query/queryKeys";

import {
  fetchAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../api/Service";

import type { AdminPayload, AdminUpdatePayload } from "../schemas";

export function useFetchAdmins(tenantId: string) {
  return useQuery({
    queryKey: queryKeys.adminList(tenantId),
    queryFn: fetchAdmins,
  });
}

export function useAddAdmin(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminPayload) => addAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admins(tenantId) });
    },
  });
}

export function useUpdateAdmin(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      admin_id,
      payload,
    }: {
      admin_id: string;
      payload: AdminUpdatePayload;
    }) => updateAdmin(admin_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admins(tenantId) });
    },
  });
}

export function useDeleteAdmin(tenantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (admin_id: string) => deleteAdmin(admin_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admins(tenantId) });
    },
  });
}
