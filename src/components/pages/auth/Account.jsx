import IconPreview from '@/components/IconPreview';
import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Loader from '@/components/ui/Loader';
import { API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { changePassword, updateUser } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import { getGreeting } from '@/helpers/greetingHelper';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Check, TriangleAlert } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@/styles/pages/account.css";

const Account = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser)));
  const [greeting, setGreeting] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [display, setDisplay] = useState("");
  const inputRef = useRef(null);


  useEffect(() => {
    if (!user) navigate(NAVIGATION_PAGES.auth.login, { viewTransition: true });
    setGreeting(getGreeting(user.displayName || user.handle))
  }, [navigate, user]);

  const handleProfileFormChange = async (event) => {
    try {
      event.preventDefault();
      setProfileLoading(true);

      const hasIcon = inputRef.current && inputRef.current.files.length > 0;
      let icon = null;
      if (hasIcon) icon = inputRef.current.files[0];

      if (!display && !icon) {
        showSnackbar({
          content: "Please fill all fields.",
          type: "danger",
          icon: TriangleAlert
        });
        return;
      }

      const res = await updateUser(user.id, display, icon);
      if (res.status === 200) {
        localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(res.data.content));
        setUser(res.data.content);
        window.dispatchEvent(new Event(EVENT_LISTENER_KEYS.currentUser));
        showSnackbar({
          content: "User updated!",
          type: "success",
          icon: Check
        });
        return;
      }

      const msg = formatErrorMessage(res);
      showSnackbar({
        content: msg,
        type: "danger",
        icon: TriangleAlert,
        duration: 5,
      });

    } finally {
      setProfileLoading(false);
    }
  }

  const handlePasswordFormChange = async (event) => {
    try {
      event.preventDefault();
      setPassLoading(true);

      if (!password || !newPassword || !newPassword2) {
        showSnackbar({
          content: "Please fill all fields.",
          type: "danger",
          icon: TriangleAlert
        });
        return;
      }

      const res = await changePassword(password, newPassword, newPassword2);
      if (res.status === 200) {
        showSnackbar({
          content: "Password changed!",
          type: "success",
          icon: Check
        });
        return;
      }

      const msg = formatErrorMessage(res);
      showSnackbar({
        content: msg,
        type: "danger",
        icon: TriangleAlert,
        duration: 5,
      });

    } finally {
      setPassLoading(false);
    }
  }

  return (
    <>
      <h3>{greeting}</h3>
      <div className="account-container">
        <form className="account-form" onSubmit={handleProfileFormChange}>
          <h6>Update Profile</h6>
          <div className="account-form-preview">
            <IconPreview defaultImage={API_URL_FROM_CONTENT_URL(user.icon)} inputRef={inputRef} />
          </div>
          <div className="account-form-group">
            <Label htmlFor="displayName">Name</Label>
            <InputBox onChange={e => setDisplay(e.target.value)} id="displayName" name="displayName" placeholder='What should we call you?' />
          </div>
          <Button type="submit" disabled={profileLoading}>
            {profileLoading ? <Loader /> : "Update Profile"}
          </Button>
        </form>

        <form className="account-form" onSubmit={handlePasswordFormChange}>
          <h6>Change Password</h6>
          <div className="account-form-group">
            <Label htmlFor="oldPass">Current Password</Label>
            <InputBox required onChange={e => setPassword(e.target.value)} id="oldPass" name="oldPass" type="password" placeholder='Your current password...' />
          </div>
          <div className="account-form-group">
            <Label htmlFor="newPass">New Password</Label>
            <InputBox required onChange={e => setNewPassword(e.target.value)} id="newPass" name="newPass1" type="password" placeholder='Your new password...' />
          </div>
          <div className="account-form-group">
            <Label htmlFor="newPass2">Repeat Password</Label>
            <InputBox required onChange={e => setNewPassword2(e.target.value)} id="newPass2" name="newPass2" type="password" placeholder='Re-enter your new password...' />
          </div>
          <Button type="submit" disabled={passLoading}>
            {passLoading ? <Loader /> : "Change Password"}
          </Button>
          <Button type="reset" variant='outlined'>Reset</Button>
        </form>
      </div>
    </>);

};

export default Account;
