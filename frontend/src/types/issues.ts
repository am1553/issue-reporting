import type { UserSummary } from "./user";

export type IssueStatus = "open" | "in_progress" | "resolved";
export type IssuePriority = "low" | "medium" | "high";

export interface StatusHistoryItem {
  history_id: number;
  issue_id: number;
  old_status: IssueStatus | null;
  new_status: IssueStatus;
  changed_by: number | null;
  changed_by_user?: UserSummary | null;
  changed_at: string;
}

export interface Issue {
  issue_id: number;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  reported_by: number | null;
  reported_by_user?: UserSummary | null;
  assigned_to: number | null;
  assigned_to_user?: UserSummary | null;
  resolution_note: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  status_history?: StatusHistoryItem[];
}

export interface IssueInput {
  title: string;
  description?: string;
  priority: IssuePriority;
}

export interface IssueUpdateInput {
  title?: string;
  description?: string | null;
  priority?: IssuePriority;
}

export interface IssueFilters {
  status?: IssueStatus | "";
  priority?: IssuePriority | "";
  assigned_to?: string;
}

export interface AssignIssueInput {
  assigned_to: number | null;
}

export interface UpdateIssueStatusInput {
  status: IssueStatus;
}

export interface ResolveIssueInput {
  resolution_note: string;
}
