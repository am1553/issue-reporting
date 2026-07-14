import type { IssuePriority, IssueStatus } from "../../types/issues";
import { priorityLabels, statusLabels } from "../../constants/issues";

export function StatusBadge({ status }: { status: IssueStatus }) {
  return (
    <span className={`badge status-${status}`}>{statusLabels[status]}</span>
  );
}

export function PriorityBadge({ priority }: { priority: IssuePriority }) {
  return (
    <span className={`badge priority-${priority}`}>
      {priorityLabels[priority]}
    </span>
  );
}
