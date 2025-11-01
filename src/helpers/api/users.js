import { API_ENDPOINTS } from "../../../config";
import fileChecker from "../fileChecker";
import makeAxiosRequest from "../makeAxiosRequest";

const api = API_ENDPOINTS.users;

const getUserbyUsername = async (username) => {
    if (!username) return { status: 400, data: { message: "Username is required." } };
    const endpoint = api.getByUsername;
    const options = {
        method: endpoint.method,
        url: endpoint.url(username),
    };
    return await makeAxiosRequest(options);
}

const getUserbyId = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const endpoint = api.getById;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    };
    return await makeAxiosRequest(options);
}

const getUserbyEmail = async (email) => {
    if (!email) return { status: 400, data: { message: "Email is required." } };
    const endpoint = api.adminOnlyGetByEmail;
    const options = {
        method: endpoint.method,
        url: endpoint.url(email),
    };
    return await makeAxiosRequest(options);
}

const getAllUsers = async () => {
    const endpoint = api.adminOnlyGetAll
    const options = {
        method: endpoint.method,
        url: endpoint.url,
    };
    return await makeAxiosRequest(options);
}

const getCurrentUser = async () => {
    const endpoint = api.currentUser;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
    };
    return await makeAxiosRequest(options);
}

const searchForUser = async (query) => {
    if (!query) return { status: 400, data: { message: "Query is required." } };
    const endpoint = api.search;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params: { query }
    }
    return await makeAxiosRequest(options);
}

const updateUser = async (id, displayName, icon) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };

    const form = new FormData();
    form.append("DisplayName", displayName ?? null);

    const res = fileChecker(icon);
    if (res.status === 200) {
        form.append("Icon", icon);
    } else return res;

    const endpoint = api.update;

    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data: form
    };
    return await makeAxiosRequest(options);
}

const banUser = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const endpoint = api.adminOnlyBan;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    }
    return await makeAxiosRequest(options);
}

const unbanUser = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const endpoint = api.adminOnlyUnban;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    }
    return await makeAxiosRequest(options);
}

const promoteToAdmin = async (id) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const endpoint = api.adminOnlyPromote;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
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