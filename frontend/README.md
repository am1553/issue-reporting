# Issue Reporting System Frontend

React + TypeScript frontend for the TM470 Issue Reporting System prototype.

The frontend provides the user-facing part of the issue workflow: listing issues, filtering by status and priority, creating issues, assigning responsibility, changing status, recording resolution notes and displaying progress information.

## Stack

- React
- TypeScript
- Vite
- Axios
- TanStack React Query

## Main features

- Issue dashboard with status counts.
- Issue list with status, priority and assignee visibility.
- Filters for status, priority and assigned user.
- New issue form with validation-friendly fields.
- Issue detail panel.
- Assignment workflow.
- Status update workflow.
- Resolution note workflow.
- JWT token support for protected write operations.
- Loading and error states.
- Keyboard-accessible controls and visible focus states.
- Status and priority communicated by text, not colour alone.

## Environment

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:3001/api
```
