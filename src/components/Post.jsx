import { API_URL_FROM_CONTENT_URL, NAVIGATION_PAGES } from "@/config";
import formatTimeData from "@/helpers/formatTimeData";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import "@/styles/components/post.css";
import likeSound from "./pages/like-pop.wav";
import dislikeSound from "./pages/dislike-pop.wav";
import { ThumbsUp, MessageCircle, Share, AlertTriangle, Shield } from "lucide-react";
import { formatErrorMessage } from "@/helpers/formatErrorMessage";
import { castVote } from "@/helpers";
import { useSnackbar } from "@/hooks/useSnackbar";
import CarouselPrime from "./Carousel/Index";

const Post = ({ post, onVote }) => {
    console.log(post)
    const {
        id,
        title,
        content,
        author,
        nest,
        createdAt,
        photos,
        votes,
        comments,
        hasVoted
    } = post;
    const time = formatTimeData(createdAt);

    const { showSnackbar } = useSnackbar();

    const vote = async () => {
        let myVote = hasVoted ? 0 : 1;
        let audio = new Audio(hasVoted ? dislikeSound : likeSound);

        audio.volume = 0.3;
        audio.play();

        const res = await castVote(id, myVote);

        if (res.status === 200) {
            onVote?.();
            return;
        }

        const msg = formatErrorMessage(res);
        showSnackbar({
            content: msg,
            type: "danger",
            icon: AlertTriangle,
            duration: 5,
        });
    };


    if (!post) return null;
    return (
        <div className="post">
            {/* Header: Nest + Author */}
            <div className="post-header">
                <img
                    src={API_URL_FROM_CONTENT_URL(nest.icon)}
                    alt={`${nest.title}'s icon`}
                    className="post-nest-icon"
                />
                <div className="post-metadata">
                    <div>
                        <Link className="post-nest-link" to={NAVIGATION_PAGES.nests.title(nest.title)} viewTransition>
                            n/{nest.title}
                        </Link> •
                        <span className="post-time" title={time.precise}>{time.relative}</span>
                    </div>
                    <div className="author-name-icon">
                        <Link className="post-author-link" to={NAVIGATION_PAGES.users.username(author.handle)} viewTransition>
                            u/{author.handle}
                        </Link>
                        { (post.author.isAdmin || post.byModerator) && <Shield size={15} stroke="var(--accent-color)" fill="var(--accent-color)" /> }
                    </div>
                </div>
            </div>

            {/* Post Title */}
            <Link to={NAVIGATION_PAGES.post.id(id)} viewTransition
                className="post-title-link">
                <h3 className="post-title">
                    {title}
                </h3>
            </Link>

            {/* Content */}
            <p className="post-content">
                {content}
            </p>

            {/* Photos */}
            {photos && photos.length > 0 && (
                <div className="post-carousel-container">
                    <CarouselPrime photos={photos} />
                </div>
            )}

            {/* Footer: Votes and Comments */}
            <div className="post-actions">
                <Button variant="outlined" className="post-like-button" onClick={vote}>
                    <ThumbsUp fill={hasVoted ? "var(--accent-color)" : "transparent"}
                        className="post-action-icon post-action-icon-like" />
                    <span>{votes}</span>
                </Button>
                <Link to={`${NAVIGATION_PAGES.post.id(id)}#comment-section`} viewTransition>
                    <Button variant="outlined">
                        <MessageCircle className="post-action-icon" />
                        <span>{comments}</span>
                    </Button>
                </Link>
                <Button variant="outlined">
                    <Share className="post-action-icon" />
                </Button>
            </div>
        </div>
    );
};

export default Post;