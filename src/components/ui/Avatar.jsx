import { 
  API_BASE_URL,
  API_DEFAULT_IMAGES,
  EVENT_LISTENER_KEYS,
  LOCALSTORAGE_KEYS,
  NAVIGATION_PAGES
} from "@/config";

import { 
  Dropdown, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator, 
  DropdownTrigger 
} from "../Dropdown";

import { Check, LogOut, Settings2, TriangleAlert, User } from "lucide-react";

import { logOutUser } from "@/helpers";
import "@/styles/components/ui/avatar.css"

import { useSnackbar } from "@/hooks/useSnackbar";
import { usePopup } from "@/hooks/usePopup";
import { useNavigate } from "react-router-dom";

const Avatar = ({ user }) => {
  const navigate = useNavigate();


  const { showSnackbar } = useSnackbar();
  const { triggerPopup } = usePopup();


  if (!user) return null;
  const defaultIcon = API_DEFAULT_IMAGES.userPicture.image;
  const icon = user.icon ? API_BASE_URL + user.icon : defaultIcon;
  const alt = icon === defaultIcon ? API_DEFAULT_IMAGES.userPicture.alt : `${user.handle}'s avatar`

  const logout = async () => {
    const res = await logOutUser();
    if (res.status === 200) {
      localStorage.removeItem(LOCALSTORAGE_KEYS.currentUser);
      window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
      showSnackbar({
        content: "Logged out!",
        type: "success",
        icon: Check,
      });
      return;
    } else {
      console.error(res);
      showSnackbar({
        content: "Something went wrong while trying to log out.",
        icon: <TriangleAlert />,
        type: "danger",
      });
    }
  };

  const showLogoutPopup = () => {
    triggerPopup({
      title: 'Confirmation',
      description: 'Are you sure you want to logout?',
      primaryActionLabel: 'Yes',
      primaryAction: () => logout(),
      secondaryActionLabel: 'No',
      secondaryAction: null,
      footer: <span></span>,
    });
  }

  const items = [
    { 
      label: "Profile",
      href: NAVIGATION_PAGES.users.username(user.handle),
      icon: <User color="var(--accent-color)" />
    },
    {
      label: "Settings",
      href: NAVIGATION_PAGES.auth.account, 
      icon: <Settings2 color="var(--accent-color)" /> 
    }
  ]

  return (
    <div className="avatar-container">
      <Dropdown>
        <DropdownTrigger variant="unstyled">
          <img
            src={icon}
            alt={alt}
            className="avatar-image"
          />
        </DropdownTrigger>
        <DropdownContent>
          {
            items.map(({ href, label, icon }, index) => (
              <DropdownItem
                key={index}
                onClick={() => navigate(href, { viewTransition: true})}
              >{icon} {label}</DropdownItem>
            ))
          }
          <DropdownSeparator />
          <DropdownItem onClick={() => showLogoutPopup()}><LogOut color="var(--accent-color)" />Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export default Avatar;
