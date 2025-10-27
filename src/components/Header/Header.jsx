import { useEffect, useState } from "react";
import "./header.css";
import Avatar from "../ui/Avatar/Avatar";
import { TitleText } from "../ui/Title/Title";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const u = JSON.parse(localStorage.getItem("topicalbird_current_user"));
      const authPaths = ["/auth", "/auth/login", "/auth/register"];
      if (u && authPaths.includes(window.location.pathname)) {
        window.location = "/";
      }
      
      setUser(u || null);
    };
    checkAuth();
  }, []);


  return (
    <header className="header">
      <div className="header-left">
        <TitleText />
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
