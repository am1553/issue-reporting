import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import type { Issue } from "../../types/issues";
import { formatDate, getUserLabel } from "../../utils/format";
import { PriorityBadge, StatusBadge } from "../common/Badges";

interface IssueTableProps {
  issues: Issue[];
  selectedIssueId: number | null;
  isSignedIn: boolean;
  isAdmin: boolean;
  compact?: boolean;
  onOpenIssue: (issueId: number) => void;
  onEditIssue?: (issueId: number) => void;
  onAssignIssue?: (issueId: number) => void;
  onResolveIssue?: (issueId: number) => void;
}

export function IssueTable({
  issues,
  selectedIssueId,
  isSignedIn,
  isAdmin,
  compact = false,
  onOpenIssue,
  onEditIssue,
  onAssignIssue,
  onResolveIssue,
}: IssueTableProps) {
  if (issues.length === 0) {
    return <p className="state-text">No issues match the current view.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <caption>Issue list showing status, priority and assignment</caption>
        <thead>
          <tr>
            <th scope="col">Issue</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Assigned to</th>
            {!compact && <th scope="col">Updated</th>}
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr
              key={issue.issue_id}
              className={
                selectedIssueId === issue.issue_id ? "selected-row" : undefined
              }
            >
              <td>
                <strong>{issue.title}</strong>
                <span>#{issue.issue_id}</span>
              </td>

              <td>
                <StatusBadge status={issue.status} />
              </td>

              <td>
                <PriorityBadge priority={issue.priority} />
              </td>

              <td>{getUserLabel(issue)}</td>

              {!compact && <td>{formatDate(issue.updated_at)}</td>}

              <td>
                <div className="row-actions">
                  <button
                    type="button"
                    className="table-button"
                    onClick={() => onOpenIssue(issue.issue_id)}
                  >
                    <VisibilityOutlinedIcon
                      fontSize="small"
                      aria-hidden="true"
                    />
                    View
                  </button>

                  {!compact && isSignedIn && onEditIssue && (
                    <button
                      type="button"
                      className="table-button"
                      onClick={() => onEditIssue(issue.issue_id)}
                    >
                      <EditOutlinedIcon fontSize="small" aria-hidden="true" />
                      Edit
                    </button>
                  )}

                  {!compact && isSignedIn && isAdmin && onAssignIssue && (
                    <button
                      type="button"
                      className="table-button"
                      onClick={() => onAssignIssue(issue.issue_id)}
                    >
                      <AssignmentIndOutlinedIcon
                        fontSize="small"
                        aria-hidden="true"
                      />
                      Assign
                    </button>
                  )}

                  {!compact &&
                    isSignedIn &&
                    onResolveIssue &&
                    issue.status !== "resolved" && (
                      <button
                        type="button"
                        className="table-button"
                        onClick={() => onResolveIssue(issue.issue_id)}
                      >
                        <CheckCircleOutlineOutlinedIcon
                          fontSize="small"
                          aria-hidden="true"
                        />
                        Resolve
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
