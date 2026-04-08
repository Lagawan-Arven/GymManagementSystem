export const queryKeys = {
  // Base key for a specific tenant
  owners: (owner_id: string) => [owner_id] as const,

  // Feature bases
  admins: (owner_id: string) =>
    [...queryKeys.owners(owner_id), "admins"] as const,
  members: (owner_id: string) =>
    [...queryKeys.owners(owner_id), "members"] as const,
  sessions: (owner_id: string) =>
    [...queryKeys.owners(owner_id), "sessions"] as const,
  payments: (owner_id: string) =>
    [...queryKeys.owners(owner_id), "payments"] as const,
  analytics: (owner_id: string) =>
    [...queryKeys.owners(owner_id), "analytics"] as const,

  // Specific queries
  adminList: (owner_id: string, filters?: string) =>
    [...queryKeys.admins(owner_id), "list", !!filters] as const,

  memberList: (owner_id: string, filters?: string) =>
    [...queryKeys.members(owner_id), "list", !!filters] as const,

  memberDetails: (owner_id: string, memberId: string) =>
    [...queryKeys.members(owner_id), "detail", memberId] as const,
};
