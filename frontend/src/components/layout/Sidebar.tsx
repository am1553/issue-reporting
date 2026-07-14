import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { Page } from "../../App";

interface SidebarProps {
  page: Page;
  isSignedIn: boolean;
  userRole?: string;
  onPageChange: (page: Page) => void;
}

export function Sidebar({
  page,
  isSignedIn,
  userRole,
  onPageChange,
}: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="brand">
        <div>
          <strong>Issue Reporting</strong>
          <span>TM470 prototype</span>
        </div>
      </div>

      <nav className="nav-list">
        <button
          type="button"
          className={page === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => onPageChange("dashboard")}
        >
          <DashboardOutlinedIcon fontSize="small" aria-hidden="true" />
          Dashboard
        </button>

        <button
          type="button"
          className={page === "issues" ? "nav-item active" : "nav-item"}
          onClick={() => onPageChange("issues")}
        >
          <AssignmentOutlinedIcon fontSize="small" aria-hidden="true" />
          Issues
        </button>
      </nav>

      <div className="sidebar-card">
        <p className="eyebrow">Access</p>
        {isSignedIn ? (
          <p className="icon-line">
            <LockOpenOutlinedIcon fontSize="small" aria-hidden="true" />
            Signed in as <strong>{userRole ?? "user"}</strong>.
          </p>
        ) : (
          <p className="icon-line">
            <VisibilityOutlinedIcon fontSize="small" aria-hidden="true" />
            Read-only mode. Sign in from the top bar to manage issues.
          </p>
        )}
      </div>
    </aside>
  );
}
