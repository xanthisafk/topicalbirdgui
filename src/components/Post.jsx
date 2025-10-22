import { API_BASE_URL } from "../../topicalbirdconfig";
import { Carousel } from "./ui/Carousel";

const Post = ({ post }) => {
    if (!post) return null;

    const { title, content, author, nest, createdAt, photos, votes, comments } = post;

    return (
        <div
            style={{
                width: "98%",
                backgroundColor: "var(--color-slate-800)",
                color: "var(--text-color)",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
            }}
        >
            {/* Header: Nest + Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <img
                    src={API_BASE_URL + nest.icon}
                    alt={nest.title}
                    style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
                <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-slate-300)" }}>
                        Posted in <strong>{nest.displayName}</strong> by <strong>{author.displayName}</strong>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate-400)" }}>
                        {new Date(createdAt).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Post Title */}
            <h3 style={{ fontFamily: "var(--font-heading)", margin: "0.5rem 0" }}>
                {title}
            </h3>

            {/* Content */}
            <p style={{ fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                {content}
            </p>

            {/* Photos */}
            {photos && photos.length > 0 && (
                <Carousel photos={photos} />
            )}

            {/* Footer: Votes and Comments */}
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "var(--color-slate-300)" }}>
                <span>👍 {votes}</span>
                <span>💬 {comments}</span>
            </div>
        </div>
    );
};

export default Post;
