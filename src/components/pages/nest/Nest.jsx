import React, { useEffect, useState } from 'react';
import ContentLoading from '@/components/ContentLoading';
import NoContent from '@/components/NoContent';
import { getAllNests, getSelfNests, useViewNavigate } from '@/helpers';
import { API_URL_FROM_CONTENT_URL, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'react-router-dom';


import "@/styles/pages/nests/nest-index.css";
import Layout from '@/components/Layout';
import { ChevronRight, Plus, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

const Nest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();

  const [loading, setLoading] = useState(true);
  const [networkIssue, setNetworkIssue] = useState(false);
  const [nests, setNests] = useState([]);
  const [selfNests, setSelfNests] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: null });
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPages: 1,
    totalItems: 1,
    limit: 20,
  });

  const fetchNests = async () => {
    const res = await getAllNests(searchParams.get("page") || pagination.pageNumber || 1, 20);
    if (res.status === 200) {
      setNests(res.content.nests);
      setPagination(res.content.pagination);
    } else if (res.status === null) {
      setNetworkIssue(true);
    }
  }

  const fetchCurrentUser = () => {
    let user = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
  }

  const fetchSelfNests = async () => {
    const res = await getSelfNests();
    if (res.status === 200) {
      setSelfNests(res.data.content);
    } else if (res.status === null) {
      setNetworkIssue(true);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      fetchCurrentUser();
      await Promise.all([
        fetchSelfNests(),
        fetchNests()
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])



  const noNestButton = {
    href: NAVIGATION_PAGES.nests.newNest,
    direction: "forwards",
    label: "Create a new nest!"
  }

  if (loading) return <ContentLoading size={64} />
  if (networkIssue) return <NoContent what="internet" />
  if (nests.length <= 0) return <NoContent what='nests' action={noNestButton} />
  return (
    <>
      <Layout
        sidebar={<>
          {currentUser.id === null && <div className="sidebar-card">
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
          {selfNests.length > 0 && <div className='sidebar-card'>
            <h3 className='sidebar-card-title'>Your Nests</h3>
            {selfNests.map((nest, index) => (
              <div className="sidebar-nest-chip" key={index} tabIndex={0}
                onClick={() => navigate(NAVIGATION_PAGES.nests.title(nest.title), "forwards")} >
                <img src={API_URL_FROM_CONTENT_URL(nest.icon)} alt={`${nest.title}'s icon.`} />
                <div className="sidebar-nest-chip-content">
                  <p>{`/n/${nest.title}`}</p>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Discover</h3>
            <div className="sidebar-nest-chip"
              onClick={() => navigate(NAVIGATION_PAGES.post.feed, "forwards")}>
              <div className="sidebar-nest-chip-content">
                <p>Posts</p>
                <ChevronRight />
              </div>
            </div>
          </div>
        </>}>
        <div className="feed-nest-main-content">
          <div className="nest-title-container">
            <h3>Browse Nests</h3>
            <Button variant='secondary' onClick={() => navigate(NAVIGATION_PAGES.nests.newNest, "forwards")}>
              <Plus /> New Nest
            </Button>
          </div>
          {
            nests && nests.map(({ icon, title, displayName, description, moderator }, index) => (
              <div className="feed-nest-card" key={index}
                onClick={() => navigate(NAVIGATION_PAGES.nests.title(title), "forwards")}
              >
                <img
                  loading='lazy'
                  className='feed-nest-card-icon'
                  src={API_URL_FROM_CONTENT_URL(icon)}
                  alt={`${title}'s icon`}
                />
                <div className="feed-nest-card-content">
                  <div className='feed-nest-card-title-container'>
                    <small>n/{title}</small>
                    {moderator.id === currentUser.id &&
                      <Shield stroke="var(--accent-color)" fill='var(--accent-color)'
                        title="You are a moderator of this nest" />}
                  </div>
                  <span>{displayName}</span>
                  <p>{description}</p>
                </div>
              </div>
            ))
          }
          <Pagination data={pagination} />
        </div>
      </Layout>

    </>
  );
};

export default Nest;