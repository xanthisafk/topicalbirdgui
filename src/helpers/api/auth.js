import { API_ENDPOINTS } from "@/config";

import makeAxiosRequest from "@/helpers/makeAxiosRequest";
import { validatePassword } from "@/helpers/validatePassword";
import fileChecker from "@/helpers/fileChecker";

const api = API_ENDPOINTS.auth;

export const logInUser = async (email, password, rememberMe) => {
    if (!email || !password) return { status: 400, data : {message: "Invalid data"}};
    const options = {
        method: api.login.method,
        url: api.login.url,
        data: { email, password, rememberMe }
    }

    return await makeAxiosRequest(options);
}

export const logOutUser = async () => {
    const options = {
        method: api.logout.method,
        url: api.logout.url,
    };
    return await makeAxiosRequest(options);
}

export const changePassword = async (password, newPassword, confirmPassword) => {
    if (!password || !newPassword || !confirmPassword) {
        return { status: 400, data: { message: "Invalid data" } };
    }

    const {isValid, message } = validatePassword(newPassword);
    if (!isValid) return { status: 400, data: { message }}

    if (newPassword !== confirmPassword) {
        return { status: 400, data: { message: "Passwords do not match." } };
    }

    const options = {
        method: api.changePassword.method,
        url: api.changePassword.url,
        data: { oldPassword: password, newPassword }
    }

    return await makeAxiosRequest(options);
}

export const createNewUser = async (email, password, confirmPassword, handle, displayName, icon) => {
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
        method: api.create.method,
        url: api.create.url,
        data
    }

    return await makeAxiosRequest(options);
}