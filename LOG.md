# Project Log

This document records weekly progress on the Issue Reporting System project. It includes work completed, what went well, what did not go as well, and the next planned action. Selected entries are summarised in TMA02 Appendix 2; this file is the fuller project record.

The log is intended to support reflection, planning and evidence gathering throughout TM470. It also helps ensure that claims made in the report match the actual state of the repository.

---

## Week 5: 7 March – 13 March 2026

### What I did

I reviewed the TMA01 feedback in detail and identified five main improvement areas:

- clearer project scope
- stronger source evaluation
- quantified risks
- a clearer schedule / Gantt-style plan
- explicit links to the Software Development specialist route

I also reviewed the wording of the TMA01 proposal and identified where it was too broad or underdeveloped.

### What went well

The feedback was specific enough to turn into an action list. This made the next stage more manageable because I could see exactly which parts of the report needed to be strengthened.

### What did not go well

Several sections needed substantial rewriting rather than small edits. I also realised that I had used the word “lightweight” without defining it clearly enough. This made the project scope less precise than it needed to be.

### Next action

Refine the project scope and write a clearer definition of “lightweight” that explains what the system will and will not include.

---

## Week 6: 14 March – 20 March 2026

### What I did

I rewrote the opening project description and clarified the meaning of “lightweight”. I defined it as a system focused on essential issue-reporting functions, a straightforward user interface, minimal setup and maintainable code, rather than enterprise-level workflow automation or integrations.

I also began searching for additional literature on issue tracking, workflow tools, small-team adoption and software engineering methods.

### What went well

The project scope became more defensible. Clarifying “lightweight” helped me separate essential features from optional or risky features.

### What did not go well

I realised that the TMA01 literature review relied too heavily on a small number of sources. It needed more academic and technical support, especially for issue tracking and adoption by small teams.

### Next action

Read and integrate additional academic sources, then restructure the literature review so it evaluates sources rather than only describing them.

---

## Week 7: 21 March – 27 March 2026

### What I did

I read and made notes on additional sources, including:

- Ortu et al. (2015), on issue report data and common fields
- Riemenschneider, Hardgrave and Davis (2002), on adoption of software process tools
- Larman and Basili (2003), on iterative and incremental development

I also restructured the literature section around the PROMPT framework so that each source is considered in terms of credibility, relevance, method and limitation.

### What went well

The literature review became more analytical. Riemenschneider et al. gave me a stronger justification for treating ease of use as a Must-have requirement rather than a minor design preference.

### What did not go well

Reading and integrating the sources took longer than expected. I had underestimated how much time was needed to connect each source back to a concrete project decision.

### Next action

Consolidate the literature findings into a summary table and link the sources more explicitly to the requirements, architecture and evaluation plan.

---

## Week 8: 28 March – 3 April 2026

### What I did

I designed the high-level system architecture and initial ER diagram. I chose the main technology stack:

- React with TypeScript for the frontend
- Express with TypeScript for the backend
- PostgreSQL for persistence

I also wrote initial Architectural Decision Records:

- ADR-001: PostgreSQL over MongoDB or SQLite
- ADR-002: JWT-based authentication over server-side sessions

During this review I removed the initially considered Reports page from scope because it duplicated dashboard functionality and would have increased implementation risk without adding much evaluation value.

### What went well

The separation between frontend, backend and database became much clearer. Writing ADRs helped me explain decisions that had previously been implicit. Dropping the Reports page also helped keep the project aligned with the lightweight scope.

### What did not go well

I was behind the ideal coding schedule by the end of the week. However, this was a deliberate trade-off because TMA01 feedback showed that the design, planning and literature foundations needed to be strengthened first.

### Next action

Begin the first prototype increment by setting up the repository and project structure.

---

## Week 9: 4 April – 10 April 2026

### What I did

I set up the GitHub monorepo and created separate areas for:

- `backend`
- `frontend`
- `database`
- `docs`

I initialised the backend using Express and TypeScript, and initialised the frontend using Vite, React and TypeScript. I created `database/schema.sql` with the `users` and `issues` tables and executed it against a local PostgreSQL 16 database.

I also wrote ADR-003, explaining the decision to use direct parameterised SQL through `node-postgres` rather than an ORM.

### What went well

The project moved from design artefacts into executable artefacts. The repository structure now reflects the planned architecture. The database schema was created successfully and includes primary keys, foreign keys, unique constraints, `CHECK` constraints and indexes.

### What did not go well

I encountered a PostgreSQL role authentication issue because my macOS username did not match an existing database role. I resolved this by connecting with the correct PostgreSQL user and creating the required role. This cost a couple of hours but improved my understanding of local PostgreSQL setup.

### Next action

Implement a health-check endpoint to confirm that the backend starts correctly and can connect to the database. Continue preparing TMA02 evidence.

---

## Week 10: 11 April – 17 April 2026

### What I did

I implemented a basic `GET /api/health` endpoint to check that the Express backend is running and that the request-response cycle works. I also implemented `GET /api/issues` as the first issue-related backend route. This route connects to PostgreSQL, retrieves issue records from the `issues` table, and returns them as JSON.

I added supporting documentation in the `docs` folder, including:

- `data-model.md`
- ADR files
- `evaluation.md`
- `project-log.md`

I reviewed the TMA02 report against the actual repository state and corrected claims so that the report does not overstate implementation progress.

### What went well

The technical foundation is now cleaner and more coherent. The repository contains both executable scaffolding and supporting design documentation. The health-check endpoint confirms the backend is running, while `GET /api/issues` provides the first issue-related implementation evidence by returning persisted issue data from PostgreSQL.

The report now better reflects the true project stage: strong design and setup evidence, with the first backend issue route working but the wider issue workflow still in progress.

### What did not go well

Visible business functionality is still limited at TMA02. Although `GET /api/issues` is working, issue creation, editing, status updates, authentication, validation and frontend rendering against live data still need to be completed.

### Next action

Submit TMA02. Immediately after submission, begin implementing `POST /api/issues` with Zod validation, followed by the React issue list and status update workflow.
