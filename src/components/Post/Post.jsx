import { API_BASE_URL, NAVIGATION_PAGES } from "../../config";
import formatTimeData from "../../helpers/formatTimeData";
import { Carousel } from "../ui/Carousel";
import Button from "../ui/Button";
import "./post.css";
import { ThumbsUp, MessageCircle, Share } from "lucide-react";

const Post = ({ post }) => {
    if (!post) return null;

    const { id, title, content, author, nest, createdAt, photos, votes, comments } = post;
    const time = formatTimeData(createdAt);
    return (
        <div className="post-container">
            {/* Header: Nest + Author */}
            <div className="post-header">
                <img
                    src={API_BASE_URL + nest.icon}
                    alt={nest.title}
                    className="post-header-nest-icon"
                />
                <div>
                    <div>
                        <a className="" href={NAVIGATION_PAGES.nests.title(nest.title)}>n/{nest.title}</a> • <span title={time.precise}>{time.relative}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem" }}>
                        <a href={NAVIGATION_PAGES.users.username(author.handle)}>u/{author.handle}</a>
                    </div>                    
                </div>
            </div>

            {/* Post Title */}
            <a href={"/p/"+id}>
                <h3 style={{ fontFamily: "var(--font-heading)", margin: "0.5rem 0" }}>
                {title}
            </h3>
            </a>

            {/* Content */}
            <p style={{ fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                {content}
            </p>

            {/* Photos */}
            {photos && photos.length > 0 && (
                <Carousel photos={photos} />
            )}

            {/* Footer: Votes and Comments */}
            <div className="interactive-area">
                <Button variant="outlined"><ThumbsUp /> <span>{votes}</span></Button>
                <Button variant="outlined"><MessageCircle /> <span>{comments}</span></Button>
                <Button variant="outlined"><Share /></Button>
            </div>
        </div>
    );
};

export default Post;
