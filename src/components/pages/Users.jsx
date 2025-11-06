import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../ui/Loader';
import { API_DEFAULT_IMAGES, API_URL_FROM_CONTENT_URL, GUI_DEFAULT_IMAGES, NAVIGATION_PAGES, SITE_TITLE } from '@/config';
import { getAllPostsByUsername, getUserbyUsername, useViewNavigate } from '@/helpers';

import "@/styles/pages/users.css";
import Post from '../Post';
import { Bird, Fish } from 'lucide-react';
import useThemeIcon from '@/helpers/useThemeIcon';
import Button from '../ui/Button';

const Users = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();
  const parrot = useThemeIcon();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 20,
  });
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
          await fetchPosts();
          return;
        }
      } finally { setLoading(false); }
    }


    const fetchPosts = async () => {
      const res = await getAllPostsByUsername(username, pagination.pageNumber, pagination.limit);
      if (res.status === 200) {
        console.log(res);
        setPosts(res.data.posts);
        setPagination(res.data.pagination);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      {loading ? <div><Loader /><br />Loading {username}'s profile...</div>
        : user === null ? <div className='doesntExist'>
          
            <img 
            src={parrot} alt={GUI_DEFAULT_IMAGES.appIcon.alt} />
          <h1>This user doesn't exist!</h1>
          <Button onClick={() => navigate(NAVIGATION_PAGES.home, null)}>Go Home</Button>
        </div>
          :
          <div className='user-container'>
            <div className='profile-container'>
              <div className='profile-avatar-container'>
                <img
                  className='profile-avatar'
                  src={userIcon}
                  alt={`${user.displayName}'s profile picture.`}
                />
              </div>
              <div className='profile-data-container'>
                <span className='profile-user-name'>{user.displayName}</span>
                <div className='profile-handle-container'>
                  <span>u/{user.handle}</span>
                  {user.isAdmin &&
                    <img src={GUI_DEFAULT_IMAGES.adminIcon.image}
                      alt={GUI_DEFAULT_IMAGES.adminIcon.alt}
                      title={`Admin of ${SITE_TITLE}`}
                    />
                  }
                </div>
                <div className='profile-join-date'>
                  <span>Joined: {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}</span>
                </div>
              </div>
            </div>
            <div className='posts-container'>
              {
                posts && posts.length <= 0 && <div>No posts!</div>
              }
              {
                posts && posts.map((post, key) => (
                  <Post post={post} key={key} />
                ))
              }
            </div>
          </div>
      }
    </>
  );
};

export default Users;