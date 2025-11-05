import { API_BASE_URL, NAVIGATION_PAGES } from "@/config";
import formatTimeData from "@/helpers/formatTimeData";
import { Carousel } from "./ui/Carousel";
import Button from "@/components/ui/Button";
import "@/styles/components/post.css"; // <-- Import your new CSS file

import { ThumbsUp, MessageCircle, Share } from "lucide-react";

const Post = ({ post }) => {
    if (!post) return null;

    const { id, title, content, author, nest, createdAt, photos, votes, comments } = post;
    const time = formatTimeData(createdAt);

    return (
        <div className="post">
            {/* Header: Nest + Author */}
            <div className="post-header">
                <img
                    src={API_BASE_URL + nest.icon}
                    alt={nest.title}
                    className="post-nest-icon"
                />
                <div className="post-metadata">
                    <div>
                        <a className="post-nest-link" href={NAVIGATION_PAGES.nests.title(nest.title)}>
                            n/{nest.title}
                        </a> •
                        <span className="post-time" title={time.precise}>{time.relative}</span>
                    </div>
                    <div>
                        <a className="post-author-link" href={NAVIGATION_PAGES.users.username(author.handle)}>
                            u/{author.handle}
                        </a>
                    </div>
                </div>
            </div>

            {/* Post Title */}
            <a href={"/p/" + id} className="post-title-link">
                <h3 className="post-title">
                    {title}
                </h3>
            </a>

            {/* Content */}
            <p className="post-content">
                {content}
            </p>

            {/* Photos */}
            {photos && photos.length > 0 && (
                <div className="post-carousel-container">
                    <Carousel photos={photos} />
                </div>
            )}

            {/* Footer: Votes and Comments */}
            <div className="post-actions">
                <Button variant="outlined" className="post-like-button">
                    <ThumbsUp className="post-action-icon post-action-icon-like" />
                    <span>{votes}</span>
                </Button>
                <Button variant="outlined">
                    <MessageCircle className="post-action-icon" />
                    <span>{comments}</span>
                </Button>
                <Button variant="outlined">
                    <Share className="post-action-icon" />
                </Button>
            </div>
        </div>
    );
};

export default Post;