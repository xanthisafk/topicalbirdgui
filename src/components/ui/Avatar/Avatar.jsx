import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../../../topicalbirdconfig";
import "./avatar.css"

import Popup from "../Popup/Popup";
import LogOutPopup from "../../auth/LogoutPopup";

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
  const defaultIcon = API_BASE_URL + "api_path/content/assets/defaults/pp_256.png";
  const icon = user.icon ? API_BASE_URL + user.icon : defaultIcon;

  return (
    <div className="avatar-container" ref={dropdownRef}>
      <img
        src={icon}
        alt={user.handle + "'s avatar"}
        onClick={toggle}
        style={{
          cursor: 'pointer',
          width: width || 32,
          height: height || 32,
          borderRadius: "50%"
        }}
      />
      {(showDropdown && open) && (
        <div className="avatar-dropdown">
          <a className="avatar-dropdown-link" href="/me" style={{ display: 'block', padding: 8 }}>Profile</a>
          <a className="avatar-dropdown-link" href="/account" style={{ display: 'block', padding: 8 }}>Settings</a>
          <span className="avatar-dropdown-link" href="/account" style={{ display: 'block', padding: 8 }} onClick={() => logOutRef.current?.open()}>Logout</span>
          {/* <a className="avatar-dropdown-link" href="/auth/logout" style={{ display: 'block', padding: 8 }}>Logout</a> */}
        </div>
      )}
      <Popup ref={logOutRef}> 
        <LogOutPopup />
      </Popup>
    </div>
  );
};

export default Avatar;
