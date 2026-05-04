import axios from 'axios';
import type { Issue, IssueInput } from '../types/issue';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

export const fetchIssues = async (): Promise<Issue[]> => {
  const res = await api.get<Issue[]>('/issues');
  return res.data;
};

export const createIssue = async (input: IssueInput): Promise<Issue> => {
  const res = await api.post<Issue>('/issues', input);
  return res.data;
};
