import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import {
  API_DEFAULT_IMAGES,
  API_URL_FROM_CONTENT_URL,
  GUI_DEFAULT_IMAGES,
  NAVIGATION_PAGES,
  SITE_TITLE,
} from "@/config";
import {
  getAllPostsByUsername,
  getNestByUsername,
  getUserbyUsername,
  useViewNavigate,
} from "@/helpers";

import "@/styles/pages/users.css";
import Post from "../Post";
import DoestExist from "../DoesntExist";
import NoContent from "../NoContent";
import formatTimeData from "@/helpers/formatTimeData";
import { ChevronRight } from "lucide-react";

const Users = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [nests, setNests] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 20,
    totalItems: 0,
    totalPages: 1,
  });
  const [userIcon, setUserIcon] = useState(
    API_DEFAULT_IMAGES.userPicture.image
  );
  const [timeData, setTimedata] = useState({ relative: "", precise: "" });

  const fetchUser = async () => {
    try {
      const res = await getUserbyUsername(username);
      if (res.status === 200) {
        setUser(res.data.content);
        setUserIcon(API_URL_FROM_CONTENT_URL(res.data.content.icon));

        setTimedata(formatTimeData(res.data.content.createdAt));

        await fetchPosts();
        await fetchNests();
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    const res = await getAllPostsByUsername(
      username,
      pagination.pageNumber,
      pagination.limit
    );
    if (res.status === 200) {
      setPosts(res.data.posts);
      setPagination(res.data.pagination);
    }
  };

  const fetchNests = async () => {
    const res = await getNestByUsername(username);
    if (res.status === 200) {
      setNests(res.data.content);
    }
  };

  useEffect(() => {
    if (!username) {
      navigate(NAVIGATION_PAGES.home, "back");
      return;
    }
    fetchUser();
  }, [username]);

  return (
    <>
      {loading ? (
        <div>
          <Loader />
          <br />
          Loading {username}'s profile...
        </div>
      ) : user === null ? (
        <DoestExist what="user" />
      ) : (
        <div className="user-container">
          <div className="profile-container">
            <div className="profile-avatar-container">
              <img
                className="profile-avatar"
                src={userIcon}
                alt={`${user.displayName}'s profile picture.`}
              />
            </div>
            <div className="profile-data-container">
              <span className="profile-user-name">{user.displayName}</span>
              <div className="profile-handle-container">
                <span>u/{user.handle}</span>
                {user.isAdmin && (
                  <img
                    src={GUI_DEFAULT_IMAGES.adminIcon.image}
                    alt={GUI_DEFAULT_IMAGES.adminIcon.alt}
                    title={`Admin of ${SITE_TITLE}`}
                  />
                )}
              </div>
              <div className="profile-join-date">
                <span>
                  Posts: <br />
                  <b>{pagination.totalItems}</b>
                </span>
              </div>
              <div className="profile-join-date">
                <span>
                  Joined: <br />
                  <b title={timeData.precise}>{timeData.relative}</b>
                </span>
              </div>
              {nests && nests.length > 0 && (
                <div className="profile-nests-list">
                  <span>Moderates:</span>
                  {nests.map(({ icon, displayName, title }, key) => (
                    <div
                      className="nest-chip-container"
                      key={key}
                      onClick={() =>
                        navigate(
                          NAVIGATION_PAGES.nests.title(title),
                          "forwards"
                        )
                      }
                    >
                      <div className="nest-chip-content">
                        <img
                          src={API_URL_FROM_CONTENT_URL(icon)}
                          alt={`${title}'s icon.`}
                        />
                        <div>
                          <span>{displayName}</span>
                          <p>n/{title}</p>
                        </div>
                      </div>
                      <ChevronRight
                        id="nest-chip-icon"
                        stroke="var(--foreground-color)"
                        size={32}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="posts-container">
            {posts && posts.length <= 0 && <NoContent />}
            {posts && posts.map((post, key) => <Post post={post} key={key} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
