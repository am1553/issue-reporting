export type IssueStatus = 'open' | 'in_progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  issue_id: number;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  reported_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface IssueInput {
  title: string;
  description?: string;
  priority: IssuePriority;
}
