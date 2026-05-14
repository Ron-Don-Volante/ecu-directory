.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 50px;
}

.nav-logo {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
}

.nav-logo-dot {
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.nav-links {
  display: flex;
  gap: 0;
}

.nav-link {
  font-size: 12px;
  color: var(--muted);
  padding: 4px 12px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
  text-decoration: none;
  height: 50px;
  display: flex;
  align-items: center;
}

.nav-link:hover  { color: var(--text); }
.nav-link.active { color: var(--accent); border-bottom-color: var(--accent); }

.nav-spacer { flex: 1; }

.nav-cta {
  background: var(--accent);
  color: #0c0d10;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 4px;
  letter-spacing: 0.05em;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.15s;
}
.nav-cta:hover { opacity: 0.85; }
