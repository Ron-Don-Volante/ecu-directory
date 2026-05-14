/* ── Shared ── */
.card {
  border-radius: var(--radius-lg);
  margin-bottom: 8px;
  transition: border-color 0.15s;
}

.card-name     { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.card-name-sm  { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.card-loc      { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 4px; margin-bottom: 8px; }
.card-loc-sm   { margin-bottom: 5px; }
.card-bio      { font-size: 12px; color: var(--muted); line-height: 1.55; margin-bottom: 10px; }
.loc-pin       { font-size: 11px; color: var(--muted2); }

.tag-row { display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 5px; }
.tag {
  font-family: var(--mono);
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  border: 1px solid var(--border2);
  color: var(--muted);
}
.tag-accent { border-color: rgba(184,255,79,0.3); color: var(--accent); }

.badge {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 2px 7px;
  border-radius: 3px;
  display: inline-block;
  margin-bottom: 5px;
}
.badge-featured { background: rgba(184,255,79,0.12); color: var(--accent); }
.badge-standard { background: rgba(91,156,246,0.1);  color: var(--blue); }

.dist-pill {
  font-family: var(--mono);
  font-size: 10px;
  background: rgba(184,255,79,0.1);
  color: var(--accent);
  padding: 1px 6px;
  border-radius: 3px;
  margin-left: 6px;
}
.state-match-pill {
  font-family: var(--mono);
  font-size: 9px;
  background: rgba(91,156,246,0.08);
  color: var(--blue);
  padding: 1px 6px;
  border-radius: 3px;
  margin-left: 5px;
}

.btn {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  display: inline-block;
  transition: opacity 0.15s;
}
.btn:hover { opacity: 0.8; }
.btn-primary { background: var(--accent); color: #0c0d10; }
.btn-ghost   { background: transparent; color: var(--muted); border: 1px solid var(--border2); }
.btn-sm      { font-size: 10px; padding: 4px 10px; }

/* ── Featured ── */
.card-featured {
  background: var(--bg2);
  border: 1px solid rgba(184,255,79,0.22);
  padding: 1.1rem 1.25rem;
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 12px;
  align-items: start;
}
.card-featured:hover { border-color: rgba(184,255,79,0.4); }

.card-featured-left { padding-top: 2px; }
.shop-initials {
  width: 44px; height: 44px;
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono);
  font-size: 12px; font-weight: 600;
  color: var(--accent);
}
.card-featured-body  { min-width: 0; }
.card-featured-actions {
  display: flex; flex-direction: column; gap: 6px; align-items: flex-end;
  padding-top: 2px;
}

/* ── Standard ── */
.card-standard {
  background: var(--bg2);
  border: 1px solid var(--border);
  padding: 0.9rem 1rem;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  gap: 10px;
  align-items: start;
}
.card-standard:hover { border-color: var(--border2); }
.card-standard .shop-initials {
  width: 34px; height: 34px;
  font-size: 10px;
  color: var(--muted);
  border-color: var(--border);
}
.card-standard-body   { min-width: 0; }
.card-standard-actions {
  display: flex; flex-direction: column; gap: 5px; align-items: flex-end;
  padding-top: 2px;
}

/* ── Free ── */
.card-free {
  background: var(--bg2);
  border: 1px solid var(--border);
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}
.card-free:hover { border-color: var(--border2); }

.free-init {
  width: 28px; height: 28px;
  background: var(--bg3);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono);
  font-size: 10px; font-weight: 600;
  color: var(--muted2);
  flex-shrink: 0;
}
.card-free-body { flex: 1; min-width: 0; }
.free-state { font-family: var(--mono); font-size: 11px; color: var(--muted2); margin-top: 1px; }

.nudge { margin-left: auto; display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.nudge-text { font-family: var(--mono); font-size: 10px; color: var(--muted2); }
.nudge-btn {
  font-family: var(--mono);
  font-size: 10px; font-weight: 600;
  color: #0c0d10;
  background: var(--accent);
  padding: 3px 8px;
  border-radius: 3px;
  opacity: 0.82;
  transition: opacity 0.15s;
}
.nudge-btn:hover { opacity: 1; }
