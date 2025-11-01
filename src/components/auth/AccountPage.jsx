import { useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/api/users";

import Button from "../ui/Button/Button";

import {
  API_BASE_URL,
  API_DEFAULT_IMAGES,
  ACCEPTABLE_FILE_FORMATS_JOINED,
  LOCALSTORAGE_KEYS, 
  NAVIGATION_PAGES} from "../../../config";


const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(fetch(API_DEFAULT_IMAGES.userPicture.image).then(r => URL.createObjectURL(r.blob)));

  const [displayName, setDisplayName] = useState("Topicalbird user");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser));
    if (!currentUser) {
      window.location.href = NAVIGATION_PAGES.auth.login;
      return;
    }

    setUser(currentUser);
    setPreview(URL.createObjectURL(API_BASE_URL + currentUser.icon));
    setDisplayName(currentUser.displayName);
    setLoading(false);

  }, []);

  const refreshAccount = async () => {
    setLoading(true);
    try {
      const res = await getCurrentUser();
      if (res.status === 200) {
        setUser(res.data.content);
      } else {
        window.location.href = NAVIGATION_PAGES.auth.login;
      }
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
    <h2>Account settings</h2>
      <h6><a onClick={refreshAccount}>Refresh Account</a></h6>
      <div>
        
        <h3>Update Profile Picture</h3>
        <img src={API_BASE_URL + image} alt={user.displayName + "'s profile picture"} width="250" height="250" />
        <input type="file" accept={ACCEPTABLE_FILE_FORMATS_JOINED} />

        <h3>Update display name</h3>

        <Button type="submit">Save</Button> <Button variant="danger" >Clear</Button>
      </div>
      <div>
      </div>
    </>
  )
}


export default AccountPage;
