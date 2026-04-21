// ==========================================
// ENUMS & LITERALS
// ==========================================
export type UserRole = "owner" | "admin";
export type SessionType = "member" | "single";
export type PaymentType =
  | "new_membership"
  | "single_session"
  | "membership_renewal";
export type PaymentStatus = "pending" | "paid";
export type Interval = "monthly" | "yearly";

// ==========================================
// CORE ENTITIES (Matching DB Models)
// ==========================================
export interface BaseUser {
  gym_id: string;
  id: string;
  role: UserRole;
  name: string;
  username: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Owner extends BaseUser {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Admin extends BaseUser {}

export interface Member extends Omit<BaseUser, "username" | "role"> {
  age: number | null;
  sex: string | null;
  contact_number: string | null;
  updated_by: string | null;
  renewed_by: string | null;
  renewed_at: string;
  expires_at: string;
  isActive: boolean;
  days_remaining: number;
}

export interface Gym {
  id: string;
  name: string;
  owner: Owner;
  subscription: Subscription;
}

export interface Subscription {
  expires_at: string;
  isActive: boolean;
  days_remaining: number;
  plan?: SaasPlan;
}

export interface Plan {
  name: string;
}

export interface SaasPlan {
  id: number;
  name: string;
  description: string | null;
  amount: number;
  interval: Interval;
  features: Record<string, unknown>; // Handles the JSON column
}

// ==========================================
// OPERATIONS (Sessions, Payments, Logs)
// ==========================================
export interface BaseSession {
  type: SessionType;
  member_id?: string;
  visitor_name?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SessionPayload extends BaseSession {}

export interface Session extends BaseSession {
  id: number;
  gym_id: string;
  admin_id?: string;
  created_at: string;
}

export interface Payment {
  id: number;
  type: PaymentType;
  gym_id: string;
  amount: number; // in centavos usually, or whole pesos depending on your frontend logic
  method: string;
  isDiscounted: boolean;
  discount_percentage?: string;
  discount_amount?: number;
  notes?: string;
  transaction_ref?: string;
  status: PaymentStatus;
  payor_name?: string;
  created_at: string;
  member: Member;
}

export interface AuditLog {
  id: number;
  gym_id: string;
  details: string;
  category: string;
  created_at: string;
  admin?: Admin;
  member?: Member;
  session?: Session;
  payment?: Payment;
}

// ==========================================
// API RESPONSES
// ==========================================
export interface BaseResponse {
  message?: string;
  success: boolean;
}

export interface RegisterResponse extends BaseResponse {
  gym: Gym;
}

export interface LoginResponse extends BaseResponse {
  access_token: string;
  user: Owner | Admin;
  subscription: Subscription;
}

export interface GoogleAuthResponse extends BaseResponse {
  requires_completion: boolean;
  access_token?: string;
  user?: Owner | Admin | Member;
  google_email?: string;
  google_name?: string;
}

export interface CheckoutLinkResponse {
  payment_id: number;
  paymongo_reference: string;
  checkout_url: string;
}

export interface GetMembersResponse extends BaseResponse {
  members: Member[];
}

export interface GetLogsResponse extends BaseResponse {
  logs: AuditLog[];
}

export interface GetPaymentsResponse extends BaseResponse {
  payments: Payment[];
}

export interface GetSessionsResponse extends BaseResponse {
  sessions: Session[];
}

export interface GymResponse extends BaseResponse {
  gym: Gym;
}

export interface GetSaasPlansResponse extends BaseResponse {
  plans: SaasPlan[];
}
