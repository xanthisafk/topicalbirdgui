import { useEffect, useRef, useState } from "react";
import { getCurrentUser, changePassword, updateUser } from "@/helpers/api";
import Button from "@components/ui/Button";
import {
  API_BASE_URL,
  API_DEFAULT_IMAGES,
  LOCALSTORAGE_KEYS,
  NAVIGATION_PAGES,
} from "@/config";

import "./AccountPage.css";
import IconPreview from "@components/Icon/IconPreview";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [iconPath, setIconPath]  = useState(API_DEFAULT_IMAGES.userPicture.image);
  const [filePath, setFilePath] = useState("idk");
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
    setLoading(false);
  }, []);

  const updateIcon = async () => {
    const icon = (fileRef.current && fileRef.current.files.length > 0) ? fileRef.current.files[0] : null;
    if (!icon) return;
    const res = await updateUser(user.id, user.displayName, icon);
    if (res.status !== 200) {
      console.error({fail: res});
      return;
    }

    console.log({success: res});
    await refreshAccount();
    window.location.reload();
  };

  const refreshAccount = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      if (res.status === 200) {
        const updatedUser = res.data.content;
        setUser(updatedUser);
        setIconPath(`${API_BASE_URL}/${user.icon}`);
        localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(updatedUser));
      } else {
        window.location.href = NAVIGATION_PAGES.auth.login;
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="account-page">
      <h2>Account Settings</h2>
      <IconPreview size={256} inputRef={fileRef} defaultImage={iconPath}/>
      <Button onClick={updateIcon}>Update</Button>
      <form className="account-form">
        <pre>{JSON.stringify(user)}</pre>
        <Button variant="skeleton">HIII</Button>
      </form>
    </div>
  );
};

export default AccountPage;
