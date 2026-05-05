# 002 — JWT over server-side sessions

**Status:** Accepted  
**Date:** Week 8 of TM470, during architecture and authentication design  
**Decision-maker:** Aryan Mehta

## Context

The Issue Reporting System includes authenticated access as part of the planned prototype scope. Once a user signs in, the backend needs a way to identify that user on later requests and protect routes that create, edit or update issues.

Two common authentication state patterns were considered:

1. **Server-side sessions** — the server stores session state in memory, a database or a session store. The client receives an opaque session ID, usually stored in a cookie. Each request sends the cookie, and the server looks up the session to identify the user.

2. **JSON Web Tokens (JWTs)** — the server signs a token containing a small set of claims, such as a user identifier and expiry time. The client sends the token with later requests, and the server verifies the signature before allowing access.

## Decision

JWT-based authentication has been chosen for the prototype.

The planned implementation uses signed JWT access tokens, with the secret stored in an environment variable rather than committed to the repository. The token payload will contain only the minimum information needed by the backend, such as the user identifier and expiry time.

## Rationale

JWTs were chosen because they fit the prototype’s architecture and reduce infrastructure complexity.

First, the backend is designed as a small REST-style API. JWTs support this because authenticated requests can include the token with the request, allowing the backend to verify identity without storing session state. This fits the client-server design described in the TMA02 report.

Second, server-side sessions would require additional state management. A simple in-memory session store would be fragile because sessions would be lost when the server restarts. A stronger solution, such as Redis or database-backed sessions, would add infrastructure complexity that is not necessary for the current lightweight prototype.

Third, JWTs provide useful learning value for the Software Development route. Implementing token creation, verification, expiry handling and protected middleware is a transferable full-stack skill. This makes JWTs suitable for a project that aims to extend my existing frontend experience into backend API design and security-aware development.

JWTs are not automatically more secure than sessions. The decision is therefore not based on JWT being “better” in all cases, but on it being proportionate to this prototype’s architecture and learning goals.

## Consequences

### Positive consequences

- No separate session store is required.
- The backend can remain mostly stateless between requests.
- Protected routes can be implemented through reusable authentication middleware.
- The approach fits a REST-style API consumed by a React frontend.
- The implementation provides useful evidence of authentication and access-control design.

### Negative consequences

- Token revocation is harder than with server-side sessions. A signed access token remains valid until it expires unless additional blocklist logic is added.
- Client-side token storage requires care. Storing tokens in `localStorage` can increase XSS risk, while cookie-based storage needs careful CSRF protection.
- JWT misuse is common, so the implementation must be deliberately limited and documented.
- A production version would need stronger controls than the prototype, including HTTPS, rate limiting, secure cookie settings or a reviewed token storage strategy.

## Planned implementation notes

The intended implementation is:

- library: `jsonwebtoken` or an equivalent maintained JWT library
- algorithm: `HS256` for a single-backend prototype
- secret: `JWT_SECRET` stored in an environment variable
- payload: minimal claims only, for example `{ userId, iat, exp }`
- access token lifetime: short-lived, to reduce risk if a token is exposed
- protected routes: middleware verifies the token before allowing issue creation, editing or status updates
- password storage: passwords stored as bcrypt hashes, never plaintext

The prototype will not store personal information in the token payload. Values such as email address, username or role will only be included if required, and even then only after considering data minimisation.

## Security posture

The authentication approach is informed by OWASP guidance. The main controls planned for the prototype are:

- passwords are hashed with bcrypt before storage
- plaintext passwords are never persisted
- JWT secrets are stored in environment variables and not committed to GitHub
- protected routes reject missing, invalid or expired tokens
- login error messages should avoid revealing whether the email address or password was incorrect
- tokens should not be logged by the backend
- password hashes should never be returned in API responses

Some controls are treated as production hardening rather than core TMA02 prototype requirements. These include:

- refresh-token rotation
- token blocklists or immediate logout from all devices
- rate limiting for repeated login attempts
- HTTPS deployment
- more advanced password policy enforcement

These are noted as future improvements if the prototype were developed into a production system.

## Alternatives considered

### Server-side sessions

Server-side sessions were considered because they support easier revocation and are commonly used in web applications. They would be appropriate if the system needed immediate logout across all devices, strong centralised session control, or cookie-based authentication from the start.

They were not chosen for the initial prototype because they require additional session state management. A proper session implementation would either need database-backed sessions or a separate store such as Redis, which would increase setup and implementation complexity.

### No authentication

A prototype without authentication was also considered because it would reduce scope and allow more time for the issue workflow itself. This was rejected because even a lightweight issue-reporting system should demonstrate awareness of access control, especially where issue records may contain organisational information.

However, authentication remains a scoped feature. If implementation time becomes constrained, the project may simplify authentication while still documenting the security limitations honestly.

## Review point

This decision should be reviewed if:

- participant testing shows login is a barrier to usability;
- the project scope is reduced and authentication must be simplified;
- the system is developed beyond prototype stage;
- immediate token revocation becomes a requirement;
- production deployment is considered.

For the current TM470 prototype, JWT-based authentication is an appropriate balance between architectural fit, learning value and implementation complexity.
