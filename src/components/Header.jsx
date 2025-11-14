import { useEffect, useState } from "react";
import "@/styles/components/header.css";
import Avatar from "@/components/ui/Avatar";
import { TitleText } from "./ui/Title";
import { EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { getCurrentUser } from "@/helpers";

const duration = 5; // minutes

const Header = () => {
  const [user, setUser] = useState(null);
  

  const fetchUser = async () => {
    const res = await getCurrentUser();
    if (res.status === 200) {
      const temp = res.data.content;
      setUser(temp);
      localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(temp));
    } else {
      localStorage.removeItem(LOCALSTORAGE_KEYS.currentUser);
      setUser(null);
    }
    window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
  }

  useEffect(() => {
    const initialUser = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
    setUser(initialUser || null);

    fetchUser();

    const intervalId = setInterval(fetchUser, 1000 * 60 * duration);
    return () => clearInterval(intervalId);
}, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <TitleText />
        </div>

        <nav className="header-nav">
          <ul className="header-menu">
            <li>
              <Link to={NAVIGATION_PAGES.post.feed} viewTransition>
                <Button variant="secondary">
                  Discover
                </Button>
              </Link>
            </li>
            {!user ? (
              <li>
                <Link to={NAVIGATION_PAGES.auth.login} viewTransition>
                  <Button>
                    Login
                  </Button>
                </Link>
              </li>
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
