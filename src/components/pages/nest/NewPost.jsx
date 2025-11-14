import ContentLoading from '@/components/ContentLoading';
import Button from '@/components/ui/Button';
import { Carousel } from '@/components/ui/Carousel';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { ACCEPTABLE_FILE_FORMATS_JOINED, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { createNewPost, getNestByTitle, useViewNavigate } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import { useSnackbar } from '@/hooks/useSnackbar';
import { ChevronLeft, Info, Trash, Trash2, TriangleAlert } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import "@/styles/pages/nests/new-post.css";
import FileDropzone from '@/components/FileDropZone';

const NewPost = () => {
    const { slug } = useParams();
    const navigate = useViewNavigate();
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [nest, setNest] = useState(null);
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);

    const inputRef = useRef(null);

    /** Get the current logged-in user from localStorage */
    const getCurrentUser = () => {
        let temp = { id: null };
        try {
            const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
            if (data) temp = JSON.parse(data);
        } finally {
            if (!temp.id) {
                navigate(-1, 'back');
            } else {
                setUser(temp);
            }
        }
    };

    /** Fetch nest info by slug */
    const fetchNest = async () => {
        const res = await getNestByTitle(slug);
        if (res.status === 200) {
            setNest(res.data.content);
            return res.data.content;
        }
        navigate(-1, 'back');
    };

    /** Initial setup: load user and nest */
    const fetchData = async () => {
        try {
            getCurrentUser();
            await fetchNest();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.addEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
        return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, fetchData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    /** Handle new post submission */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!title || !content) {
            showSnackbar({
                content: 'Title and content are required.',
                duration: 3,
                icon: Info,
            });
            return;
        }

        const img = [];
        const alts = [];

        for (let i = 0; i < media.length; i++) {
            img.push(media[i].image);
            alts.push(media[i].alt);
        }

        const res = await createNewPost(title, content, nest.title, img, alts);
        if (res.status === 200) {
            navigate(NAVIGATION_PAGES.post.id(res.data.content.id), 'forwards');
            return;
        }

        const msg = formatErrorMessage(res);
        showSnackbar({
            content: msg,
            type: 'danger',
            duration: 5,
            icon: TriangleAlert,
        });
    };

    /** Handle image uploads */
    const handleFileChange = (e) => {
        const files = Array.from(e.files);
        if (files.length === 0) return;

        if (media.length + files.length > 10) {
            showSnackbar({
                content: 'You can upload a maximum of 10 images.',
                type: 'warning',
            });
            inputRef.current.files = [];
            return;
        }

        const newMedia = files.map((file) => ({
            image: file,
            url: URL.createObjectURL(file),
            alt: '',
            id: `${file.name}-${file.size}-${file.lastModified}`,
        }));

        setMedia((prev) => {
            const map = new Map(prev.map((item) => [item.id, item]));
            newMedia.forEach((item) => map.set(item.id, item)); // avoid duplicates
            return Array.from(map.values());
        });
    };

    /** Update alt text */
    const handleAltChange = (id, value) => {
        setMedia((prev) =>
            prev.map((item) => (item.id === id ? { ...item, alt: value } : item))
        );
    };

    /** Remove an image */
    const handleRemoveImage = (id) => {
        setMedia((prev) => prev.filter((item) => item.id !== id));
    };

    /** Reset form */
    const handleReset = () => {
        try {
            setTitle("");
            setContent("");
            setMedia([]);
            inputRef.current.files = [];
        } catch (ex) {
            console.error(ex);
        }
    }

    if (loading) return <ContentLoading size={64} />;
    if (!user || !nest) {
        navigate(-1, 'back');
        return null;
    }

    return (
        <div className="new-post-wrapper">
            <div className="new-post-header">
                <h3 className="new-post-title">Create new post</h3>
                <span className="new-post-subtitle">in n/{slug}</span>
            </div>

            <form className="new-post-form" onSubmit={handleFormSubmit}>
                {/* Title Field */}
                <div className="form-group">
                    <Label htmlFor="title">Title</Label>
                    <InputBox
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="A catchy title..."
                    />
                </div>

                {/* Content Field */}
                <div className="form-group">
                    <Label htmlFor="content">Content</Label>
                    <InputBox
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content..."
                        multiline
                    />
                </div>

                {/* Uploaded Images Preview */}
                {media.length > 0 && (
                    <div className="uploaded-images-container">
                        {media.map((item) => (
                            <div key={item.id} className="uploaded-image-item">
                                <img
                                    src={item.url}
                                    alt={item.alt}
                                    className="uploaded-image-preview"
                                />
                                <div className="uploaded-image-details">
                                    <InputBox
                                        name="alt"
                                        value={item.alt}
                                        onChange={(e) => handleAltChange(item.id, e.target.value)}
                                        placeholder="Caption"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => handleRemoveImage(item.id)}
                                        variant='danger'
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* File Input */}
                <div className="form-group file-upload-group">
                    <Label htmlFor="media">Upload images</Label>
                    <FileDropzone
                     id="media"
                        ref={inputRef}
                        onChange={handleFileChange}
                        type="file"
                        accept={ACCEPTABLE_FILE_FORMATS_JOINED}
                        multiple={true}
                     />
                    <small className="file-upload-hint">
                        You can upload up to 10 images.
                    </small>
                </div>

                {/* Submit */}
                <div className="form-actions">
                    <div>
                        <Button type="button" variant='secondary' onClick={() => navigate(-1, "back")}>
                            <ChevronLeft /> Back
                        </Button>
                    </div>
                    <div>
                        <Button type="submit">
                        Publish
                    </Button>
                    <Button variant='danger' type="Button" onClick={handleReset}>
                        Reset
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
