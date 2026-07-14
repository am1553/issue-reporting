import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import type { Issue } from "../../types/issues";
import { getApiErrorMessage } from "../../api/client";
import { IssueTable } from "../issues/IssueTable";
import { PriorityBadge } from "../common/Badges";

interface DashboardPageProps {
  summary: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    assigned: number;
    highPriority: number;
  };
  issues: Issue[];
  isLoading: boolean;
  error: unknown;
  onOpenIssue: (issueId: number) => void;
  onGoToIssues: () => void;
}

export function DashboardPage({
  summary,
  issues,
  isLoading,
  error,
  onOpenIssue,
  onGoToIssues,
}: DashboardPageProps) {
  const recentIssues = issues.slice(0, 5);
  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "high",
  );

  return (
    <div className="page-stack">
      <section className="summary-grid" aria-label="Issue summary">
        <SummaryCard
          label="Total issues"
          value={summary.total}
          helper="All reported issues"
        />
        <SummaryCard
          label="Open"
          value={summary.open}
          helper="Waiting to be picked up"
        />
        <SummaryCard
          label="In progress"
          value={summary.inProgress}
          helper="Currently being handled"
        />
        <SummaryCard
          label="Resolved"
          value={summary.resolved}
          helper="Completed issues"
        />
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <div className="section-heading">
            <div>
              <h2>
                <FactCheckOutlinedIcon fontSize="small" aria-hidden="true" />
                Resolution visibility
              </h2>
              <p>
                Shows whether the prototype supports allocation and monitoring.
              </p>
            </div>
          </div>

          <div className="metric-list">
            <div>
              <span>Assigned issues</span>
              <strong>{summary.assigned}</strong>
            </div>
            <div>
              <span>High priority</span>
              <strong>{summary.highPriority}</strong>
            </div>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={onGoToIssues}
          >
            <ListAltOutlinedIcon fontSize="small" aria-hidden="true" />
            Review issue list
          </button>
        </article>

        <article className="panel">
          <h2>
            <PriorityHighOutlinedIcon fontSize="small" aria-hidden="true" />
            High-priority issues
          </h2>

          {highPriorityIssues.length === 0 ? (
            <p className="state-text">
              No high-priority issues currently shown.
            </p>
          ) : (
            <ul className="compact-list">
              {highPriorityIssues.slice(0, 4).map((issue) => (
                <li key={issue.issue_id}>
                  <button
                    type="button"
                    onClick={() => onOpenIssue(issue.issue_id)}
                  >
                    <span>{issue.title}</span>
                    <PriorityBadge priority={issue.priority} />
                    <OpenInNewOutlinedIcon
                      fontSize="small"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Recent issues</h2>
            <p>
              Latest reported issues with visible state, priority and ownership.
            </p>
          </div>
        </div>

        {isLoading && <p className="state-text">Loading issues…</p>}
        {Boolean(error) && (
          <p className="error-text">{getApiErrorMessage(error)}</p>
        )}
        {!isLoading && !error && (
          <IssueTable
            issues={recentIssues}
            selectedIssueId={null}
            compact
            isSignedIn={false}
            isAdmin={false}
            onOpenIssue={onOpenIssue}
          />
        )}
      </section>
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
  helper: string;
}

function SummaryCard({ label, value, helper }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{helper}</p>
    </article>
  );
}
