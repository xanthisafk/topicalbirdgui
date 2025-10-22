import { API_BASE_URL } from "../../../topicalbirdconfig";
import fileChecker from "../fileChecker";
import makeAxiosRequest from "../makeAxiosRequest";

const api_url = API_BASE_URL + "/api/Users";

const getUserbyUsername = async (username) => {
    if (username == null) return null;
    const options = {
        method: "GET",
        url: api_url + "/get/username/" + encodeURI(username),
    };
    return await makeAxiosRequest(options);
}

const getUserbyId = async (id) => {
    if (id == null) return null;
    const options = {
        method: "GET",
        url: api_url + "/get/id/" + id,
    };
    return await makeAxiosRequest(options);
}

const getUserbyEmail = async (email) => {
    if (email == null) return null;
    const options = {
        method: "GET",
        url: api_url + "/get/email/" + email,
    };
    return await makeAxiosRequest(options);
}

const getAllUsers = async () => {
    const options = {
        method: "GET",
        url: api_url,
    };
    return await makeAxiosRequest(options);
}

const getCurrentUser = async () => {
    const options = {
        method: "GET",
        url: api_url + "/me",
    };
    return await makeAxiosRequest(options);
}

const searchForUser = async (query) => {
    const options = {
        method: "GET",
        url: api_url + "/search",
        params: { query }
    }
    return await makeAxiosRequest(options);
}

const updateUser = async (id, displayName, icon) => {
    if (!id) return { status: 400, data: { message: "User Id is required."}};

    const form = new FormData();
    form.append("DisplayName", displayName ?? null);

    const res = fileChecker(icon);
    if (res.status === 200) {
        form.append("Icon", icon);
    } else return res;

    const options = {
        method: 'PATCH',
        url: api_url + "/update/" + id,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: form
    };
    return await makeAxiosRequest(options);
}

const banUser = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required."}};
    const options = {
        method: 'PATCH',
        url: api_url + "/ban/" + id,
    }
    return await makeAxiosRequest(options);
}

const unbanUser = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required."}};
    const options = {
        method: 'PATCH',
        url: api_url + "/unban/" + id,
    }
    return await makeAxiosRequest(options);
}

const promoteToAdmin = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required."}};
    const options = {
        method: 'PATCH',
        url: api_url + "/promote/" + id,
    }
    return await makeAxiosRequest(options);
}



export {
    getUserbyUsername,
    getUserbyEmail,
    getUserbyId,
    getAllUsers,
    getCurrentUser,
    searchForUser,
    updateUser,
    banUser,
    unbanUser,
    promoteToAdmin,
}