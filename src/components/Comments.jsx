import React, { useEffect, useState } from 'react'
import ContentLoading from './ContentLoading';
import { createNewComment, deleteComment, getAllCommentOfPosts, updateComment, useViewNavigate } from '@/helpers';
import { useSnackbar } from '@/hooks/useSnackbar';
// --- MODIFICATION START ---
// Added new icons for edit/delete/save/cancel
import { AlertTriangle, Check, Crown, Feather, Shield, UserCircle, Trash2, Edit, Save, X, User } from 'lucide-react';
// --- MODIFICATION END ---
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import formatTimeData from '@/helpers/formatTimeData';
import InputBox from './ui/Input';
import Button from './ui/Button';
import { API_URL_FROM_CONTENT_URL, EVENT_LISTENER_KEYS, NAVIGATION_PAGES } from '@/config';

import "@/styles/components/comments.css";


const Comments = ({
    postId,
    ref = null,
    currentUser = { id: null, isAdmin: false },
    postAuthor = { id: null },
    currentUserIsMod = false
}) => {
    const navigate = useViewNavigate();
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [postComments, setPostComments] = useState([]);
    const [selfComment, setSelfComment] = useState("");

    const [updatedComment, setUpdatedComment] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const makeComment = async (event) => {
        event.preventDefault();

        if (!selfComment) {
            showSnackbar({
                content: "Please enter a comment",
                duration: 3,
                icon: AlertTriangle
            });
            return;
        }

        const res = await createNewComment(postId, selfComment);
        if (res.status === 200) {
            setSelfComment("");
            return await fetchComments();
        }

        const msg = formatErrorMessage(res);
        showSnackbar({
            content: msg,
            icon: AlertTriangle,
            duration: 5,
            type: "danger"
        });
        return;
    }

    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await getAllCommentOfPosts(postId);
            if (res.status === 200) {
                setPostComments(res.data.content);
            }
        } finally {
            setLoading(false);
        }
    }

    window.addEventListener(EVENT_LISTENER_KEYS.currentUser, () => fetchComments());

    const commentUpdate = async (commentId) => {
        if (!commentId || !updatedComment) {
            showSnackbar({
                content: "Comment can't be empty",
                icon: AlertTriangle
            });
            return false;
        }

        const res = await updateComment(commentId, updatedComment);
        if (res.status === 200) {
            showSnackbar({
                content: "Comment updated",
                icon: Check,
                type: "success"
            });
            await fetchComments();
            return true;
        }

        const msg = formatErrorMessage(res);
        showSnackbar({
            content: msg,
            icon: AlertTriangle,
            duration: 5,
            type: "danger"
        });
        return false;
    }

    const handleUpdateSubmit = async (commentId) => {
        const success = await commentUpdate(commentId);
        if (success) {
            setEditingCommentId(null);
            setUpdatedComment(null);
        }
    }

    const commentDelete = async (commentId) => {
        if (!commentId) {
            showSnackbar({
                content: "Comment ID not provided.",
                icon: AlertTriangle
            });
            return;
        }

        const res = await deleteComment(commentId);

        if (res.status === 200) {
            showSnackbar({
                content: "Comment deleted",
                icon: Check,
                type: "success"
            });
            return await fetchComments();
        }


        const msg = formatErrorMessage(res);
        showSnackbar({
            content: msg,
            icon: AlertTriangle,
            duration: 5,
            type: "danger"
        });
        return;
    }

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])


    function getCommentAuthorIcon(comment) {
        const c = comment;
        const icons = [];


        if (c.author.isAdmin) {
            icons.push({
                icon: Crown,
                title: "Admin",
            });
        } else if (currentUserIsMod && c.author.id === currentUser.id) {
            icons.push({
                icon: Shield,
                title: "Moderator",
            });
        }

        if (c.author.id === postAuthor.id) {
            if (icons.length < 2) {
                icons.push({
                    icon: Feather,
                    title: "Original Poster",
                });
            }
        } else if (c.author.id === currentUser.id) {
            if (icons.length < 2) {
                icons.push({
                    icon: User,
                    title: "You",
                });
            }
        }

        return icons.length > 0 ? icons[0] : null;
    }

    // Render
    if (loading) return <ContentLoading size={34} />

    return (
        <>
            <div className="comments-container" ref={ref}>
                <h5>Comments {postComments.length > 0 && <>({postComments.length})</>}</h5>
                <form className="add-comment-form" onSubmit={makeComment}>
                    <InputBox
                        id="userComment"
                        value={selfComment}
                        onChange={e => setSelfComment(e.target.value)}
                        placeholder='Enter your comment...'
                    />
                    <div><Button type="submit" variant='primary'>Submit</Button></div>
                </form>
                <div className="post-comments">
                    {postComments.length > 0 && postComments.map((c) => {
                        const time = formatTimeData(c.createdAt);
                        const icons = getCommentAuthorIcon(c);
                        const isEditing = editingCommentId === c.id;
                        const isAuthor = c.author.id === currentUser.id;
                        const canUpdate = isAuthor;
                        const canDelete = isAuthor || currentUserIsMod || currentUser.isAdmin;
                        const startEditing = () => {
                            setEditingCommentId(c.id);
                            setUpdatedComment(c.content);
                        };

                        const cancelEditing = () => {
                            setEditingCommentId(null);
                            setUpdatedComment(null);
                        };

                        return (
                            <article className="comment" key={c.id}>
                                <div className="comment-header">
                                    <img
                                        onClick={() => navigate(NAVIGATION_PAGES.users.username(c.author.handle), "forwards")}
                                        src={API_URL_FROM_CONTENT_URL(c.author.icon)}
                                        alt={`${c.author.handle}'s profile picture`}
                                        className="user-avatar" />
                                    <div className="comment-author-info">
                                        <span onClick={() => navigate(NAVIGATION_PAGES.users.username(c.author.handle), "forwards")}
                                        >{c.author.handle}</span>
                                        {icons && (
                                            <span title={icons.title} className="author-role-icon">
                                                <icons.icon fill='var(--accent-color)' stroke="var(--accent-color)" size={15} />
                                            </span>
                                        )}
                                        •
                                        <span title={time.precise}>{time.relative}</span>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <form
                                        className="edit-comment-form"
                                        onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit(c.id); }}
                                    >
                                        <InputBox
                                            value={updatedComment} // Controlled input
                                            onChange={e => setUpdatedComment(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="edit-comment-actions">
                                            <Button type="submit" variant='primary' size="sm">
                                                <Save size={14} /> Save
                                            </Button>
                                            <Button type="button" variant='ghost' size="sm" onClick={cancelEditing}>
                                                <X size={14} /> Cancel
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="comment-content">{c.content}</p>
                                )}
                                <div className="comment-actions">
                                    {canUpdate && !isEditing && (
                                        <Button variant="link" size="sm" onClick={startEditing}>
                                            <Edit size={14} /> Edit
                                        </Button>
                                    )}
                                    {canDelete && !isEditing && (
                                        <Button variant="link" size="sm" className="danger-link" onClick={() => commentDelete(c.id)}>
                                            <Trash2 size={14} /> Delete
                                        </Button>
                                    )}
                                </div>

                            </article>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Comments