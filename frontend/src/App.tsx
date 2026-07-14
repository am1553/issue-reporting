import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import {
  assignIssue,
  createIssue,
  fetchIssue,
  fetchIssues,
  resolveIssue,
  updateIssue,
  updateIssueStatus,
} from "./api/issues";
import { getApiErrorMessage, getAuthToken } from "./api/client";
import { getStoredUser, login, logout } from "./api/auth";

import type {
  IssueFilters,
  IssueStatus,
  IssueUpdateInput,
} from "./types/issues";
import type { UserSummary } from "./types/user";

import { Modal } from "./components/common/Modal";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { AccessBanner } from "./components/layout/AccessBanner";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { LoginForm } from "./components/auth/LoginForm";
import { IssueFilters as IssueFiltersComponent } from "./components/issues/IssueFilters";
import { IssueTable } from "./components/issues/IssueTable";
import { IssueDetail } from "./components/issues/IssueDetail";
import {
  AssignForm,
  IssueCreateForm,
  IssueEditForm,
  ResolveForm,
  StatusForm,
} from "./components/issues/IssueForms";

import "./App.css";

export type Page = "dashboard" | "issues";

type Dialog =
  | "login"
  | "create"
  | "detail"
  | "edit"
  | "assign"
  | "status"
  | "resolve"
  | null;

function App() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<Page>("dashboard");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [authToken, setAuthTokenState] = useState<string | null>(() =>
    getAuthToken(),
  );
  const [currentUser, setCurrentUser] = useState<UserSummary | null>(() =>
    getStoredUser(),
  );

  const isSignedIn = Boolean(authToken);
  const isAdmin = currentUser?.role === "admin";

  const [filters, setFilters] = useState<IssueFilters>({
    status: "",
    priority: "",
    assigned_to: "",
  });

  const issuesQuery = useQuery({
    queryKey: ["issues", filters],
    queryFn: () => fetchIssues(filters),
  });

  const issueDetailQuery = useQuery({
    queryKey: ["issue", selectedIssueId],
    queryFn: () => fetchIssue(selectedIssueId as number),
    enabled: selectedIssueId !== null,
  });

  const issues = issuesQuery.data ?? [];

  const selectedIssue =
    issueDetailQuery.data ??
    issues.find((issue) => issue.issue_id === selectedIssueId) ??
    null;

  const summary = useMemo(() => {
    return {
      total: issues.length,
      open: issues.filter((issue) => issue.status === "open").length,
      inProgress: issues.filter((issue) => issue.status === "in_progress")
        .length,
      resolved: issues.filter((issue) => issue.status === "resolved").length,
      assigned: issues.filter((issue) => issue.assigned_to !== null).length,
      highPriority: issues.filter((issue) => issue.priority === "high").length,
    };
  }, [issues]);

  const refreshIssues = async () => {
    await queryClient.invalidateQueries({ queryKey: ["issues"] });

    if (selectedIssueId !== null) {
      await queryClient.invalidateQueries({
        queryKey: ["issue", selectedIssueId],
      });
    }
  };

  const openIssueDialog = (
    issueId: number,
    nextDialog: Exclude<Dialog, null>,
  ) => {
    setSelectedIssueId(issueId);
    setDialog(nextDialog);
  };

  const openProtectedIssueDialog = (
    issueId: number,
    nextDialog: Exclude<Dialog, null>,
    options?: { adminOnly?: boolean },
  ) => {
    setSelectedIssueId(issueId);

    if (!isSignedIn) {
      setStatusMessage("Sign in before managing issues.");
      return;
    }

    if (options?.adminOnly && !isAdmin) {
      setStatusMessage("Only admin users can assign issues.");
      setDialog("detail");
      return;
    }

    setDialog(nextDialog);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      setAuthTokenState(data.token);
      setCurrentUser(data.user ?? getStoredUser());
      setStatusMessage("Signed in successfully.");
      setDialog(null);
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const createMutation = useMutation({
    mutationFn: createIssue,
    onSuccess: async (issue) => {
      setSelectedIssueId(issue.issue_id);
      setStatusMessage("Issue created successfully.");
      setDialog("detail");
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      issueId,
      input,
    }: {
      issueId: number;
      input: IssueUpdateInput;
    }) => updateIssue(issueId, input),
    onSuccess: async () => {
      setStatusMessage("Issue details updated.");
      setDialog("detail");
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const assignMutation = useMutation({
    mutationFn: ({
      issueId,
      assignedTo,
    }: {
      issueId: number;
      assignedTo: number | null;
    }) => assignIssue(issueId, { assigned_to: assignedTo }),
    onSuccess: async () => {
      setStatusMessage("Issue assignment updated.");
      setDialog("detail");
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({
      issueId,
      status,
    }: {
      issueId: number;
      status: IssueStatus;
    }) => updateIssueStatus(issueId, { status }),
    onSuccess: async () => {
      setStatusMessage("Issue status updated and recorded in the history.");
      setDialog("detail");
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const resolveMutation = useMutation({
    mutationFn: ({ issueId, note }: { issueId: number; note: string }) =>
      resolveIssue(issueId, { resolution_note: note }),
    onSuccess: async () => {
      setStatusMessage("Issue resolved with a resolution note.");
      setDialog("detail");
      await refreshIssues();
    },
    onError: (error) => {
      setStatusMessage(getApiErrorMessage(error));
    },
  });

  const handleLogout = async () => {
    logout();
    setAuthTokenState(null);
    setCurrentUser(null);
    setStatusMessage(
      "Signed out. You can still view issues in read-only mode.",
    );
    await refreshIssues();
  };

  return (
    <main className="app-shell">
      <Sidebar
        page={page}
        isSignedIn={isSignedIn}
        userRole={currentUser?.role}
        onPageChange={setPage}
      />

      <section className="main-content">
        <Topbar
          page={page}
          isSignedIn={isSignedIn}
          onCreateIssue={() => setDialog("create")}
          onSignIn={() => setDialog("login")}
          onSignOut={handleLogout}
        />

        {!isSignedIn && <AccessBanner />}

        <section className="feedback-region" aria-live="polite">
          {statusMessage && <p>{statusMessage}</p>}
        </section>

        {page === "dashboard" ? (
          <DashboardPage
            summary={summary}
            issues={issues}
            isLoading={issuesQuery.isLoading}
            error={issuesQuery.error}
            onOpenIssue={(issueId) => openIssueDialog(issueId, "detail")}
            onGoToIssues={() => setPage("issues")}
          />
        ) : (
          <section className="panel">
            <div className="section-heading">
              <div>
                <h2>Issue list</h2>
                <p>
                  {isSignedIn
                    ? "Open focused modals to manage issue workflow."
                    : "View and filter issues in read-only mode."}
                </p>
              </div>
              <button
                type="button"
                className="secondary-button"
                onClick={() => void refreshIssues()}
              >
                <RefreshOutlinedIcon fontSize="small" aria-hidden="true" />
                Refresh
              </button>
            </div>

            <IssueFiltersComponent filters={filters} onChange={setFilters} />

            {issuesQuery.isLoading && (
              <p className="state-text">Loading issues…</p>
            )}
            {issuesQuery.isError && (
              <p className="error-text">
                {getApiErrorMessage(issuesQuery.error)}
              </p>
            )}

            {!issuesQuery.isLoading && !issuesQuery.isError && (
              <IssueTable
                issues={issues}
                selectedIssueId={selectedIssueId}
                isSignedIn={isSignedIn}
                isAdmin={isAdmin}
                onOpenIssue={(issueId) => openIssueDialog(issueId, "detail")}
                onEditIssue={(issueId) =>
                  openProtectedIssueDialog(issueId, "edit")
                }
                onAssignIssue={(issueId) =>
                  openProtectedIssueDialog(issueId, "assign", {
                    adminOnly: true,
                  })
                }
                onResolveIssue={(issueId) =>
                  openProtectedIssueDialog(issueId, "resolve")
                }
              />
            )}
          </section>
        )}
      </section>

      {dialog === "login" && (
        <Modal title="Sign in" onClose={() => setDialog(null)}>
          <LoginForm
            isPending={loginMutation.isPending}
            onSubmit={(input) => loginMutation.mutate(input)}
          />
        </Modal>
      )}

      {dialog === "create" && (
        <Modal title="Report a new issue" onClose={() => setDialog(null)}>
          <IssueCreateForm
            isPending={createMutation.isPending}
            onSubmit={(input) => createMutation.mutate(input)}
          />
        </Modal>
      )}

      {dialog === "detail" && selectedIssue && (
        <Modal title="Issue details" wide onClose={() => setDialog(null)}>
          <IssueDetail
            issue={selectedIssue}
            isLoading={issueDetailQuery.isFetching}
            isSignedIn={isSignedIn}
            isAdmin={isAdmin}
            onEdit={() => setDialog("edit")}
            onAssign={() => setDialog("assign")}
            onStatus={() => setDialog("status")}
            onResolve={() => setDialog("resolve")}
          />
        </Modal>
      )}

      {dialog === "edit" && selectedIssue && (
        <Modal title="Edit issue" onClose={() => setDialog("detail")}>
          <IssueEditForm
            issue={selectedIssue}
            isAdmin={isAdmin}
            isPending={editMutation.isPending}
            onSubmit={(input) =>
              editMutation.mutate({
                issueId: selectedIssue.issue_id,
                input,
              })
            }
          />
        </Modal>
      )}

      {dialog === "assign" && selectedIssue && isAdmin && (
        <Modal title="Assign issue" onClose={() => setDialog("detail")}>
          <AssignForm
            issue={selectedIssue}
            isPending={assignMutation.isPending}
            onSubmit={(assignedTo) =>
              assignMutation.mutate({
                issueId: selectedIssue.issue_id,
                assignedTo,
              })
            }
          />
        </Modal>
      )}

      {dialog === "status" && selectedIssue && (
        <Modal title="Update status" onClose={() => setDialog("detail")}>
          <StatusForm
            issue={selectedIssue}
            isPending={statusMutation.isPending}
            onSubmit={(status) =>
              statusMutation.mutate({
                issueId: selectedIssue.issue_id,
                status,
              })
            }
          />
        </Modal>
      )}

      {dialog === "resolve" && selectedIssue && (
        <Modal title="Resolve issue" onClose={() => setDialog("detail")}>
          <ResolveForm
            issue={selectedIssue}
            isPending={resolveMutation.isPending}
            onSubmit={(note) =>
              resolveMutation.mutate({
                issueId: selectedIssue.issue_id,
                note,
              })
            }
          />
        </Modal>
      )}
    </main>
  );
}

export default App;
