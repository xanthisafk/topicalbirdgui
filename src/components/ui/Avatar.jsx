import { useState, useEffect, useRef } from "react";
import { API_BASE_URL, API_DEFAULT_IMAGES, NAVIGATION_PAGES } from "@/config";
import "@styles/components/ui/avatar.css";

import Popup from "./Popup/Popup";
import LogOutPopup from "@components/auth/LogoutPopup";

const Avatar = ({ user, width, height, showDropdown }) => {
  showDropdown = showDropdown || true;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const logOutRef = useRef(null);

  const toggle = () => setOpen(!open);

  // Click away listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!user) return null;
  const defaultIcon = API_DEFAULT_IMAGES.userPicture.image;
  const icon = user.icon ? API_BASE_URL + user.icon : defaultIcon;
  const alt = icon === defaultIcon ? API_DEFAULT_IMAGES.userPicture.alt : `${user.handle}'s avatar`

  return (
    <div className="avatar-container" ref={dropdownRef}>
      <img
        src={icon}
        alt={alt}
        onClick={toggle}
        className="avatar-image"
      />
      {(showDropdown && open) && (
        <div className="avatar-dropdown">
          <a className="avatar-dropdown-link" href={NAVIGATION_PAGES.users.username(user.handle)}>Profile</a>
          <hr />
          <a className="avatar-dropdown-link" href={NAVIGATION_PAGES.auth.account}>Settings</a>
          <hr />
          <a className="avatar-dropdown-link" onClick={() => logOutRef.current?.open()}>Logout</a>
          
        </div>
      )}
      <Popup ref={logOutRef}> 
        <LogOutPopup />
      </Popup>
    </div>
  );
};

export default Avatar;
