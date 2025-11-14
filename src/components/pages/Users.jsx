import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import {
  API_DEFAULT_IMAGES,
  API_URL_FROM_CONTENT_URL,
  EVENT_LISTENER_KEYS,
  GUI_DEFAULT_IMAGES,
  LOCALSTORAGE_KEYS,
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
import { ChevronRight, Pencil, SquarePen } from "lucide-react";
import ContentLoading from "../ContentLoading";
import Button from "../ui/Button";
import Layout from "../Layout";

const Users = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: null });
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

  const setupTempUser = () => {
    let tempUser = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        tempUser = JSON.parse(data);
      }
    } finally {
      setCurrentUser(tempUser);
    }
  }

  const fetchUser = async () => {
    const res = await getUserbyUsername(username);
    if (res.status === 200) {
      setUser(res.data.content);
      setUserIcon(API_URL_FROM_CONTENT_URL(res.data.content.icon));

      setTimedata(formatTimeData(res.data.content.createdAt));
      return;
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

  const fetchData = async () => {

    try {
      await Promise.all([
        fetchUser(),
        await fetchPosts(),
        await fetchNests(),
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!username) {
      navigate(NAVIGATION_PAGES.home, "back");
      return;
    }
    setupTempUser();
    fetchData();
    window.addEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (loading) return <ContentLoading size={64} />
  if (user === null) return <DoestExist what="user" />
  return (
    <>
      <Layout
        sidebar={<>
          <div className="sidebar-card">
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
              <div className="nest-button-group">
                {user?.id === currentUser?.id &&
                  <Button variant='secondary'
                    onClick={() => navigate(NAVIGATION_PAGES.auth.account, "forwards")}
                  ><Pencil /> Edit Profile</Button>
                }
              </div>
            </div>
          </div>
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Stats</h3>
            <div className="profile-info-container">
              <span>
                Posts: <br />
                <b>{pagination.totalItems}</b>
              </span>
            </div>
            <div className="profile-info-container">
              <span>
                Joined: <br />
                <b title={timeData.precise}>{timeData.relative}</b>
              </span>
            </div>
          </div>
          <div className="sidebar-card">
            {nests && nests.length > 0 && (
              <>
                <h3 className="sidebar-card-title">Moderates</h3>
                <div className="profile-nests-list">
                  {nests.map(({ id, icon, displayName, title }) => (
                    <div
                      className="nest-chip-container"
                      key={id}
                      tabIndex={0}
                      onClick={() =>
                        navigate(NAVIGATION_PAGES.nests.title(title), "forwards")
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
                        size={20}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>}
      >
        <div className="posts-container">
          {posts && posts.length <= 0 && <NoContent />}
          {posts && posts.map((post, key) => <Post post={post} key={key} />)}
        </div>
      </Layout>
    </>
  );
};

export default Users;
