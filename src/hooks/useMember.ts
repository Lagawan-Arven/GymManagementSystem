import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query/queryKeys";

import {
  fetchMembers,
  addMember,
  updateMember,
  renewMember,
  deleteMember,
} from "../api/Service";

import type { MemberPayload, MemberUpdatePayload } from "../schemas";

export function useFetchMembers(tenantId: string, filter: string) {
  return useQuery({
    queryKey: queryKeys.memberList(tenantId, filter),
    queryFn: () => fetchMembers(filter),
    // Optional: Only run the query if we actually have a tenantId
    enabled: !!tenantId,
  });
}

export function useAddMember(tenantId: string, payload: MemberPayload) {
  return useQuery({
    queryKey: queryKeys.members(tenantId),
    queryFn: () => addMember(payload),
  });
}

export function useUpdateMember(
  tenantId: string,
  member_id: string,
  payload: MemberUpdatePayload,
) {
  return useQuery({
    queryKey: queryKeys.members(tenantId),
    queryFn: () => updateMember(member_id, payload),
  });
}

export function useReneweMember(tenantId: string, member_id: string) {
  return useQuery({
    queryKey: queryKeys.members(tenantId),
    queryFn: () => renewMember(member_id),
  });
}

export function useDeleteMember(tenantId: string, member_id: string) {
  return useQuery({
    queryKey: queryKeys.members(tenantId),
    queryFn: () => deleteMember(member_id),
  });
}
