import { useEffect, useState } from "react";
import "./header.css";
import Avatar from "../ui/Avatar/Avatar";
import { TitleText } from "../ui/Title/Title";
import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "../../../config";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const u = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
      const authPaths = [
        NAVIGATION_PAGES.auth.base,
        NAVIGATION_PAGES.auth.login,
        NAVIGATION_PAGES.auth.register,
        NAVIGATION_PAGES.auth.account,
      ];
      if (u && authPaths.includes(window.location.pathname)) {
        window.location = NAVIGATION_PAGES.home;
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
            <li><a href={NAVIGATION_PAGES.auth.login}>Login</a></li>
          ) : (
            <li><Avatar user={user} /></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
