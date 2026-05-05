# Data Model

This document describes the data model for the Issue Reporting System: the entities, attributes, relationships and constraints used to protect data integrity. It complements the ER diagram in `docs/images/erd-diagram.png` and the executable PostgreSQL schema in `database/schema.sql`.

## Status at TMA02

At TMA02, the data model is part of the project’s early implementation evidence. The schema has been designed to support the lightweight issue-reporting workflow described in the report: creating issues, viewing issues, editing issue details and updating issue status. The model is intentionally small so that the prototype remains achievable within the TM470 timeframe.

The executable source of truth is `database/schema.sql`. This document explains the rationale behind the schema and records the design decisions so they do not have to be reconstructed later.

## Overview

The data model contains two core entities:

- **User**
- **Issue**

The relationship between them is one-to-many: a user can report many issues, and each issue is linked to at most one reporting user.

The model is intentionally minimal, reflecting the lightweight scope of the project described in TMA02 Section 1.2. Additional entities such as comments, attachments, audit logs, notifications, tags and assignees were considered but excluded from the initial increment. This keeps the focus on the core issue-management workflow rather than enterprise-level functionality.

## Entities

### User

The `users` table represents a person with an account on the system. Users can report issues and, depending on the implementation stage, may also manage or update issues.

| Column          | Type           | Constraints                 | Notes                                                     |
| --------------- | -------------- | --------------------------- | --------------------------------------------------------- |
| `user_id`       | `SERIAL`       | `PRIMARY KEY`               | Auto-incrementing surrogate key                           |
| `username`      | `VARCHAR(50)`  | `UNIQUE`, `NOT NULL`        | Display name or account name                              |
| `email`         | `VARCHAR(100)` | `UNIQUE`, `NOT NULL`        | Used for login or identification                          |
| `password_hash` | `VARCHAR(255)` | `NOT NULL`                  | Stores a bcrypt password hash, never a plaintext password |
| `created_at`    | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP` | Records when the user was created                         |

### Issue

The `issues` table represents a single problem, task or request recorded in the system.

| Column        | Type           | Constraints                                                                           | Notes                                                        |
| ------------- | -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `issue_id`    | `SERIAL`       | `PRIMARY KEY`                                                                         | Auto-incrementing surrogate key                              |
| `title`       | `VARCHAR(150)` | `NOT NULL`                                                                            | Short summary of the issue                                   |
| `description` | `TEXT`         | Optional                                                                              | Free-text detail about the issue                             |
| `status`      | `VARCHAR(20)`  | `NOT NULL`, `DEFAULT 'open'`, `CHECK (status IN ('open', 'in_progress', 'resolved'))` | Tracks the issue state                                       |
| `priority`    | `VARCHAR(20)`  | `NOT NULL`, `DEFAULT 'medium'`, `CHECK (priority IN ('low', 'medium', 'high'))`       | Indicates relative urgency                                   |
| `reported_by` | `INTEGER`      | `REFERENCES users(user_id) ON DELETE SET NULL`                                        | Optional foreign key linking the issue to the reporting user |
| `created_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`                                                           | Records when the issue was created                           |
| `updated_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`                                                           | Records when the issue was last updated                      |

The `updated_at` value will be updated by application code when an issue is edited or when its status changes. A database trigger was considered but not included in the initial schema because application-managed timestamps are simpler for the prototype and easier to demonstrate in tests.

## Relationship: User reports Issue

The `reported_by` foreign key in `issues` references `user_id` in `users`.

The cardinality is:

- one user can report zero or many issues
- each issue can have zero or one reporting user

The relationship is optional on the `Issue` side because `reported_by` is nullable. This is deliberate. Issue records represent organisational memory: if a user account is removed, the issue itself should not disappear. The `ON DELETE SET NULL` rule preserves the issue record while removing the reference to the deleted user.

Two alternatives were considered:

- `ON DELETE CASCADE`: rejected because deleting a user would also delete their issues, which could remove important historical information.
- `ON DELETE RESTRICT`: rejected because it would prevent deletion of a user who had reported any issue, which may be inconvenient for account management.

`ON DELETE SET NULL` gives a reasonable balance for the prototype: it preserves issue history while avoiding a hard dependency on the continued existence of the user record.

## Constraints

### Primary keys

Both tables use surrogate `SERIAL` primary keys. This means the primary key is an auto-incrementing integer generated by PostgreSQL.

Surrogate keys were chosen instead of natural keys such as email addresses because natural keys can change. For example, a user may change their email address, but their `user_id` remains stable. Stable keys make foreign-key references simpler and safer.

### Uniqueness

The `username` and `email` columns are both marked `UNIQUE` to prevent duplicate accounts.

The application may also check for duplicates before inserting a new user, but the database constraint is the authoritative guarantee. If application logic fails or two requests happen at nearly the same time, PostgreSQL will still reject duplicate values.

### CHECK constraints on enumerated values

The `status` and `priority` fields are constrained to fixed sets of values:

```sql
CHECK (status IN ('open', 'in_progress', 'resolved'))
CHECK (priority IN ('low', 'medium', 'high'))
```
