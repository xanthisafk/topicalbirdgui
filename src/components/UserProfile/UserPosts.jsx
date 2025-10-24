import Post from "../Post/Post";

const UserPosts = ({ posts }) => {
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="user-posts">
      <h3>Posts</h3>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
