import { useEffect, useRef, useState } from "react";
import { getCurrentUser, changePassword, updateUser } from "@/helpers/api";
import Snackbar, { showSnackbar } from "@/components/Snackbar";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Button from "@components/ui/Button";
import {
  API_BASE_URL,
  API_DEFAULT_IMAGES,
  LOCALSTORAGE_KEYS,
  NAVIGATION_PAGES,
} from "@/config";

import "./AccountPage.css";
import IconPreview from "@components/Icon/IconPreview";
import InputLabel from "@/components/ui/BoxLabel/Label";
import InputBox from "@/components/ui/InputBox/Input";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [user, setUser] = useState(null);
  const [iconPath, setIconPath] = useState(API_DEFAULT_IMAGES.userPicture.image);
  const [displayName, setDisplayName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [disablePasswordButton, setDisablePasswordButton] = useState(true);

  const fileRef = useRef(0);

  useEffect(() => {
    const currentUserStr = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    if (!currentUser) {
      window.location.href = NAVIGATION_PAGES.auth.login;
      return;
    }

    setUser(currentUser);
    setIconPath(`${API_BASE_URL}/${currentUser.icon}`);
    setDisplayName(currentUser.displayName);
    setLoading(false);
  }, []);

  useEffect(() => {
    const val = !(
      oldPassword.length > 0
      && newPassword.length > 0
      && confPassword.length > 0
    );
    setDisablePasswordButton(val);
  }, [oldPassword, newPassword, confPassword]);

  const updateProfile = async () => {
    setLoadingProfile(true);
    try {
      const icon = (fileRef.current && fileRef.current.files.length > 0) ? fileRef.current.files[0] : null;
      if ((!icon && !displayName) || displayName === user.displayName) return;
      const res = await updateUser(user.id, displayName, icon);
      if (res.status === 200) {
        showSnackbar({
          content: "Success! Reloading...",
          icon: CheckCircle,
          type: "success",
          duration: 3,
        });
        refreshAccount();
        return;
      }

      let message = `An error occurred:\n${res.data.message ?? res.data.title}`;
      console.error(res);
      if (res.data.referenceCode) { message += `\nReference Code: ${res.data.referenceCode}` }
      showSnackbar({
        content: message,
        icon: AlertTriangle,
        type: "danger",
        duration: 10,
      });
      return;
    }
    finally {
      setLoadingProfile(false);
    }
  };

  const refreshAccount = async () => {

    const res = await getCurrentUser();
    if (res.status === 200) {
      const updatedUser = res.data.content;
      localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(updatedUser));
      window.location.reload();
      return;
    }

    window.location.href = NAVIGATION_PAGES.auth.login;
  };

  const updatePassword = async () => {
    setLoadingPassword(true);
    try {
      if (newPassword !== confPassword) {
        showSnackbar({
          content: "Passwords do not match.",
          icon: AlertTriangle,
          type: "danger",
          duration: 3,
        });
        return;
      }

      const res = await changePassword(oldPassword, newPassword, confPassword);
      if (res.status === 200) {
        showSnackbar({
          content: "Password changed!",
          icon: CheckCircle,
          type: "success",
          duration: 5,
        });

        setOldPassword("");
        setNewPassword("");
        setConfPassword("");
        return;
      }
      
      console.error(res);
      let message = `An error occurred:\n${res.data.message ?? res.data.title}`;
      if (res.data.referenceCode) { message += `\nReference Code: ${res.data.referenceCode}` }
      showSnackbar({
        content: message,
        icon: AlertTriangle,
        type: "danger",
        duration: 10,
      });
      return;

    } finally {
      setLoadingPassword(false);
    }

  }

  return (
    <div className="account-page">
      <div className="form-container">
        <h2 className="account-title">Account Settings</h2>
        <IconPreview size={256} inputRef={fileRef} defaultImage={iconPath} disabled={loadingPassword} />
        <div className="form-group">
          <InputLabel for="displayName">Display Name</InputLabel>
          <InputBox disabled={loadingProfile} onChange={e => setDisplayName(e.target.value)} id="displayName" placeholder="New display name"></InputBox>
        </div>
        <Button disabled={loadingProfile} onClick={updateProfile}>{loading ? "Loading..." : "Update Profile"}</Button>
      </div>


      <div className="form-container">
        <h2 className="account-title">Change Password</h2>
        <div className="form-group">
          <InputLabel for="current">Current password</InputLabel>
          <InputBox disabled={loadingPassword} onChange={e => setOldPassword(e.target.value)} type="password" id="current" placeholder="Enter current password..."></InputBox>
        </div>
        <div className="form-group">
          <InputLabel 
            for="newPass"
            helperText="Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
            >New password</InputLabel>
          <InputBox
            disabled={loadingPassword}
            onChange={e => setNewPassword(e.target.value)}
            type="password"
            id="newPass"
            placeholder="Enter new password..." />
        </div>
        <div className="form-group">
          <InputLabel for="newPass2">Confirm new password</InputLabel>
          <InputBox disabled={loadingPassword} onChange={e => setConfPassword(e.target.value)} type="password" id="newPass2" placeholder="Enter new password..."></InputBox>
        </div>
        <Button disabled={disablePasswordButton || loadingPassword} onClick={updatePassword}>{loadingPassword ? "Loading..." : "Update Password"}</Button>
      </div>
      <Snackbar />
    </div>
  );
};

export default AccountPage;
