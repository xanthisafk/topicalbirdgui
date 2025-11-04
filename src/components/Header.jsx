import { useEffect, useState } from "react";
import "@/styles/components/header.css";
import Avatar from "@/components/ui/Avatar";
import { TitleText } from "./ui/Title";
import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const u = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
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
          <li><Link to={NAVIGATION_PAGES.nests.base} viewTransition>Discover</Link></li>
          {!user ? (
            <li><Link href={NAVIGATION_PAGES.auth.login} viewTransition>Login</Link></li>
          ) : (
            <li><Avatar user={user} /></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
