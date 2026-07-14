import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { Issue } from "../../types/issues";
import { statusLabels } from "../../constants/issues";
import { formatDate, getUserLabel } from "../../utils/format";
import { PriorityBadge, StatusBadge } from "../common/Badges";

interface IssueDetailProps {
  issue: Issue;
  isLoading: boolean;
  isSignedIn: boolean;
  isAdmin: boolean;
  onEdit: () => void;
  onAssign: () => void;
  onStatus: () => void;
  onResolve: () => void;
}

export function IssueDetail({
  issue,
  isLoading,
  isSignedIn,
  isAdmin,
  onEdit,
  onAssign,
  onStatus,
  onResolve,
}: IssueDetailProps) {
  return (
    <div className="detail-layout">
      {isLoading && <p className="state-text">Refreshing issue details…</p>}

      <section className="detail-main">
        <p className="eyebrow">Issue #{issue.issue_id}</p>
        <h3>{issue.title}</h3>
        <p className="description">
          {issue.description || "No description provided."}
        </p>

        <dl className="meta-list">
          <div>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={issue.status} />
            </dd>
          </div>

          <div>
            <dt>Priority</dt>
            <dd>
              <PriorityBadge priority={issue.priority} />
            </dd>
          </div>

          <div>
            <dt>Assigned to</dt>
            <dd>{getUserLabel(issue)}</dd>
          </div>

          <div>
            <dt>Created</dt>
            <dd>{formatDate(issue.created_at)}</dd>
          </div>

          <div>
            <dt>Updated</dt>
            <dd>{formatDate(issue.updated_at)}</dd>
          </div>

          <div>
            <dt>Resolved</dt>
            <dd>{formatDate(issue.resolved_at)}</dd>
          </div>
        </dl>

        {issue.resolution_note && (
          <section className="resolution-box">
            <h4>Resolution note</h4>
            <p>{issue.resolution_note}</p>
          </section>
        )}
      </section>

      <aside className="detail-aside">
        <h4>Actions</h4>

        {!isSignedIn ? (
          <div className="read-only-card">
            <VisibilityOutlinedIcon fontSize="small" aria-hidden="true" />
            <div>
              <strong>Read-only view</strong>
              <p>
                Sign in from the top bar to edit, assign, update status or
                resolve this issue.
              </p>
            </div>
          </div>
        ) : (
          <div className="action-stack">
            <button type="button" className="secondary-button" onClick={onEdit}>
              <EditOutlinedIcon fontSize="small" aria-hidden="true" />
              Edit issue
            </button>

            {isAdmin ? (
              <button
                type="button"
                className="secondary-button"
                onClick={onAssign}
              >
                <AssignmentIndOutlinedIcon
                  fontSize="small"
                  aria-hidden="true"
                />
                Update assignment
              </button>
            ) : (
              <p className="state-text">
                Assignment is available to admin users only.
              </p>
            )}

            <button
              type="button"
              className="secondary-button"
              onClick={onStatus}
            >
              <UpdateOutlinedIcon fontSize="small" aria-hidden="true" />
              Change status
            </button>

            {issue.status !== "resolved" && (
              <button
                type="button"
                className="primary-button"
                onClick={onResolve}
              >
                <CheckCircleOutlineOutlinedIcon
                  fontSize="small"
                  aria-hidden="true"
                />
                Resolve issue
              </button>
            )}
          </div>
        )}

        <section className="history-panel">
          <h4>
            <HistoryOutlinedIcon fontSize="small" aria-hidden="true" />
            Status history
          </h4>

          {issue.status_history && issue.status_history.length > 0 ? (
            <ol className="history-list">
              {issue.status_history.map((history) => (
                <li key={history.history_id}>
                  <span>
                    {history.old_status
                      ? statusLabels[history.old_status]
                      : "Created"}{" "}
                    → {statusLabels[history.new_status]}
                  </span>
                  <time dateTime={history.changed_at}>
                    {formatDate(history.changed_at)}
                  </time>
                </li>
              ))}
            </ol>
          ) : (
            <p className="state-text">
              No status history returned for this issue.
            </p>
          )}
        </section>
      </aside>
    </div>
  );
}
