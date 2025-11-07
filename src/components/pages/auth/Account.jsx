import IconPreview from '@/components/IconPreview';
import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Loader from '@/components/ui/Loader';
import { API_DEFAULT_IMAGES, API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { changePassword, updateUser } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import { getGreeting } from '@/helpers/greetingHelper';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Check, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "@/styles/pages/account.css";

import Box from '@/components/layouts/Box';
import Container from '@/components/layouts/Container';
import Card from '@/components/layouts/Card';

const Account = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser)));
  const [greeting, setGreeting] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [iconBlob, setIconBlob] = useState(false);
  const [userIcon, setUserIcon] = useState(API_DEFAULT_IMAGES.userPicture.image);
  

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [display, setDisplay] = useState("");


  useEffect(() => {
    if (!user) {
      navigate(NAVIGATION_PAGES.auth.login, { viewTransition: true });
    };

    setGreeting(getGreeting(user?.displayName ?? user?.handle ?? "Egg"));
    const ico = API_URL_FROM_CONTENT_URL(user?.icon) ?? userIcon;
    setUserIcon(ico);
  }, [navigate, user, userIcon]);

  const handleAvatarChange = (event) => {
    setIconBlob(event.blob);
  }

  const handleProfileFormChange = async (event) => {
    try {
      event.preventDefault();
      setProfileLoading(true);

      if (!display && !iconBlob) {
        showSnackbar({
          content: "Please fill all fields.",
          type: "danger",
          icon: TriangleAlert
        });
        return;
      }

      const res = await updateUser(user.id, display, iconBlob);
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
    <Container>
      <h3>
        {greeting}
      </h3>
  
      <div className="account-container">

        <Card title="Update Profile">
          <form onSubmit={handleProfileFormChange} className="account-form">
            
            <div className="account-form-preview">
              <IconPreview 
                defaultImage={userIcon} 
                onChange={handleAvatarChange} 
              />
            </div>
            
            {/* Input Group */}
            <div className="account-form-group">
              <Label htmlFor="displayName">Display Name</Label>
              <InputBox 
                onChange={e => setDisplay(e.target.value)} 
                id="displayName" 
                name="displayName" 
                placeholder='What should we call you?' 
                value={display} 
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={profileLoading} 
            >
              {profileLoading ? <Loader /> : "Update Profile"}
            </Button>
          </form>
        </Card>

        {/* --- Change Password Card --- */}
        <Card title="Change Password">
          <form onSubmit={handlePasswordFormChange} className="account-form">
            
            {/* Current Password */}
            <div className="account-form-group">
              <Label htmlFor="oldPass">Current Password</Label>
              <InputBox 
                required 
                onChange={e => setPassword(e.target.value)} 
                id="oldPass" 
                name="oldPass" 
                type="password" 
                placeholder='Your current password...' 
                value={password}
              />
            </div>
            
            {/* New Password */}
            <div className="account-form-group">
              <Label htmlFor="newPass">New Password</Label>
              <InputBox 
                required 
                onChange={e => setNewPassword(e.target.value)} 
                id="newPass" 
                name="newPass1" 
                type="password" 
                placeholder='Your new password (min 8 characters)...' 
                value={newPassword}
              />
            </div>
            
            {/* Repeat Password */}
            <div className="account-form-group">
              <Label htmlFor="newPass2">Repeat Password</Label>
              <InputBox 
                required 
                onChange={e => setNewPassword2(e.target.value)} 
                id="newPass2" 
                name="newPass2" 
                type="password" 
                placeholder='Re-enter your new password...' 
                value={newPassword2}
              />
            </div>
            
            <div className="account-form-group">
              <Button 
                type="submit" 
                disabled={passLoading} 
              >
                {passLoading ? <Loader /> : "Change Password"}
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </Container>
  );

};

export default Account;
