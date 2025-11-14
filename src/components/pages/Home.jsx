import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import ContentLoading from '../ContentLoading';
import NoContent from '../NoContent';
import { API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { getLatestPosts, getSelfNests, useViewNavigate } from '@/helpers';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';
import Post from '../Post';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';



const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: searchParams.get("page") || 1,
    limit: 20,
    totalPages: 1,
    totalItems: 1,
  })
  const [currentUser, setCurrentUser] = useState({id: null});
  const [nests, setNests] = useState([]);

  const getCurrentUser = () => {
    let user = { id: null }
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
  }

  const fetchPosts = async () => {
    const res = await getLatestPosts(null, pagination.pageNumber, pagination.limit);
    if (res.status === 200) {
      setPagination(res.data.content.pagination);
      setPosts(res.data.content.posts);
    }
  }

  const fetchNests = async () => {
    const res = await getSelfNests();
    if (res.status === 200) {
      setNests(res.data.content);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      getCurrentUser();
      await fetchNests();
      await fetchPosts();
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    await fetchPosts();
  }
  
  useEffect(() => { 
    fetchData();
    window.addEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <ContentLoading size={64} />
  if (posts.length <= 0) return <NoContent action={
    {
      href: NAVIGATION_PAGES.nests.newNest,
      label: "Create a new nest",
      direction: "forwards",
    }
  } what='posts' />
  return (
    <Layout 
    sidebar={<>
      { currentUser.id === null && <div className="sidebar-card">
        <h3 className='sidebar-card-title'>Welcome!</h3>
        <div className="sidebar-auth-container">
          <Button variant='primary'
            onClick={() => navigate(NAVIGATION_PAGES.auth.login, "forwards")}>Login</Button>
          <Button variant='secondary'
            onClick={() => navigate(NAVIGATION_PAGES.auth.register, "forwards")}>Register</Button>
        </div>
      </div>
      }
      {
        currentUser.id !== null && <div className="sidebar-card">
          <h3 className="sidebar-card-title">You</h3>
          <div className="sidebar-user-container" tabIndex={0}
           onClick={() => navigate(NAVIGATION_PAGES.users.username(currentUser.handle), "forwards")}>
            <img src={API_URL_FROM_CONTENT_URL(currentUser.icon)} alt={`${currentUser.handle}'s profile picture`} />
            <div className="sidebar-user-container-content">
              <p>{currentUser.displayName}</p>
              <small>{`/u/${currentUser.handle}`}</small>
            </div>
          </div>
        </div>
      }
      { nests.length > 0 && <div className='sidebar-card'>
        <h3 className='sidebar-card-title'>Your Nests</h3>
        {nests.map((nest) => (
          <div className="sidebar-nest-chip" key={nest.id} tabIndex={0}
            onClick={() => navigate(NAVIGATION_PAGES.nests.title(nest.title), "forwards")} >
            <img src={API_URL_FROM_CONTENT_URL(nest.icon)} alt={`${nest.title}'s icon.`} />
            <div className="sidebar-nest-chip-content">
              <p>{`/n/${nest.title}`}</p>
              <ChevronRight />
            </div>
          </div>
        ))}
        </div>}
    </>}>
      <div>
        {
          posts.map((post) => (
            <Post post={post} key={post.id} onVote={handleVote} />
          ))
        }
        <Pagination data={pagination} />
      </div>
    </Layout>
  );
};

export default Home;