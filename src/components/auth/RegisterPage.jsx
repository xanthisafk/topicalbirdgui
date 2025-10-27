import { useEffect, useState } from "react";
import { createNewUser } from "../../helpers/api/auth";
import InputLabel from "../ui/BoxLabel/Label";
import InputBox from "../ui/InputBox/Input";
import Button from "../ui/Button/Button";
import Loader from "../ui/Loader";
import { Edit2 } from "lucide-react";
import './RegisterPage.css';
import { API_BASE_URL } from "../../../topicalbirdconfig";

const RegisterPage = () => {
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("topicalbird_current_user"))) {
            window.location.href = "/";
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [icon, setIcon] = useState(null);
    const [iconPreview, setIconPreview] = useState({
        icon: `${API_BASE_URL}/content/assets/defaults/pp_256.png`,
        alt: "An egg",
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIcon(file);
            setIconPreview({
                icon: URL.createObjectURL(file),
                alt: file.name
            });
        }
    };

    const signUp = async () => {
        setLoading(true);
        setErr("");
        const res = await createNewUser(email, password, confirmPassword, handle, displayName, icon);
        setLoading(false);
        if (res.status === 200) {
            window.location.href = "/";
        } else {
            setErr(res.data.message);
            console.error(res);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Welcome to Topicalbird</h2>
            <div className="icon-upload-wrapper">
                <img src={iconPreview.icon} alt={iconPreview.alt} className="icon-preview" />
                <input id="icon" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleIconChange} />
                <button className="icon-upload-button" onClick={() => document.getElementById('icon').click()}>
                    <Edit2 size={20} className="edit-icon" />
                </button>
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
            <a className="login-link" href="/auth/login">Already have an account?</a>
        </div>
    );
};

export default RegisterPage;