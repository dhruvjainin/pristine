export function SiteShell({ path, children }) {
  const tryPath = path === "/try";
  const takeover = tryPath && typeof window !== 'undefined' && window.history.state?.tryFromHome === true;
  return takeover ? <div><div><div>{children}</div></div></div> : children;
}
