import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // We default to 'owner' for the B2B landing page, but admins/members can change this on a dedicated route later
  role: z.enum(["owner", "admin", "member"]).default("owner"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  gymName: z.string().min(2, "Gym name must be at least 2 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const memberSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z
    .email({ error: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  contact_number: z.string().optional(),

  age: z
    .number()
    .min(10, "Must be at least 10 years old")
    .optional()
    .or(z.nan().transform(() => undefined)),
  sex: z.enum(["Male", "Female", "Other"]).optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export const paymentSchema = z
  .object({
    type: z.enum(["new_membership", "single_session", "membership_renewal"]),
    method: z.enum(["Cash", "GCash", "Bank Transfer"]),
    amount: z
      .number({ error: "Amount must be a number" })
      .min(1, "Amount is required"),
    member_id: z.string().optional(),
    payor_name: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      // If it's a renewal, member_id MUST be present
      if (
        (data.type === "membership_renewal" ||
          data.type === "new_membership") &&
        !data.member_id
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a member for this payment type",
      path: ["member_id"], // Attach the error to the member_id field
    },
  )
  .refine(
    (data) => {
      // If it's a single session, payor_name MUST be present
      if (
        data.type === "single_session" &&
        (!data.payor_name || data.payor_name.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Visitor name is required for a single session",
      path: ["payor_name"],
    },
  );

export type PaymentFormValues = z.infer<typeof paymentSchema>;

export const supportSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.enum([
    "Billing",
    "Technical Issue",
    "Feature Request",
    "General Inquiry",
  ]),
  message: z
    .string()
    .min(20, "Please provide more details (at least 20 characters)"),
});

export type SupportFormValues = z.infer<typeof supportSchema>;
