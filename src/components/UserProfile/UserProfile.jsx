import { useEffect, useState } from "react";
import { getUserbyUsername, getAllPostsByUsername } from "../../helpers/api";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import "./UserProfile.css";

const UserProfile = ({ handle }) => {
  const [user, setUser] = useState(null);
  const [self, setSelf] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) {
      window.location.href = "/";
    }

    const fetchPosts = async () => {
      const response = await getAllPostsByUsername(handle);
      if (response.status === 200) {
        setPosts(response.data.posts);
        setPagination(response.data.pagination);
      } else {
        console.error(response);
      }
    };

    const fetchUser = async () => {
      const response = await getUserbyUsername(handle);
      if (response.status === 200) {
        const lsUser = JSON.parse(localStorage.getItem("topicalbird_current_user"));
        if (lsUser?.id === response.data.content.id) setSelf(true);
        setUser(response.data.content);
        await fetchPosts();
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [handle]);

  if (loading) return <p className="loading">Loading profile for {handle}...</p>;
  if (!user) return <p className="error">User not found.</p>;

  return (
    <div className="user-profile">
      <UserInfo user={user} self={self} />
      <UserPosts posts={posts} />
    </div>
  );
};

export default UserProfile;
