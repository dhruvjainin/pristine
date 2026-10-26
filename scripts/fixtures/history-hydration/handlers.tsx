import { useEffect } from "react";

export function Navigation() {
  useEffect(() => {
    const fromHome = typeof window !== "undefined" && window.history.state?.tryFromHome;
    document.title = fromHome ? "Demo" : "Home";
  }, []);
  const navigate = () => {
    const fromHome = typeof window !== "undefined" && window.history.state?.tryFromHome;
    window.history.pushState({ tryFromHome: !fromHome }, "", "/try");
  };
  return <button onClick={navigate}>Open demo</button>;
}
