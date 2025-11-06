import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../ui/Loader';
import { API_DEFAULT_IMAGES, API_URL_FROM_CONTENT_URL, NAVIGATION_PAGES } from '@/config';
import { getUserbyUsername } from '@/helpers';

const Users = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userIcon, setUserIcon] = useState(API_DEFAULT_IMAGES.userPicture.image);

  useEffect(() => {
    if (!username) {
      navigate(NAVIGATION_PAGES.home, { viewTransition: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await getUserbyUsername(username);
        if (res.status === 200) {
          setUser(res.data.content);
          setUserIcon(API_URL_FROM_CONTENT_URL(res.data.content.icon));
          return;
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate, username]);

  return (
    <>
      {loading ? <div><Loader /><br />Loading {username}'s profile...</div>
        : user === null ? <div>This user doesn't exist!</div>
          : <div>
            <h3>{user.displayName}</h3>
            <h6>u/{user.handle}</h6>
            <h6>Since: {new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}</h6>
            <img src={userIcon} alt={`${user.handle}'s profile picture.`} width={250} height={250} />
            {JSON.stringify(user)}
          </div>}
    </>
  );
};

export default Users;