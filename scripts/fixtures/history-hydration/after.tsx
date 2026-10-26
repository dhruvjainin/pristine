import { useState } from "react";

export function SiteShell({ path, children }) {
  const [entry, setEntry] = useState({ path, takeover: false });
  if (entry.path !== path) {
    setEntry({
      path,
      takeover: entry.path === "/" && path === "/try" &&
        window.history.state?.tryFromHome === true,
    });
  }
  return entry.takeover ? <div><div><div>{children}</div></div></div> : children;
}
