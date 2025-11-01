import { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/api/users";
import Button from "../ui/Button/Button";
import {
  API_BASE_URL,
  API_DEFAULT_IMAGES,
  ACCEPTABLE_FILE_FORMATS_JOINED,
  LOCALSTORAGE_KEYS,
  NAVIGATION_PAGES
} from "../../../config";

import "./AccountPage.css";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(API_DEFAULT_IMAGES.userPicture.image);

  useEffect(() => {
    console.log("Running AccountPage useEffect...");
    const currentUserStr = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
    console.log("currentUserStr:", currentUserStr);
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    if (!currentUser) {
      console.warn("No current user found — redirecting");
      window.location.href = NAVIGATION_PAGES.auth.login;
      return;
    }

    console.log("Found current user:", currentUser);
    setUser(currentUser);
    setDisplayName(currentUser.displayName || "Topicalbird user");

    // Construct preview image URL
    const profileImage = currentUser.icon
      ? `${API_BASE_URL}${currentUser.icon}`
      : API_DEFAULT_IMAGES.userPicture.image;
    setPreview(profileImage);

    setLoading(false);
  }, []);

  const refreshAccount = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      if (res.status === 200) {
        const updatedUser = res.data.content;
        setUser(updatedUser);
        setDisplayName(updatedUser.displayName);
        setPreview(`${API_BASE_URL}${updatedUser.icon}`);
        localStorage.setItem(LOCALSTORAGE_KEYS.currentUser, JSON.stringify(updatedUser));
      } else {
        window.location.href = NAVIGATION_PAGES.auth.login;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setDisplayName(user?.displayName || "");
    setImage(null);
    setPreview(user?.icon ? `${API_BASE_URL}${user.icon}` : API_DEFAULT_IMAGES.userPicture.image);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement upload API call for updating displayName & image
    console.log("Saving profile:", { displayName, image });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="account-page">
      <h2>Account Settings</h2>
      <h6>
        <button className="link-button" onClick={refreshAccount}>Refresh Account</button>
      </h6>

      <form className="account-form" onSubmit={handleSave}>
        <div className="profile-section">
          <h3>Update Profile Picture</h3>
          <img
            className="profile-image"
            src={preview}
            alt={`${displayName}'s profile`}
            width="250"
            height="250"
          />
          <input
            type="file"
            accept={ACCEPTABLE_FILE_FORMATS_JOINED}
            onChange={handleImageChange}
          />
        </div>

        <div className="display-name-section">
          <h3>Update Display Name</h3>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="display-name-input"
            placeholder="Enter your display name"
          />
        </div>

        <div className="button-group">
          <Button type="submit">Save</Button>
          <Button variant="danger" type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
