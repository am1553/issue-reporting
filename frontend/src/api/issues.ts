import { api } from "./client";
import type {
  AssignIssueInput,
  Issue,
  IssueFilters,
  IssueInput,
  IssueUpdateInput,
  ResolveIssueInput,
  UpdateIssueStatusInput,
} from "../types/issues";

const normaliseIssueList = (data: unknown): Issue[] => {
  if (Array.isArray(data)) return data as Issue[];

  if (
    typeof data === "object" &&
    data !== null &&
    "issues" in data &&
    Array.isArray((data as { issues: unknown }).issues)
  ) {
    return (data as { issues: Issue[] }).issues;
  }

  return [];
};

export const fetchIssues = async (
  filters: IssueFilters = {},
): Promise<Issue[]> => {
  const response = await api.get("/issues", {
    params: {
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      assigned_to: filters.assigned_to || undefined,
    },
  });

  return normaliseIssueList(response.data);
};

export const fetchIssue = async (issueId: number): Promise<Issue> => {
  const response = await api.get<Issue>(`/issues/${issueId}`);
  return response.data;
};

export const createIssue = async (input: IssueInput): Promise<Issue> => {
  const response = await api.post<Issue>("/issues", input);
  return response.data;
};

export const updateIssue = async (
  issueId: number,
  input: IssueUpdateInput,
): Promise<Issue> => {
  const response = await api.put<Issue>(`/issues/${issueId}`, input);
  return response.data;
};

export const assignIssue = async (
  issueId: number,
  input: AssignIssueInput,
): Promise<Issue> => {
  const response = await api.patch<Issue>(`/issues/${issueId}/assign`, input);
  return response.data;
};

export const updateIssueStatus = async (
  issueId: number,
  input: UpdateIssueStatusInput,
): Promise<Issue> => {
  const response = await api.patch<Issue>(`/issues/${issueId}/status`, input);
  return response.data;
};

export const resolveIssue = async (
  issueId: number,
  input: ResolveIssueInput,
): Promise<Issue> => {
  const response = await api.patch<Issue>(`/issues/${issueId}/resolve`, input);
  return response.data;
};
