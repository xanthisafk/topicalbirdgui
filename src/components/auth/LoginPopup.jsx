import { useState } from "react";
import { logInUser } from "../../helpers/api/auth";

const LoginPopup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [invalidFormMsg, setInvalidFormMsg] = useState("");
    
    const login = async () => {
        let msg = "";
        if (!email) msg += "Please enter email\n";
        if (!password) msg += "Please enter password\n";
        if (msg != "") {
            setInvalidFormMsg(msg);
            return;
        };

        const res = await logInUser(email, password, rememberMe);
        if (res.status === 200) {
            localStorage.setItem("topicalbird_current_user", JSON.stringify(res.data.content));
            window.location.reload();
        }
    }


}

export default LoginPopup;