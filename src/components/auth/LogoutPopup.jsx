import { useState } from "react";
import { logOutUser } from "../../helpers/api/auth";
import "./LogoutPopup.css";
import Button from "../ui/Button/Button";

const LogOutPopup = () => {
    const [err, setErr] = useState("");

    const logout = async () => {
        const res = await logOutUser();
        if (res.status === 200) {
            localStorage.removeItem("topicalbird_current_user");
            window.location.reload();
        } else {
            console.error(res);
            setErr("Something went wrong while trying to log out.");
        }
    };

    return (
        <div className="logout-container">
            <h2 className="logout-title">Log Out</h2>
            <p className="logout-message">Are you sure you want to log out?</p>

            {err && <p className="logout-error">{err}</p>}

            <div className="logout-actions">
                <Button onClick={logout}>Yes, Log Out</Button>
                <Button variant="danger" onClick={() => popupRef.current?.close()}>Cancel</Button>
            </div>
        </div>
    );
};

export default LogOutPopup;
