import { type FormEvent, useState } from "react";
import type {
  Issue,
  IssueInput,
  IssuePriority,
  IssueStatus,
  IssueUpdateInput,
} from "../../types/issues";
import {
  priorityLabels,
  priorityOptions,
  statusLabels,
  statusOptions,
} from "../../constants/issues";

interface IssueCreateFormProps {
  isPending: boolean;
  onSubmit: (input: IssueInput) => void;
}

export function IssueCreateForm({ isPending, onSubmit }: IssueCreateFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<IssuePriority>("medium");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="issue-title">Title *</label>
        <input
          id="issue-title"
          value={title}
          maxLength={150}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "issue-title-error" : undefined}
          onChange={(event) => setTitle(event.target.value)}
        />
        {error && (
          <p id="issue-title-error" className="error-text">
            {error}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="issue-description">Description</label>
        <textarea
          id="issue-description"
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="issue-priority">Suggested priority</label>
        <select
          id="issue-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value as IssuePriority)}
        >
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {priorityLabels[option]}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Creating…" : "Create issue"}
      </button>
    </form>
  );
}

interface IssueEditFormProps {
  issue: Issue;
  isAdmin: boolean;
  isPending: boolean;
  onSubmit: (input: IssueUpdateInput) => void;
}

export function IssueEditForm({
  issue,
  isAdmin,
  isPending,
  onSubmit,
}: IssueEditFormProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description ?? "");
  const [priority, setPriority] = useState<IssuePriority>(issue.priority);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority: isAdmin ? priority : undefined,
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="edit-title">Title *</label>
        <input
          id="edit-title"
          value={title}
          maxLength={150}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "edit-title-error" : undefined}
          onChange={(event) => setTitle(event.target.value)}
        />
        {error && (
          <p id="edit-title-error" className="error-text">
            {error}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      {isAdmin ? (
        <div className="field">
          <label htmlFor="edit-priority">Priority</label>
          <select
            id="edit-priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as IssuePriority)
            }
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {priorityLabels[option]}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="state-text">
          Priority review is available to admin users only.
        </p>
      )}

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

interface AssignFormProps {
  issue: Issue;
  isPending: boolean;
  onSubmit: (assignedTo: number | null) => void;
}

export function AssignForm({ issue, isPending, onSubmit }: AssignFormProps) {
  const [assignedTo, setAssignedTo] = useState(
    issue.assigned_to ? String(issue.assigned_to) : "",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(assignedTo.trim() ? Number(assignedTo) : null);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <p className="state-text">
        Assigning responsibility makes ownership visible in the issue list and
        detail view.
      </p>

      <div className="field">
        <label htmlFor="assigned-to">Assigned to user ID</label>
        <input
          id="assigned-to"
          inputMode="numeric"
          value={assignedTo}
          placeholder="Leave blank to unassign"
          onChange={(event) => setAssignedTo(event.target.value)}
        />
      </div>

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Updating…" : "Update assignment"}
      </button>
    </form>
  );
}

interface StatusFormProps {
  issue: Issue;
  isPending: boolean;
  onSubmit: (status: IssueStatus) => void;
}

export function StatusForm({ issue, isPending, onSubmit }: StatusFormProps) {
  const [status, setStatus] = useState<IssueStatus>(issue.status);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(status);
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <p className="state-text">
        Status changes are recorded in the issue history so progress can be
        monitored over time.
      </p>

      <div className="field">
        <label htmlFor="status-select">New status</label>
        <select
          id="status-select"
          value={status}
          onChange={(event) => setStatus(event.target.value as IssueStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {statusLabels[option]}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="primary-button"
        disabled={isPending || status === issue.status}
      >
        {isPending ? "Updating…" : "Update status"}
      </button>
    </form>
  );
}

interface ResolveFormProps {
  issue: Issue;
  isPending: boolean;
  onSubmit: (note: string) => void;
}

export function ResolveForm({ issue, isPending, onSubmit }: ResolveFormProps) {
  const [note, setNote] = useState(issue.resolution_note ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!note.trim()) {
      setError("Resolution note is required.");
      return;
    }

    setError("");
    onSubmit(note.trim());
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <p className="state-text">
        A resolution note records how the issue was fixed, not just that it was
        closed.
      </p>

      <div className="field">
        <label htmlFor="resolution-note">Resolution note *</label>
        <textarea
          id="resolution-note"
          rows={5}
          value={note}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "resolution-error" : undefined}
          onChange={(event) => setNote(event.target.value)}
        />
        {error && (
          <p id="resolution-error" className="error-text">
            {error}
          </p>
        )}
      </div>

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Resolving…" : "Resolve issue"}
      </button>
    </form>
  );
}
