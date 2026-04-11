// ==========================================
// ENUMS & LITERALS
// ==========================================
export type UserRole = "owner" | "admin" | "member";
export type SessionType = "member" | "single";
export type PaymentType =
  | "new_membership"
  | "single_session"
  | "membership_renewal";
export type PaymentStatus = "pending" | "paid";
export type BillingCycle = "monthly" | "yearly";

// ==========================================
// CORE ENTITIES (Matching DB Models)
// ==========================================
export interface BaseUser {
  id: string;
  role: UserRole;
  name: string;
  username: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Owner extends BaseUser {}

export interface Admin extends BaseUser {
  gym_id: string;
}

export interface Member extends BaseUser {
  gym_id: string;
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
  isSubscribe: boolean;
  owner?: Owner;
}

export interface SaasPlan {
  id: number;
  name: string;
  description: string | null;
  price_centavos: number;
  billing_cycle: BillingCycle;
  features: Record<string, any>; // Handles the JSON column
  isActive: boolean;
}

// ==========================================
// OPERATIONS (Sessions, Payments, Logs)
// ==========================================
export interface GymSession {
  id: number;
  type: SessionType;
  gym_id: string;
  admin_id?: string;
  member_id?: string;
  visitor_name?: string;
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
}

export interface AuditLog {
  id: number;
  gym_id: string;
  details: string;
  category: string;
  created_at: string;
  admin?: Admin;
  member?: Member;
  session?: GymSession;
  payment?: Payment;
}

// ==========================================
// API RESPONSES
// ==========================================
export interface BaseResponse {
  message?: string;
  success: boolean;
}

export interface LoginResponse extends BaseResponse {
  access_token: string;
  user: Owner | Admin | Member;
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
