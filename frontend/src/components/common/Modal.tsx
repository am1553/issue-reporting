import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  wide?: boolean;
  onClose: () => void;
}

export function Modal({ title, children, wide = false, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className={wide ? "modal-panel modal-wide" : "modal-panel"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close modal"
            onClick={onClose}
          >
            <CloseRoundedIcon fontSize="small" aria-hidden="true" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
