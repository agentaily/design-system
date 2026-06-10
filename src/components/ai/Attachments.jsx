import React from "react";

const AX_ATTACH_CSS = `
.ax-attachments { display: flex; gap: 8px; }
.ax-attachments--grid { flex-wrap: wrap; }
.ax-attachments--inline { flex-wrap: wrap; }
.ax-attachments--list { flex-direction: column; }

.ax-attach {
  position: relative; display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
  background: var(--surface-card); transition: border-color var(--dur-1) var(--ease-out);
}
.ax-attach:hover { border-color: var(--border-strong); }

/* grid: thumbnail tile */
.ax-attachments--grid .ax-attach { width: 96px; height: 96px; padding: 0; overflow: hidden; flex-direction: column; gap: 0; }
.ax-attachments--grid .ax-attach__thumb { width: 100%; flex: 1; display: flex; align-items: center; justify-content: center; color: var(--text-faint); background: var(--surface-raised); }
.ax-attachments--grid .ax-attach__thumb img { width: 100%; height: 100%; object-fit: cover; }
.ax-attachments--grid .ax-attach__name { font-size: 10px; padding: 4px 6px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-muted); border-top: 1px solid var(--border-default); }

/* inline: compact badge */
.ax-attachments--inline .ax-attach { padding: 4px 8px 4px 8px; border-radius: var(--radius-1); }
.ax-attachments--inline .ax-attach__name { font-size: var(--text-xs); }

/* list: full row */
.ax-attachments--list .ax-attach { padding: 10px 12px; }
.ax-attachments--list .ax-attach__body { flex: 1; min-width: 0; }
.ax-attachments--list .ax-attach__meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin-top: 1px; }

.ax-attach__icon { flex: none; color: var(--text-faint); display: inline-flex; }
.ax-attach__icon svg { width: 15px; height: 15px; }
.ax-attach__name { color: var(--text-body); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--text-sm); }
.ax-attach__remove {
  appearance: none; background: none; border: none; cursor: pointer; flex: none;
  color: var(--text-faint); font-family: var(--font-mono); font-size: 11px; line-height: 1;
  padding: 3px; border-radius: var(--radius-1);
}
.ax-attach__remove:hover { color: var(--danger); background: var(--danger-dim); }
.ax-attachments--grid .ax-attach__remove { position: absolute; top: 4px; right: 4px; background: var(--bg-overlay); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-attach-css")) {
  const s = document.createElement("style");
  s.id = "ax-attach-css";
  s.textContent = AX_ATTACH_CSS;
  document.head.appendChild(s);
}

const ICONS = {
  image: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path></svg>,
  video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>,
  audio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>,
  document: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path></svg>,
};

function category(file) {
  if (file.category) return file.category;
  const t = file.type || "";
  if (t.startsWith("image")) return "image";
  if (t.startsWith("video")) return "video";
  if (t.startsWith("audio")) return "audio";
  return "document";
}

export function Attachments({ files = [], variant = "list", onRemove, className = "", ...rest }) {
  return (
    <div className={["ax-attachments", "ax-attachments--" + variant, className].filter(Boolean).join(" ")} {...rest}>
      {files.map((file, i) => {
        const cat = category(file);
        const icon = ICONS[cat] || ICONS.document;
        return (
          <div className="ax-attach" key={file.id || i}>
            {variant === "grid" ? (
              <span className="ax-attach__thumb">{file.src ? <img src={file.src} alt={file.name} /> : <span className="ax-attach__icon">{icon}</span>}</span>
            ) : (
              <span className="ax-attach__icon">{icon}</span>
            )}
            {variant === "list" ? (
              <span className="ax-attach__body">
                <span className="ax-attach__name">{file.name}</span>
                {file.type ? <span className="ax-attach__meta">{file.type}{file.size ? " · " + file.size : ""}</span> : null}
              </span>
            ) : (
              <span className="ax-attach__name">{file.name}</span>
            )}
            {onRemove ? <button className="ax-attach__remove" aria-label={"Remove " + file.name} onClick={() => onRemove(file.id ?? i)}>✕</button> : null}
          </div>
        );
      })}
    </div>
  );
}
