{
  /* ================ AUTH =================*/
}
export type Role = "admin" | "owner";

export interface LoginPayload {
  owner_id: string | null;
  username: string;
  password: string;
  role: Role;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

{
  /* ================ OWNER =================*/
}

{
  /* ================ ADMIN =================*/
}

export interface AdminPayload {
  name: string;
  username: string;
  email?: string | null;
  password: string;
}

export interface AdminUpdatePayload {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
}

{
  /* ================ MEMBER =================*/
}
export type Sex = "male" | "female";

export interface MemberPayload {
  name: string;
  age?: number | null;
  sex?: Sex | null;
  email: string;
  contact_number?: string | null;
}

export interface MemberUpdatePayload {
  name?: string | null;
  age?: number | "" | null;
  sex?: Sex | null;
  email?: string | null;
  contact_number?: string | null;
}

{
  /* ================ SESSION =================*/
}
export type SessionType = "member" | "single";

export interface SessionPayload {
  type: SessionType;
  member_id?: string | null;
  member_email?: string | null;
  visitor_name?: string | null;
}

{
  /* ================ PAYMENT =================*/
}
export type PaymentType =
  | "new_membership"
  | "membership_renewal"
  | "single_session";
export type PaymentStatus = "paid" | "pending";

export interface BasePaymentPayload {
  amount?: number;
  method: string;
  isDicounted: boolean;
  discount_amount?: number;
  discount_percentage?: string;
  notes?: string | null;
  transaction_ref?: string | null;
  status?: PaymentStatus | null;
}

export interface PaymentPayload extends BasePaymentPayload {
  member_id?: string | null;
  type: PaymentType;
  payor_name?: string | null;
}

{
  /* ================ LOG =================*/
}
