import { type FormEvent, useState } from "react";

interface LoginFormProps {
  isPending: boolean;
  onSubmit: (input: { email: string; password: string }) => void;
}

export function LoginForm({ isPending, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("admin@example.org");
  const [password, setPassword] = useState("password");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <p className="state-text">
        Sign in to create issues, edit details, assign responsibility, update
        status and resolve issues.
      </p>

      <div className="field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="primary-button" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
