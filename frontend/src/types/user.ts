export type UserRole = "reporter" | "admin";

export interface UserSummary {
  user_id: number;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  role?: UserRole;
}
