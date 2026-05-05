# 001 — PostgreSQL over MongoDB or SQLite

**Status:** Accepted  
**Date:** Week 8 of TM470, during architecture and data-model design  
**Decision-maker:** Aryan Mehta

## Context

The Issue Reporting System needs persistent storage for two core entities: `User` and `Issue`. The relationship between them is relational: one user can report many issues, and each issue can be linked to at most one reporting user.

The system also needs to protect data integrity. For example, issue `status` should only allow values such as `open`, `in_progress` and `resolved`, and issue `priority` should only allow values such as `low`, `medium` and `high`. The database choice therefore affects the schema design, backend implementation, testing approach and maintainability of the prototype.

Three options were considered:

1. **PostgreSQL** — a mature open-source relational database with strong support for constraints, foreign keys, indexes and SQL queries.
2. **MongoDB** — a document-oriented database that stores records as flexible JSON-like documents.
3. **SQLite** — a lightweight file-based relational database commonly used for prototypes and local applications.

## Decision

PostgreSQL 16 has been chosen for the initial prototype.

## Rationale

PostgreSQL best matches the data model for this project. The system has a simple but clear relational structure: users and issues are separate entities, and issues can reference the user who reported them. A relational database expresses this relationship naturally through primary keys and foreign keys.

PostgreSQL also supports database-level integrity constraints. In the current schema, `CHECK` constraints are used to restrict `status` and `priority` values. This means invalid values cannot be stored even if a future application route contains a bug or if data is inserted outside the normal frontend flow. This supports the project’s security and reliability aims by not relying only on client-side or backend validation.

PostgreSQL was preferred over MongoDB because the current data shape is not strongly document-oriented. MongoDB would be useful for flexible or deeply nested documents, but this project’s initial model is based on structured records and relationships. MongoDB could still support this project, but enforcing relationships and consistent values would rely more heavily on application-level validation or additional schema validation rules. PostgreSQL provides these guarantees more directly for this use case.

PostgreSQL was preferred over SQLite because the prototype is intended to represent a multi-user web application rather than a single-user local tool. SQLite would be simpler to set up and would be suitable for a very small local prototype, but PostgreSQL is more representative of the deployment style used by many web applications. It also provides stronger support for concurrent access, database roles and production-like development practice.

PostgreSQL is also a good fit for my learning goals in the Software Development route. It allows me to demonstrate relational modelling, constraints, indexes, SQL queries and integration with an Express backend. These are relevant software engineering skills and align with the database design described in the TMA02 report.

## Consequences

### Positive consequences

- The schema can enforce data integrity through primary keys, foreign keys, `UNIQUE` constraints, `CHECK` constraints and `NOT NULL` constraints.
- The relationship between `users` and `issues` can be represented clearly using a foreign key.
- SQL queries are suitable for common issue-tracking operations, such as filtering issues by status or reporting user.
- PostgreSQL supports indexes, which helps demonstrate basic query-performance reasoning.
- PostgreSQL has mature local development tools such as `psql` and pgAdmin.
- The `node-postgres` package provides a straightforward way to connect the Express backend to the database.

### Negative consequences

- PostgreSQL requires a local database server to be installed and running during development.
- Initial setup is more involved than SQLite.
- Schema changes require migrations or careful manual updates rather than informal document changes.
- PostgreSQL introduces some learning overhead, especially around roles, connection strings and local setup.

These risks are acceptable because the schema is intentionally small and the setup is documented in the repository.

## Alternatives considered

### MongoDB

MongoDB was considered because it works naturally with JSON-like data and is commonly used with JavaScript/TypeScript applications. It may have been appropriate if the issue records were highly flexible or nested, for example if the project included complex comment threads, attachments or changing custom fields.

It was not chosen because the current prototype benefits more from relational integrity, fixed constraints and SQL-based filtering. These fit PostgreSQL more naturally.

### SQLite

SQLite was considered because it is simple, lightweight and easy to use for local prototypes. It would reduce setup effort and avoid running a separate database server.

It was not chosen because the project is intended to model a web-based multi-user issue reporting system. PostgreSQL gives a more realistic development environment for that type of system and supports the database features used in the schema.

## Review point

This decision should be reviewed only if the project scope changes significantly. For example:

- if the system becomes a single-user offline tool, SQLite may be reconsidered;
- if the system requires highly flexible or nested issue data, MongoDB may be reconsidered;
- if the current relational model remains focused on users and issues, PostgreSQL remains the most appropriate choice.
