/* updated header.jsx */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../topicalbirdconfig";
import getCookies from "../../helpers/getCookies";
import "./header.css";
import Avatar from "../ui/Avatar/Avatar";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const cookie = getCookies(".AspNetCore.Identity.Application");
      if (cookie) {
        const match = ["/auth"];
        if (match.includes(window.location.pathname)) {
          window.location = "/";
        }
      }
      try {
        const options = {
          method: "GET",
          url: `${API_BASE_URL}/api/Users/me`,
          withCredentials: true,
        };
        const { data } = await axios.request(options);
        if (data?.content) {
          setUser(data.content);
          const authPaths = ["/auth", "/auth/login", "/auth/register"];
          if (authPaths.includes(window.location.pathname)) {
            window.location.href = "/";
          }
        }
      } catch (err) {
        console.error(err?.response?.data || err);
        setUser(null);
        localStorage.removeItem("topicalbird_current_user");
      }
    };
    checkAuth();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="header-logo">
          <img src="/icon_white.svg" alt="Topicalbird Icon" className="header-icon" />
          <h1 className="wave-text">{
              "TOPICALBIRD".split("").map((c, i) => (<span key={i}>{c}</span>))
            }</h1>
        </a>
      </div>
      <nav className="header-nav">
        <ul className="header-menu">
          <li><a href="/nests">Discover</a></li>
          {!user ? (
            <li><a href="/auth/login">Login</a></li>
          ) : (
            <li><Avatar user={user} /></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
