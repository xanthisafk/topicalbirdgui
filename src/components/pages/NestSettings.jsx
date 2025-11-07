import { getNestByTitle, updateNest, useViewNavigate } from '@/helpers';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentLoading from '../ContentLoading';
import { API_DEFAULT_IMAGES, API_URL_FROM_CONTENT_URL, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import { Check, ChevronLeft, Loader, TriangleAlert } from 'lucide-react';
import IconPreview from '../IconPreview';
import Label from '../ui/Label';
import InputBox from '../ui/Input';
import Button from '../ui/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { formatErrorMessage } from '@/helpers/formatErrorMessage';

import "@/styles/pages/nest-settings.css";

const NestSettings = () => {
  const { slug } = useParams();
  const navigate = useViewNavigate();
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [nest, setNest] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [defImage, setDefImage] = useState(API_DEFAULT_IMAGES.nestPicture.image);

  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const getCurrentUser = () => {
    let user = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
  }

  const fetchNest = async () => {
    const res = await getNestByTitle(slug);
    if (res.status === 200) {
      setNest(res.data.content);
      setDefImage(API_URL_FROM_CONTENT_URL(res.data.content.icon));
    }
  }

  const fetchData = async () => {
    try {
      getCurrentUser();
      await fetchNest();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleIconChange = e => setIcon(e.blob);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      setSubmitting(true);

      if (!description && !name && !icon) {
        return;
      }

      const res = await updateNest(
        nest.id,
        description || nest.description,
        name || nest.displayName,
        icon || null);

      console.log(res);

      if (res.status === 200) {
        showSnackbar({
          content: "Nest updated!",
          icon: Check,
          type: "success",
          duration: 3,
        });
        await fetchNest();
        return;
      }

      const msg = formatErrorMessage(res);
      showSnackbar({
        content: msg,
        icon: TriangleAlert,
        type: "danger",
        duration: 7,
      });

    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <ContentLoading size={64} />
  else if (!loading && !nest || !currentUser || nest?.moderator?.id !== currentUser?.id) {
    navigate(NAVIGATION_PAGES.home, "back");
    return;
  } else {
    return (
      <div className="nest-change-container">
        <Button onClick={() => navigate(NAVIGATION_PAGES.nests.title(slug), "back")}><ChevronLeft /></Button>
        <form className="nest-change-form" onSubmit={handleFormSubmit}>
          <h3> {`Edit n/${nest.title}`}</h3>
          <IconPreview onChange={handleIconChange} defaultImage={defImage} />
          <div className="nest-change-form-group">
            <Label htmlFor={"name"}>Display Name</Label>
            <InputBox onChange={e => setName(e.target.value)} id="name" name="name" placeholder={"What do you call it..."} />
          </div>
          <div className="nest-change-form-group">
            <Label htmlFor={"description"}>Description</Label>
            <InputBox onChange={e => setDescription(e.target.value)} id="description" name="description" placeholder={"What's it about..."} />
          </div>
          <Button type="submit">
            {submitting ? <Loader stroke='none' /> : "Save"}
          </Button>
        </form>
      </div>
    );
  }
};

export default NestSettings;