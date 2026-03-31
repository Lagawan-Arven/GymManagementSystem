import { apiClient } from "./client";

import type {
  AdminPayload,
  AdminUpdatePayload,
  MemberPayload,
  MemberUpdatePayload,
  SessionPayload,
  PaymentPayload,
} from "../../schemas";

{
  /*============= HEALTH CHECK ================ */
}
export const getRoot = async () => {
  const res = await apiClient.get("/");
  return res.data;
};

{
  /*============= OWNER ================ */
}

export const fetchOwners = async () => {
  const response = await apiClient.get("/owners");
  return response.data;
};

{
  /*============= ADMIN ================ */
}

export const fetchAdmins = async () => {
  const response = await apiClient.get("/admins");
  return response.data;
};

export const addAdmin = async (payload: AdminPayload) => {
  const response = await apiClient.post("/admins", payload);
  return response.data;
};

export const updateAdmin = async (
  admin_id: string,
  payload: AdminUpdatePayload,
) => {
  const response = await apiClient.patch(`/admins/${admin_id}`, payload);
  return response.data;
};

export const deleteAdmin = async (admin_id: string) => {
  const response = await apiClient.delete(`/admins/${admin_id}`);
  return response.data;
};

{
  /*============= MEMBER ================ */
}

export const fetchMembers = async (filter?: string | null) => {
  const response = await apiClient.get(`/members?filter=${filter}`);
  return response.data;
};

export const addMember = async (payload: MemberPayload) => {
  const response = await apiClient.post("/members", payload);
  return response.data;
};

export const updateMember = async (
  member_id: string,
  payload: MemberUpdatePayload,
) => {
  const response = await apiClient.patch(`/members/${member_id}`, payload);
  return response.data;
};

export const renewMembership = async (member_id: string) => {
  const response = await apiClient.put(`/members/${member_id}`);
  return response.data;
};

export const deleteMember = async (member_id: string) => {
  const response = await apiClient.delete(`/members/${member_id}`);
  return response.data;
};

{
  /*============= SESSION ================ */
}

export const fetchSessions = async (filter: string | null) => {
  const response = await apiClient.get(`/sessions?filter=${filter}`);
  return response.data;
};

export const addSession = async (payload: SessionPayload) => {
  const response = await apiClient.post("/sessions", payload);
  return response.data;
};

{
  /*============= PAYMENT ================ */
}
export const fetchPayments = async () => {
  const response = await apiClient.get("/payments");
  return response.data;
};

export const addPayment = async (payload: PaymentPayload) => {
  const response = await apiClient.post("/payments", payload);
  return response.data;
};

{
  /*============= LOG ================ */
}

export const fetchLogs = async (filter: string | null) => {
  const response = await apiClient.get(`/logs?filter=${filter}`);
  return response.data;
};
