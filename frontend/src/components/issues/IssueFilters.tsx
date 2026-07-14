import type { IssueFilters as IssueFiltersType } from "../../types/issues";
import {
  priorityLabels,
  priorityOptions,
  statusLabels,
  statusOptions,
} from "../../constants/issues";

interface IssueFiltersProps {
  filters: IssueFiltersType;
  onChange: (filters: IssueFiltersType) => void;
}

export function IssueFilters({ filters, onChange }: IssueFiltersProps) {
  return (
    <form className="filters" aria-label="Issue filters">
      <div className="field">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as IssueFiltersType["status"],
            })
          }
        >
          <option value="">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-priority">Priority</label>
        <select
          id="filter-priority"
          value={filters.priority}
          onChange={(event) =>
            onChange({
              ...filters,
              priority: event.target.value as IssueFiltersType["priority"],
            })
          }
        >
          <option value="">All priorities</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-assigned">Assigned user ID</label>
        <input
          id="filter-assigned"
          inputMode="numeric"
          value={filters.assigned_to}
          placeholder="Any"
          onChange={(event) =>
            onChange({ ...filters, assigned_to: event.target.value })
          }
        />
      </div>
    </form>
  );
}
