import { API_DEFAULT_IMAGES, API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { getAllPostsByNest, getNestByTitle, useViewNavigate } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import DoestExist from '../../DoesntExist';
import NoContent from '../../NoContent';
import Post from '../../Post';
import formatTimeData from '@/helpers/formatTimeData';
import { ChevronRight, Pencil, SquarePen } from 'lucide-react';

import "@/styles/pages/nests.css";
import Button from '../../ui/Button';
import ContentLoading from '../../ContentLoading';

const NestDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useViewNavigate();

  const [detailsLoading, setDetailsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [nest, setNest] = useState(null);
  const [posts, setPosts] = useState([]);
  const [moderator, setModerator] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [nestIcon, setNestIcon] = useState(API_DEFAULT_IMAGES.nestPicture.image);
  const [timeData, setTimedata] = useState({ relative: "", precise: "" });
  const [user, setUser] = useState({ id: null });

  const fetchNest = async () => {
    try {
      const res = await getNestByTitle(slug);
      if (res.status === 200) {
        setModerator(res.data.content.moderator);
        delete res.data.content.moderator;
        setNest(res.data.content);
        setNestIcon(API_URL_FROM_CONTENT_URL(res.data.content.icon));
        setTimedata(formatTimeData(res.data.content.createdAt));
      }
    } finally { setDetailsLoading(false); }

  }

  const fetchPosts = async () => {
    try {
      const res = await getAllPostsByNest(slug, pagination?.pageNumber ?? 1, pagination?.limit ?? 20);
      if (res.status === 200) {
        setPosts(res.data.content.posts);
        setPagination(res.data.content.pagination);
      }
    } finally { setPostsLoading(false); }
  }

  const updateCurrentUser = () => {
    let user = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setUser(user);
    }
  }

  window.addEventListener(EVENT_LISTENER_KEYS.currentUser, updateCurrentUser);

  useEffect(() => {
    if (!slug) return navigate(NAVIGATION_PAGES.home, "back");
    setPagination({
      pageNumber: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 20,
      totalItems: 0,
      totalPages: 1,
    });
    updateCurrentUser();
    fetchNest();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])


  return (
    <>
      <div>
        {detailsLoading ? (<ContentLoading size={64} />
        ) : nest === null ? (
          <DoestExist what="nest" />) :
          <div className="nest-container">
            <div className="details-container">

              {/* Nest Info Card */}
              <div className="detail-card">
                <div className="nest-icon-container">
                  <img
                    className="nest-icon"
                    src={nestIcon}
                    alt={`${nest.displayName}'s icon.`}
                  />
                </div>
                <div className="nest-data-container">
                  <span className="nest-name">{nest.displayName}</span>
                  <span className="nest-description">{nest.description}</span>
                  <span className="nest-title">n/{nest.title}</span>
                  <div className="nest-button-group">
                    {user.id !== null &&
                      <Button><SquarePen /> New Post</Button>
                    }
                    {user?.id === moderator?.id &&
                      <Button
                        onClick={() => navigate(NAVIGATION_PAGES.nests.settings(slug), "forwards")}
                        variant='secondary'><Pencil /> Edit Nest</Button>
                    }
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="detail-card">
                <span className="details-card-title">Stats</span>
                <div className="nest-info-container">
                  <span>
                    Posts <br />
                    <b>{pagination.totalItems}</b>
                  </span>
                </div>
                <div className="nest-info-container">
                  <span>
                    Since <br />
                    <b title={timeData.precise}>{timeData.relative}</b>
                  </span>
                </div>
              </div>

              {/* Moderator Card */}
              {moderator && (
                <div className="detail-card">
                  <span className="details-card-title">Moderator</span>
                  <div className="nest-moderator">
                    <div
                      className="moderator-chip-container"
                      onClick={() =>
                        navigate(
                          NAVIGATION_PAGES.users.username(moderator.handle),
                          "forwards"
                        )
                      }
                    >
                      <div className="moderator-chip-content">
                        <img
                          src={API_URL_FROM_CONTENT_URL(moderator.icon)}
                          alt={`${moderator.handle}'s icon.`}
                        />
                        <div>
                          <span>{moderator.displayName}</span>
                          <p>u/{moderator.handle}</p>
                        </div>
                      </div>
                      <ChevronRight
                        id="moderator-chip-icon"
                        stroke="var(--foreground-color)"
                        size={32}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Posts */}
            <div className="posts-container">
              {postsLoading ? (
                <Loader />
              ) : posts && posts.length <= 0 ? (
                <NoContent />
              ) : (
                posts?.map((post, key) => <Post post={post} key={key} />)
              )}
            </div>
          </div>

        }
      </div>
    </>
  );
};

export default NestDetail;