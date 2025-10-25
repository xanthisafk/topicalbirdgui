import { useState } from "react";
import { logOutUser } from "../../helpers/api/auth";
import "./LogoutPopup.css";

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
                <button className="btn btn-confirm" onClick={logout}>Yes, Log Out</button>
                <button className="btn btn-cancel" onClick={() => popupRef.current?.close()}>Cancel</button>
            </div>
        </div>
    );
};

export default LogOutPopup;
