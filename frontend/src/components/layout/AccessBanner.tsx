import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export function AccessBanner() {
  return (
    <section className="access-banner" aria-label="Read-only mode">
      <InfoOutlinedIcon fontSize="small" aria-hidden="true" />
      <div>
        <strong>Read-only mode</strong>
        <p>
          You can view and filter issues. Sign in from the top-right to create,
          edit, update status, assign or resolve issues.
        </p>
      </div>
    </section>
  );
}
