import ContentLoading from '@/components/ContentLoading';
import IconPreview from '@/components/IconPreview';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Loader from '@/components/ui/Loader';
import { API_DEFAULT_IMAGES, EVENT_LISTENER_KEYS, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { createNewNest, useViewNavigate } from '@/helpers';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';
import { useSnackbar } from '@/hooks/useSnackbar';
import { ChevronLeft, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import "@/styles/pages/nests/new-nest.css";

const NewNest = () => {
    const navigate = useViewNavigate();
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState(null);
    const [desc, setDesc] = useState("");
    const [name, setName] = useState("")

    const getCurrentUser = () => {
        let user = null;
        try {
            const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
            if (data) {
                user = JSON.parse(data);
            }
        } finally {
            setCurrentUser(user);
            setLoading(false);
        }
    }


    useEffect(() => {
        getCurrentUser();
        window.addEventListener(EVENT_LISTENER_KEYS.currentUser, getCurrentUser);
            return () => window.removeEventListener(EVENT_LISTENER_KEYS.currentUser, getCurrentUser);
    }, []);

    const handleFormSubmit = async (event) => {
        try {
            event.preventDefault();
            setFormLoading(true);

            let msg = null;

            if (!title) msg = "Title is required";
            else if (!desc) msg = "Description is required."

            if (msg !== null) {
                showSnackbar({
                    content: msg,
                    duration: 3,
                    icon: TriangleAlert,
                    type: "neutral"
                });
                return;
            }

            const res = await createNewNest(title, desc, name, icon);
            if (res.status === 200) {
                navigate(NAVIGATION_PAGES.nests.title(title), "forwards");
                return;
            }

            msg = formatErrorMessage(res);
            showSnackbar({
                content: msg,
                type: "danger",
                duration: 7,
                icon: TriangleAlert,
            });

        } finally {
            setFormLoading(false);
        }
    };


    const handleIconChange = (event) => {
        setIcon(event.blob);
    }



    if (loading) return <ContentLoading size={64} />
    if (!loading && currentUser === null) {
        navigate(NAVIGATION_PAGES.nests.base, "back");
        return;
    }



    return (
        <Layout>
            <form onSubmit={handleFormSubmit} className="create-nest-nest-form">
                <h3>Create a new nest</h3>
                <IconPreview
                    defaultImage={API_DEFAULT_IMAGES.nestPicture.image}
                    alt={API_DEFAULT_IMAGES.nestPicture.alt}
                    onChange={handleIconChange}
                />
                <div className="form-group">
                    <Label htmlFor="title"
                        helperText='Required'
                    >Title</Label>
                    <InputBox id="title" name="title"
                        placeholder="Something memorable"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Label htmlFor={"displayName"}
                        helperText='Required'
                    >Display Name</Label>
                    <InputBox id="displayName" name="displayName"
                        placeholder="A catchy name"
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Label htmlFor="desc"
                        helperText='Required'
                    >Description</Label>
                    <InputBox id="desc" name="desc"
                        placeholder="Describe your nest"
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <div className="form-action">
                    <Button type="button"
                    variant='secondary'
                    onClick={() => navigate(-1, "back")}
                >
                    <ChevronLeft />
                </Button>
                <Button type="submit">
                    {formLoading ? <Loader /> : "Submit"}
                </Button>
                </div>
            </form>
        </Layout>
    )
}

export default NewNest