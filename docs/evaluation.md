# Evaluation Plan and Findings

This document records the evaluation plan for the Issue Reporting System prototype against four criteria: functional correctness, usability, accessibility and security. It complements TMA02 Section 4.4 and will be expanded with concrete findings as implementation and evaluation activities are completed.

## Status at TMA02

At the time of writing TMA02, the project is at the early implementation/scaffolding stage. The repository structure, PostgreSQL schema, frontend/backend setup and initial health-check endpoint are in place, but the full issue workflow is still being implemented.

For this reason, the findings sections below are intentionally left as placeholders. The purpose of this document at TMA02 is to define the evaluation plan, tools, criteria and success measures in advance, so that the completed prototype can be evaluated consistently during the next stages of development.

Evaluation findings will be added as the relevant implementation work is completed. The planned order is:

- functional testing after each API endpoint is implemented
- accessibility and security checks after the main frontend/API workflow exists
- heuristic walkthrough and participant/cognitive walkthrough evaluation after the prototype is usable

---

## 1. Functional correctness

### Method

Functional correctness will be evaluated against the acceptance evidence in TMA02 Section 4.1. Each REST endpoint will be tested using Supertest HTTP-level integration tests executed by Vitest.

For each implemented endpoint, the target is to include at least three categories of test:

- **Happy path:** a valid request returns the expected HTTP status code and response shape.
- **Validation rejection:** malformed or missing required fields return HTTP 400 with a useful error response.
- **Authorisation or missing resource rejection:** protected endpoints reject unauthenticated requests with HTTP 401 where applicable, and missing resources return HTTP 404.

Coverage will be measured using Vitest’s coverage reporter. The target is at least 80% coverage for the routes layer once the main API endpoints are complete.

### Findings

_To be completed once each endpoint is implemented and tested._

| Endpoint                       | Requirement    | Tests passing | Coverage / evidence location | Notes                                                       |
| ------------------------------ | -------------- | ------------- | ---------------------------- | ----------------------------------------------------------- |
| `GET /api/health`              | Infrastructure |               |                              | Confirms server/database connectivity                       |
| `POST /api/issues`             | FR1, NFR2      |               |                              | Create issue with validation                                |
| `GET /api/issues`              | FR2            |               |                              | Retrieve issue list, with filters/pagination if implemented |
| `GET /api/issues/:id`          | FR2            |               |                              | Retrieve single issue                                       |
| `PUT /api/issues/:id`          | FR3            |               |                              | Edit issue details                                          |
| `PATCH /api/issues/:id/status` | FR4            |               |                              | Update issue status only                                    |
| `DELETE /api/issues/:id`       | Scope review   |               |                              | To be reviewed against lightweight scope                    |
| `POST /api/auth/register`      | FR5            |               |                              | Register user and hash password                             |
| `POST /api/auth/login`         | FR5            |               |                              | Login and issue token                                       |

---

## 2. Usability evaluation

### Method

Usability will be evaluated in two stages.

### Stage 1: Heuristic walkthrough

A structured inspection will be carried out against Nielsen’s ten usability heuristics. The walkthrough will focus on whether the implemented interface supports the core issue workflow clearly and consistently.

The most relevant heuristics for this project are:

- visibility of system status
- match between system and the real world
- consistency and standards
- error prevention
- recognition rather than recall
- help users recognise, diagnose and recover from errors

Each issue found will be recorded with a severity rating:

- **0 — None:** not a usability problem
- **1 — Cosmetic:** can be fixed if time allows
- **2 — Minor:** low-priority usability issue
- **3 — Major:** important issue that should be fixed
- **4 — Catastrophic:** must be fixed before release

### Stage 2: Task-based evaluation

Where participants are available, three to five adult volunteers will be asked to complete the five tasks listed in TMA02 Appendix 3. The tasks use fictional issue-reporting scenarios and do not require participants to disclose real workplace information.

Each session is expected to take approximately 10–15 minutes. Sessions will be observed but not interrupted unless the participant becomes stuck or asks for help.

Metrics recorded:

- task completion: success / partial success / failure
- time on task
- number of help requests or major hesitations
- brief anonymised participant comments
- observed points of confusion

Participant evaluation will only be carried out after tutor approval and consent materials are finalised. Participants will be informed that they can withdraw at any time.

If participant recruitment is unsuccessful or limited, a cognitive walkthrough will be used as a fallback. This will use two personas:

- a non-technical office worker who needs to report a routine issue
- an administrator or manager who needs to review and update issue statuses

### Findings — heuristic walkthrough

_To be completed after the main interface views are implemented._

| Page / feature | Heuristic affected | Severity | Description | Recommended fix | Status |
| -------------- | ------------------ | -------- | ----------- | --------------- | ------ |
|                |                    |          |             |                 |        |

### Findings — participant or cognitive walkthrough evaluation

_To be completed after the prototype supports the core issue workflow._

| Task                                            | Participants / personas attempting | Completed unaided | Completed with prompts | Failed | Average time | Notes |
| ----------------------------------------------- | ---------------------------------- | ----------------- | ---------------------- | ------ | ------------ | ----- |
| T1: Create a new issue                          |                                    |                   |                        |        |              |       |
| T2: Locate the issue in the list                |                                    |                   |                        |        |              |       |
| T3: Change issue status                         |                                    |                   |                        |        |              |       |
| T4: Recover from missing title validation error |                                    |                   |                        |        |              |       |
| T5: Complete issue creation using keyboard only |                                    |                   |                        |        |              |       |

---

## 3. Accessibility review

### Method

Accessibility will be evaluated against a focused subset of WCAG 2.2 Level AA criteria. This does not claim full WCAG conformance; instead, it checks criteria that are directly relevant to the prototype’s form, issue list, status display and navigation.

Tools and methods:

- axe DevTools browser extension for automated checks
- browser developer tools for contrast checking
- manual keyboard-only navigation
- VoiceOver on macOS for a small screen-reader spot check of the issue form and issue list
- manual review of labels, focus states and error messages

### Criteria checked

| WCAG criterion | Description                                                          | Tested by            |
| -------------- | -------------------------------------------------------------------- | -------------------- |
| 1.4.1          | Use of colour: information must not be conveyed by colour alone      | Manual review        |
| 1.4.3          | Contrast minimum: body text should meet 4.5:1 contrast ratio         | DevTools / axe       |
| 2.1.1          | Keyboard operable: main controls can be reached and used by keyboard | Manual keyboard test |
| 2.4.7          | Focus visible: keyboard focus is clearly visible                     | Manual keyboard test |
| 3.3.1          | Error identification: input errors are clearly identified            | Manual form test     |
| 3.3.3          | Error suggestion: users are told how to correct input errors         | Manual form test     |

### Findings

_To be completed after the main frontend views are implemented._

| Criterion | Page / feature | Result | Issue found, if any | Fix / action | Evidence location |
| --------- | -------------- | ------ | ------------------- | ------------ | ----------------- |
| 1.4.1     |                |        |                     |              |                   |
| 1.4.3     |                |        |                     |              |                   |
| 2.1.1     |                |        |                     |              |                   |
| 2.4.7     |                |        |                     |              |                   |
| 3.3.1     |                |        |                     |              |                   |
| 3.3.3     |                |        |                     |              |                   |

---

## 4. Security review

### Method

Security will be reviewed using an OWASP-aligned checklist focused on the risks most relevant to a small web application with user input, authentication and database storage.

This is a prototype, not a production deployment, so the review focuses on core development controls rather than full production hardening. Where controls such as HTTPS, rate limiting or full audit logging are not implemented, they will be recorded as limitations or future production requirements.

### Security checklist

| Threat / concern                | Check                                                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQL injection                   | Database access uses parameterised SQL statements rather than string concatenation                                                                       |
| Cross-site scripting            | React’s default escaping is preserved; no unnecessary use of `dangerouslySetInnerHTML`                                                                   |
| Weak authentication             | Passwords are hashed with bcrypt before storage; login errors are generic where practical                                                                |
| Input tampering                 | Zod schemas validate allowed fields and enum values on the server                                                                                        |
| Mass assignment                 | Request schemas explicitly list permitted input fields                                                                                                   |
| Sensitive data exposure         | Password hashes are never returned in API responses; tokens and secrets are not logged                                                                   |
| Secret/configuration management | Secrets are loaded from environment variables rather than hard-coded                                                                                     |
| CORS / local development access | CORS is limited to the local frontend during development                                                                                                 |
| Production hardening            | HTTPS, rate limiting, stronger password rules and audit logging are identified as future production requirements if the prototype were developed further |

### Findings

_To be completed after the relevant API and authentication features are implemented._

| Check                                     | Status | Evidence location | Remediation / limitation |
| ----------------------------------------- | ------ | ----------------- | ------------------------ |
| Parameterised SQL                         |        |                   |                          |
| React escaping preserved                  |        |                   |                          |
| bcrypt password hashing                   |        |                   |                          |
| Zod server-side validation                |        |                   |                          |
| Password hashes not returned              |        |                   |                          |
| Environment variables used for secrets    |        |                   |                          |
| CORS limited to local frontend            |        |                   |                          |
| Production hardening limitations recorded |        |                   |                          |

---

## 5. Linking evaluation back to requirements

The evaluation activities above map directly to the requirements in TMA02 Section 4.1.

| Requirement                     | Evaluation activity                                                       |
| ------------------------------- | ------------------------------------------------------------------------- |
| FR1: Create issue               | Functional integration test; usability task T1                            |
| FR2: View issue list            | Functional integration test; usability task T2                            |
| FR3: Edit issue details         | Functional integration test; issue detail/edit walkthrough                |
| FR4: Update issue status        | Functional integration test; usability task T3                            |
| FR5: Authenticated access       | Authentication tests; security review                                     |
| NFR1: Understandable interface  | Heuristic walkthrough; participant/cognitive walkthrough tasks T1–T4      |
| NFR2: Server-side validation    | Validation tests; usability task T4                                       |
| NFR3: Accessibility             | Accessibility review; keyboard task T5                                    |
| NFR4: Maintainable/modular code | Code review; repository structure; route/module separation; test coverage |

---

## 6. Defining success

A successful evaluation outcome is one that gives an honest answer to the central question:

**Does this prototype make it easier to record, find and update issues than the informal alternatives it aims to replace?**

The prototype will be considered successful if, by the end of the evaluation phase:

- every Must-have functional requirement has at least one passing functional or integration test
- most evaluation participants, or both cognitive walkthrough personas if participants are unavailable, complete tasks T1–T4 without major assistance
- no catastrophic-severity heuristic violations remain unresolved
- no unresolved issues remain against the selected WCAG 2.2 AA criteria checked in this project
- no high-severity issues remain from the OWASP-aligned security review

Where any of these are not met, the EMA will discuss the limitation honestly and explain what changes would be needed. The purpose of the evaluation is not to prove that the prototype is perfect, but to assess how well it addresses the original issue-reporting problem and to identify justified improvements.
