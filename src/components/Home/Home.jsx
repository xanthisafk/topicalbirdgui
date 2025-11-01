import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import "./Home.css";
import { getLatestPosts } from '../../helpers/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { status, data } = await getLatestPosts();
        if (status === 200) {
          setPosts(data.content.posts || []);
          setPagination(data.content.pagination || []); 
        } else {
          console.error(data);
          alert("error");
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
  <div className="feed-container">
    {loading ? "loading..." : posts.length > 0 ? (
      posts.map((post) => (
        <Post key={post.id} post={post} />
      ))
    ) : (
      <p>No posts yet...</p>
    )}
  </div>
);

};

export default Home;
