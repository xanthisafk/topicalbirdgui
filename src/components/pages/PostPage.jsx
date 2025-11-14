import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import "@/styles/pages/post-page.css";
import { API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, GUI_DEFAULT_SOUNDS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES, SITE_URL } from '@/config';
import { castVote, deletePostById, getPostById, useViewNavigate } from '@/helpers';
import ContentLoading from '../ContentLoading';
import { useSnackbar } from '@/hooks/useSnackbar';
import formatTimeData from '@/helpers/formatTimeData';
import Button from '../ui/Button';
import { AlertTriangle, Check, ChevronLeft, MessageCircle, Share, Shield, ThumbsUp, Trash2 } from 'lucide-react';
import CarouselPrime from '../Carousel';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import likeSound from "./like-pop.wav";
import dislikeSound from "./dislike-pop.wav";
import Comments from '../Comments';
import { usePopup } from '@/hooks/usePopup';

const PostPage = () => {
  const { id } = useParams();
  const { hash } = useLocation();
  const { showSnackbar } = useSnackbar();
  const navigate = useViewNavigate();
  const { triggerPopup } = usePopup();

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ id: null });
  const [post, setPost] = useState(null);
  const [showControlButtons, setShowControlButtons] = useState(false);

  const commentRef = useRef(0);

  const controlButtons = (user, tpost) => {
    if (user.id !== null) {
      setShowControlButtons(user.isAdmin || tpost.isModerator || (user.id === tpost.author.id));
    }
  }

  const fetchCurrentUser = () => {
    let user = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
    return user;
  }

  const fetchPost = async () => {
    const res = await getPostById(id);
    if (res.status === 200) {
      setPost(res.data.content);
      document.title = `${res.data.content.title} | Topicalbird`;
      return res.data.content;
    }
  }

  const fetchData = async () => {
    try {
      const user = fetchCurrentUser();
      const tpost = await fetchPost();
      controlButtons(user, tpost);
    } finally {
      setLoading(false);
      if (hash) {
        setTimeout(() => {
          commentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    }
  }

  useEffect(() => {
    if (!id) {
      navigate(-1, "back");
      return;
    }
    fetchData();
    window.addEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const vote = async () => {
    let myVote = 0;
    let audio = null;
    if (post.hasVoted) {
      myVote = 0;
      audio = new Audio(dislikeSound);
    } else {
      myVote = 1;
      audio = new Audio(likeSound);
    }
    audio.volume = 0.3;
    audio.play();
    const res = await castVote(post.id, myVote);
    if (res.status === 200) {
      return await fetchPost();
    }

    const msg = formatErrorMessage(res);
    showSnackbar({
      content: msg,
      type: "danger",
      icon: AlertTriangle,
      duration: 5,
    });
  }

  const copyPostLink = () => {
    const url = SITE_URL + NAVIGATION_PAGES.post.id(post.id);
    navigator.clipboard.writeText(url);
    showSnackbar({
      content: "Copied to clipboard",
      icon: Check,
      type: "neutral",
      duration: 2,
    });
  }

  const scrollCommentToView = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }

  const postDelete = async () => {
    if (post.id === null) return;

    const res = await deletePostById(post.id);
    if (res.status === 200) {
      navigate(NAVIGATION_PAGES.nests.title(post.nest.title), "");
      return;
    }

    const msg = formatErrorMessage(res);
    showSnackbar({
      content: msg,
      icon: AlertTriangle,
      type: "danger",
      duration: 5,
    });
    return;
  }

  const showDeletePopup = () => {
    triggerPopup({
      title: 'Confirmation',
      description: 'Are you sure you want to delete this post?',
      primaryActionLabel: 'Yes',
      primaryAction: () => postDelete(),
      secondaryActionLabel: 'No',
      secondaryAction: null,
      footer: <span></span>,
    })
  }

  if (loading) return <ContentLoading size={64} />
  if (!loading && !post) {
    navigate(-1, "back");
    return;
  }

  return (
    <>
      <div className="post-container">
        <div className="post-nest-header">
          <Link to={NAVIGATION_PAGES.nests.title(post.nest.title)}>
            <Button
              variant='secondary'
              id="back-button"
            ><ChevronLeft size={32} /></Button>
          </Link>
          <img
            onClick={() => navigate(NAVIGATION_PAGES.nests.title(post.nest.title), "forwards")}
            src={API_URL_FROM_CONTENT_URL(post.nest.icon)}
            alt={`${post.nest.title}'s icon`} />
          <div className="nest-header-data">
            <div className="nest-header-data-contents">
              <span onClick={() => navigate(NAVIGATION_PAGES.nests.title(post.nest.title), "forwards")}
              >{`n/${post.nest.title}`}</span>
              <span>•</span>
              <span title={formatTimeData(post.createdAt).precise}>{formatTimeData(post.createdAt).relative}</span>
            </div>
            <span title={`Moderator of ${post.nest.title}`}
              onClick={() => navigate(NAVIGATION_PAGES.users.username(post.author.handle), "forwards")}
              className="author">{`u/${post.author.handle}`}
              {post.byModerator && <Shield size={15} fill="var(--accent-color)" stroke="var(--accent-color)" />}
            </span>
          </div>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body-content">{post.content}</p>
        {(post.photos && post.photos.length > 0) &&
          <div>
            <CarouselPrime photos={post.photos} />
          </div>
        }
        <div className="post-interactions">
          <div>
            <Button variant='secondary' title="Upvote this post" onClick={vote}>
              <ThumbsUp
                stroke={"var(--accent-color)"}
                fill={post.hasVoted ? "var(--accent-color)" : "transparent"} />
              {post.votes}
            </Button>
            <Button variant='secondary' title="Comments on this post" onClick={scrollCommentToView}>
              <MessageCircle
                stroke={"var(--accent-color)"} />
              {post.comments}
            </Button>
            <Button
              onClick={() => copyPostLink()}
              variant='secondary' title="Share this post">
              <Share
                stroke={"var(--accent-color)"} />
            </Button>
          </div>
          {showControlButtons &&
            <div>
              <Button variant="secondary" onClick={showDeletePopup} title="Delete this post">
                <Trash2 stroke={"var(--danger-color)"} />
              </Button>
            </div>
          }
        </div>
        {post && <Comments
          ref={commentRef}
          postId={post.id}
          currentUserIsMod={post.isModerator}
          currentUser={currentUser}
          postAuthor={post.author}
        />}
      </div>
    </>
  );
};

export default PostPage;