import Post from "../Post/Post";

const UserPosts = ({ posts }) => {
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="user-posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
