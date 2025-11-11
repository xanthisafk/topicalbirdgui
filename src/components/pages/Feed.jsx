import { API_URL_FROM_CONTENT_URL, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { getLatestPosts, getPopularPosts, getSelfNests, useViewNavigate } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Post from '../Post';
import Button from '../ui/Button';
import { ArrowDownUp, ChartNoAxesCombined, ChevronRight, RefreshCw, Zap } from 'lucide-react';
import ContentLoading from '../ContentLoading';
import NoContent from '../NoContent';
import Pagination from '../Pagination';

import "@/styles/pages/feed.css"
import Layout from '../Layout';

const Feed = () => {

  const navigate = useViewNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [nests, setNests] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 20,
    pageNumber: searchParams.get("page") || 1,
    totalItems: 1,
    totalPages: 1,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const sort = searchParams.get("sort") ?? "latest";
  
  const limit = Number.parseInt(localStorage.getItem(LOCALSTORAGE_KEYS.feedLimit)) || 20;

  const getCurrentUser = () => {
    let user = null;
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
  }

  const fetchNests = async () => {
    const res = await getSelfNests();
    if (res.status === 200) {
      setNests(res.data.content);
    }
  }

  const refreshPosts = async () => {
    try {
      setLoading(true);
      let res;
      if (sort === "latest") {
        res = await getLatestPosts(null, pagination.pageNumber || 1, limit);
      } else {
        res = await getPopularPosts(null, pagination.pageNumber || 1, limit)
      }
      if (res.status === 200) {
        setPosts(res.data.content.posts);
        setPagination(res.data.content.pagination);
      } else {
        console.error(res);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      getCurrentUser();
      fetchNests();
      await refreshPosts();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageNumber, sort]);


  if (loading) return <ContentLoading size={64} />
  if (posts.length <= 0) return <NoContent what="posts" />

  return (
    <>
      <Layout 
          sidebar={<>
            {
              currentUser && <div className="sidebar-card">
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
              {nests.map((nest, index) => (
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
          </>}>
            <div>
              {
                posts.map((post, index) => (
                  <Post post={post} key={index} />
                ))
              }
              <Pagination data={pagination} />
            </div>
          </Layout>
      <Button className='corner-sticky half-spin-parent'><RefreshCw
        className={loading ? "spin" : "half-spin"}
        onClick={() => refreshPosts()}
      /></Button>
    </>
  );
};

export default Feed;