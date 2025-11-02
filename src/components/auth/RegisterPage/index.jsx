import { useEffect, useRef, useState } from "react";
import { createNewUser } from "@/helpers/api";
import InputLabel from "@components/ui/BoxLabel/Label";
import InputBox from "@components/ui/InputBox/Input";
import Button from "@components/ui/Button";
import Loader from "@components/ui/Loader";
import './styles.css';
import { API_DEFAULT_IMAGES, LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from "@/config";
import IconPreview from "@/components/Icon/IconPreview";

const RegisterPage = () => {
    useEffect(() => {
        if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currentUser))) {
            window.location.href = NAVIGATION_PAGES.home;
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [displayName, setDisplayName] = useState("");
    const fileRef = useRef(0);
    
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const signUp = async () => {
        setLoading(true);
        setErr("");
        const icon = (fileRef.current && fileRef.current.files.length > 0) ? fileRef.current.files[0] : null;
        console.log(icon);
        if (!icon) return;
        const res = await createNewUser(email, password, confirmPassword, handle, displayName, icon);
        setLoading(false);
        if (res.status === 200) {
            window.location.href = NAVIGATION_PAGES.auth.login;
        } else {
            setErr(res.data.message);
            console.error(res);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Welcome to Topicalbird</h2>
            <div className="icon-preview-container">
                <IconPreview inputRef={fileRef} size={200} defaultImage={API_DEFAULT_IMAGES.userPicture.image} />
            </div>
            {err && <div className="register-error">{err}</div>}
            <div className="register-form">
                <div className="form-group">
                    <InputLabel htmlFor="email">Email<small className="required" title="Required">*</small></InputLabel>
                    <InputBox id="email" type="email" placeholder="Enter your email..." onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="password">Password<small className="required" title="Required">*</small></InputLabel>
                    <InputBox id="password" type="password" placeholder="Enter your password..." onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="confirmPassword">Confirm Password<small className="required" title="Required">*</small></InputLabel>
                    <InputBox id="confirmPassword" type="password" placeholder="Re-enter your password..." onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="username">Username<small className="required" title="Required">*</small></InputLabel>
                    <InputBox id="username" placeholder="Choose a unique username..." onChange={e => setHandle(e.target.value)} />
                </div>
                <div className="form-group">
                    <InputLabel htmlFor="displayName">Display Name</InputLabel>
                    <InputBox id="displayName" placeholder="Your friendly name..." onChange={e => setDisplayName(e.target.value)} />
                </div>
                <Button variant="primary" onClick={signUp} disabled={loading}>
                    {loading ? <Loader /> : 'Register'}
                </Button>
            </div>
            <a className="login-link" href={NAVIGATION_PAGES.auth.login}>Already have an account?</a>
        </div>
    );
};

export default RegisterPage;