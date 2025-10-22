import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../topicalbirdconfig";
import getCookies from "../helpers/getCookies";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {

      // check if cookie exists
      const cookie = getCookies(".AspNetCore.Identity.Application");
      if (cookie) {
        const currentLoc = window.location.href;
        const match = "/auth*"
        if (match) {
          window.location = "/";
        }
      }

      try {

        const options = {
          method: "GET",
          url: `${API_BASE_URL}/api/Users/me`,
          withCredentials: true,
        }
        const { data } = await axios.request(options);
        if (data?.content) {
          setUser(data.content);

          // Redirect if on auth pages
          const authPaths = ["/auth", "/auth/login", "/auth/register"];
          if (authPaths.includes(window.location.pathname)) {
            window.location.href = "/";
          }
        }
      } catch (err) {
        console.error(err?.response?.data || err);
        setUser(null); // Treat as logged out
        localStorage.removeItem("topicalbird_current_user");
      }
    };

    checkAuth();
  }, []);

  const renderAvatar = () => {
    if (!user) return null;
    if (user.icon) {
      return <img src={API_BASE_URL + user.icon} alt={user.handle} style={{ width: 32, height: 32, borderRadius: "50%" }} />;
    } else if (user.handle) {
      // Use initials
      const initials = user.handle
        .split(/[\s_]/)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
      return (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "var(--accent-color)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "0.875rem",
          }}
        >
          {initials}
        </div>
      );
    }
    return null;
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "1rem 2rem",
        backgroundColor: "var(--color-slate-900)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <a href="/">
          <a href="/" className="header__logo">
            <img src="/icon_white.svg" alt="Topicalbird Icon" />
            <span
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "var(--text-color)",
              }}
            >TOPICALBIRD</span>
          </a>


        </a>
      </div>

      <nav>
        <ul style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <li>
            <a href="/nests">Discover</a>
          </li>

          {!user ? (
            <li>
              <a
                href="/auth/login"
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--accent-color)",
                  borderRadius: "0.5rem",
                  color: "var(--accent-color)",
                  fontWeight: "600",
                }}
              >
                Login
              </a>
            </li>
          ) : (
            <li>
              <a
                href="/me"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--accent-color)",
                  borderRadius: "0.5rem",
                  color: "var(--accent-color)",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                {renderAvatar()}
                {user.DisplayName || user.handle || "Me"}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
