import { useEffect, useState } from "react";
import "@/styles/components/header.css";
import Avatar from "@/components/ui/Avatar";
import { TitleText } from "./ui/Title";
import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
    setUser(u || null);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Menu className="header-icon" size={24} />
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
