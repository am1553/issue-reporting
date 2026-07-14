import type { Issue } from "../types/issues";

export const formatDate = (value: string | null): string => {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export const getUserLabel = (issue: Issue): string => {
  const user = issue.assigned_to_user;

  if (user?.name) return user.name;
  if (user?.username) return user.username;
  if (user?.email) return user.email;
  if (issue.assigned_to) return `User #${issue.assigned_to}`;

  return "Unassigned";
};
