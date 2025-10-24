import { API_BASE_URL } from "../../../topicalbirdconfig";
import formatTimeData from "../../helpers/formatTimeData";
import { Carousel } from "../ui/Carousel";
import "./post.css";

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
                        <a className="" href={"/n/"+nest.title}>n/{nest.title}</a> • <span title={time.precise}>{time.relative}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem" }}>
                        <a href={"/u/"+author.handle}>u/{author.handle}</a>
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
                <div className="interactive-area-button"><img src="/assets/posts/star.svg" alt="total votes" className="post-liked" width={15} height={15} /> {votes}</div>
                <div className="interactive-area-button"><img src="/assets/posts/comment.svg" alt="comments" width={15} height={15} /> {comments}</div>
                <div className="interactive-area-button"><img src="/assets/posts/share.svg" alt="share" width={15} height={15} /> Share</div>
            </div>
        </div>
    );
};

export default Post;
