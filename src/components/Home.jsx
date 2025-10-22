import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const options = {
        method: 'GET',
        url: 'http://localhost:9999/api/Posts/latest',
        withCredentials: true
      };
      try {
        const { data } = await axios.request(options);
        setPosts(data.content.posts || []);
        setPagination(data.content.pagination || []);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={
      {
        display: "flex",
        content: "center",
        alignItems: "center",
        justifyContent: "center"
      }
    }>
      {loading ? "loading..." : posts.length > 0 ? (
        posts.map((post, idx) => (
          <Post post={post} />
        ))
      ) : (
        <p>No posts yet...</p>
      )}
    </div>
  );
};

export default Home;
