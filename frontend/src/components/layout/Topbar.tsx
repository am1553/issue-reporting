import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import type { Page } from "../../App";

interface TopbarProps {
  page: Page;
  isSignedIn: boolean;
  onCreateIssue: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Topbar({
  page,
  isSignedIn,
  onCreateIssue,
  onSignIn,
  onSignOut,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <h1>{page === "dashboard" ? "Dashboard" : "Issues"}</h1>
      </div>

      <div className="topbar-actions">
        {isSignedIn && (
          <button
            type="button"
            className="primary-button"
            onClick={onCreateIssue}
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" aria-hidden="true" />
            New issue
          </button>
        )}

        {isSignedIn ? (
          <button
            type="button"
            className="secondary-button"
            onClick={onSignOut}
          >
            <LogoutOutlinedIcon fontSize="small" aria-hidden="true" />
            Sign out
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={onSignIn}>
            <LoginOutlinedIcon fontSize="small" aria-hidden="true" />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
