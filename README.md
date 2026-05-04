# Issue Reporting System

A lightweight web-based issue reporting prototype for small organisations. Built as the practical component of TM470 (The Open University, Computing and IT Project).

## Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL 16

## Quick start

Prerequisites: Node 20+, PostgreSQL 14+, npm.

```bash
# 1. Database
createdb issue_tracker
psql -d issue_tracker -f database/schema.sql
psql -d issue_tracker -f database/seed.sql

# 2. Backend
cd backend
cp .env.example .env   # then edit with your local values
npm install
npm run dev            # runs on :3001

# 3. Frontend (in a new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev            # runs on :5173
```

## Project structure

- `backend/` — Express API, routes, middleware, validation
- `frontend/` — React UI components, API client
- `database/` — SQL schema, seed data, migrations
- `docs/` — architecture diagrams, data model, API reference

## Status

Early prototype. See `docs/` for architecture and design decisions.

## Licence

MIT
