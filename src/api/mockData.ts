import { subDays, subMonths } from "date-fns";

const today = new Date();

export const dummyMembers = [
  {
    id: "m-1",
    name: "John Doe",
    email: "john@example.com",
    contact_number: "09171234567",
    isActive: true,
    expires_at: new Date(
      today.getTime() + 15 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    days_remaining: 15,
  },
  {
    id: "m-2",
    name: "Jane Smith",
    email: "jane@example.com",
    contact_number: "09189876543",
    isActive: false,
    expires_at: subDays(today, 5).toISOString(),
    days_remaining: -5,
  },
];

export const dummyPayments = [
  {
    id: 101,
    type: "membership_renewal",
    method: "Cash",
    amount: 99900, // 999 Pesos in centavos
    payor_name: "John Doe",
    created_at: today.toISOString(),
  },
  {
    id: 102,
    type: "single_session",
    method: "GCash",
    amount: 15000, // 150 Pesos in centavos
    payor_name: "Guest User",
    created_at: subDays(today, 1).toISOString(),
  },
  {
    id: 103,
    type: "new_membership",
    method: "Bank Transfer",
    amount: 149900,
    payor_name: "Alice Johnson",
    created_at: subDays(today, 2).toISOString(),
  },
];

export const dummyLogs = [
  {
    id: 1,
    category: "payment",
    details: "Recorded ₱150 day pass for Guest User",
    created_at: today.toISOString(), // Today
    admin: null, // Null means Owner did it
    payment: { id: 102, type: "single_session" },
  },
  {
    id: 2,
    category: "member",
    details: "Registered new member and granted 30 days active status",
    created_at: today.toISOString(), // Today
    admin: { name: "Desk Staff Alex" }, // Admin did it
    member: { id: "m-123", name: "Mark Reyes" },
  },
  {
    id: 3,
    category: "session",
    details: "Checked in member for daily workout",
    created_at: subDays(today, 3).toISOString(), // This Week
    admin: null,
    session: { id: "sess-88", type: "gym_entry" },
  },
  {
    id: 4,
    category: "payment",
    details: "Processed Membership Renewal (₱999)",
    created_at: subMonths(today, 1).toISOString(), // Last Month (Will be filtered out by default)
    admin: { name: "Desk Staff Sarah" },
    payment: { id: 89, type: "membership_renewal" },
    member: { id: "m-001", name: "John Doe" }, // Sometimes payments also link to members!
  },
];
