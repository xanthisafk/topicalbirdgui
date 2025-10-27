import { API_BASE_URL } from "../../../topicalbirdconfig";
import fileChecker from "../fileChecker";
import makeAxiosRequest from "../makeAxiosRequest";
import { validatePassword } from "../validatePassword";

const api_url = `${API_BASE_URL}/api/Auth`;

const logInUser = async (email, password, rememberMe) => {
    if (!email || !password) return { status: 400, data : {message: "Invalid data"}};
    const options = {
        method: "POST",
        url: `${api_url}/login`,
        data: { email, password, rememberMe }
    }

    return await makeAxiosRequest(options);
}

const logOutUser = async () => {
    const options = {
        method: "POST",
        url: `${api_url}/logout`
    };
    return await makeAxiosRequest(options);
}

const changePassword = async (password, newPassword, confirmPassword) => {
    if (!password || !newPassword || !confirmPassword) {
        return { status: 400, data: { message: "Invalid data" } };
    }

    const {isValid, message } = validatePassword(newPassword);
    if (!isValid) return { status: 400, data: { message }}

    if (newPassword !== confirmPassword) {
        return { status: 400, data: { message: "Passwords do not match." } };
    }

    const options = {
        method: "PATCH",
        url: `${api_url}/password`,
        data: { password, newPassword,confirmPassword }
    }

    return await makeAxiosRequest(options);
}

const createNewUser = async (email, password, confirmPassword, handle, displayName, icon) => {
    if (!email || !password || !handle) {
        return { status: 400, data: { message: "Please fill all required fields." } };
    }

    const emailRes = validatePassword(password);
    if (!emailRes.isValid) return { status: 400, data: { message: emailRes.message }}

    if (password !== confirmPassword) {
        return {
            status: 400, data: { message: "Passwords do not match." }
        };
    }

    const passRes = validatePassword(password);
    if (!passRes.isValid) return { status: 400, data: { message: passRes.message }}


    const finalDisplayName = displayName || handle;
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("handle", handle.toLowerCase());
    data.append("displayName", finalDisplayName);
    let hasIcon = false;
    if (icon) {
        const res = fileChecker(icon);
        if (res.status !== 200) {
            return res;
        }

        hasIcon = true;
    }
    data.append("icon", hasIcon ? icon : null);

    const options = {
        method: "POST",
        url: `${api_url}/register`,
        data
    }

    return await makeAxiosRequest(options);
}

export {
    logInUser,
    logOutUser,
    changePassword,
    createNewUser
}