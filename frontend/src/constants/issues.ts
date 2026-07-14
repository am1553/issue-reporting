import type { IssuePriority, IssueStatus } from "../types/issues";

export const statusLabels: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
};

export const priorityLabels: Record<IssuePriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const statusOptions: IssueStatus[] = ["open", "in_progress", "resolved"];

export const priorityOptions: IssuePriority[] = ["low", "medium", "high"];
