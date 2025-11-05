import { useEffect, useState } from "react";
import "@/styles/components/header.css";
import Avatar from "@/components/ui/Avatar";
import { TitleText } from "./ui/Title";
import { EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
    setUser(u || null);
  }, []);

  useEffect(() => {
  const handleChange = () => {
    setUser(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser)));
  };

  window.addEventListener(EVENT_LISTENER_KEYS.currentUser, handleChange);
  return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, handleChange);
}, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <TitleText />
        </div>

        <nav className="header-nav">
          <ul className="header-menu">
            <li><Link to={NAVIGATION_PAGES.post.feed} viewTransition>Discover</Link></li>
            {!user ? (
              <li><Link to={NAVIGATION_PAGES.auth.login} viewTransition>Login</Link></li>
            ) : (
              <li><Avatar user={user} /></li>
            )}
          </ul>
        </nav>

        {/* Mobile Avatar only */}
        <div className="header-avatar-mobile">
          {user ? <Avatar user={user} /> : <Link to={NAVIGATION_PAGES.auth.login} viewTransition>Login</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
