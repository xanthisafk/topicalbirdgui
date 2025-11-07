import { LOCALSTORAGE_KEYS } from '@/config';
import { getLatestPosts, getPopularPosts } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../ui/Loader';
import Post from '../Post';
import Button from '../ui/Button';
import { RefreshCw } from 'lucide-react';

const Feed = () => {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 1,
    pageNumber: 1,
    totalItems: 1,
    totalPages: 1,
  });

  const [searchParams] = useSearchParams();
  const pageNo = searchParams.get("page") ?? 1;
  const sort = searchParams.get("sort") ?? "Latest";
  const limit = Number.parseInt(localStorage.getItem(LOCALSTORAGE_KEYS.feedLimit)) || 20;

  const saveFeedToLS = (items) => {
    if (pageNo === 1 && items.posts.length > 0) {
      localStorage.setItem(
        LOCALSTORAGE_KEYS.feedPosts,
        JSON.stringify(items.posts)
      );

      localStorage.setItem(
        LOCALSTORAGE_KEYS.feedPages,
        JSON.stringify(items.pagination)
      );
    }
  }

  const refreshPosts = async () => {
    try {
      setLoading(true);
      let res;
      if (sort === "Latest") {
        res = await getLatestPosts(null, pageNo, limit);
      } else {
        res = await getPopularPosts(null, pageNo, limit)
      }
      if (res.status === 200) {
        setPosts(res.data.content.posts);
        setPagination(res.data.content.pagination);
        saveFeedToLS(res.data.content);
      } else {
        console.error(res);
      }
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <h2>
      Browse {sort} <Button className='half-spin-parent'><RefreshCw
        className={loading ? "spin" : "half-spin"}
        onClick={() => refreshPosts()}
       /></Button><br />
      {loading
        ? <Loader />
        : posts.length > 0
          ? posts.map((item, index) => (
            <Post post={item} key={index} />
          ))
          : <span>No posts found!</span>
      }
      page: {pageNo}<br />
      limit: {limit}<br />
      <span>This Page: {pagination.pageNumber}</span>
      <span>Total Pages: {pagination.totalPages}</span>
      <span>This Items: {pagination.totalItems}</span>
      <span>Limit: {pagination.limit}</span>
    </h2>
  );
};

export default Feed;