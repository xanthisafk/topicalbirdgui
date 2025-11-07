import { API_ENDPOINTS } from "@/config";
import fileChecker from "@/helpers/fileChecker";
import makeAxiosRequest from "@/helpers/makeAxiosRequest";

const api = API_ENDPOINTS.nest;

export const getNestById = async (id) => {
    if (!id) return { status: 400, data: { message: "Nest Id is required." } };
    const endpoint = api.getById;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    };
    return await makeAxiosRequest(options);
}

export const getNestByTitle = async (title) => {
    if (!title) return { status: 400, data: { message: "Nest Title is required." } };
    const endpoint = api.getByTitle;
    const options = {
        method: endpoint.method,
        url: endpoint.url(title),
    };
    return await makeAxiosRequest(options);
}

export const searchForNests = async (query, pageNo = 1, limit = 20) => {
    if (!query) return { status: 400, data: { message: "Query is required." } };
    const endpoint = api.search;
    const options = {
        method: endpoint.method,
        url: endpoint.url(query),
        params: { pageNo, limit }
    }
    return await makeAxiosRequest(options);
}

export const getAllNests = async (pageNo = 1, limit = 20) => {
    const params = { pageNo, limit };
    const endpoint = api.getAll;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params
    }
    return await makeAxiosRequest(options);
}

export const getSelfNests = async () => {
    const endpoint = api.selfNests;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
    }
    return await makeAxiosRequest(options);
}

export const getNestByUsername = async (username) => {
    const endpoint = api.getUserNestByUsername;
    const options = {
        method: endpoint.method,
        url: endpoint.url(username)
    }
    return await makeAxiosRequest(options);
}

export const getNestByUserId = async (id) => {
    const endpoint = api.getUserNestById;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id)
    }
    return await makeAxiosRequest(options);
}

export const updateNest = async (id, description, displayName = "", icon = "") => {
    if (!id) return { status: 400, data: { message: "Nest Id is required." } };
    if (!description) return { status: 400, data: { message: "Nest description is required." } };

    const form = new FormData();

    if (icon) {
        const res = await fileChecker(icon);
        if (res !== 200) return res ;
        form.append("Icon", res.icon);
    }

    form.append("Description", description);
    form.append('DisplayName', displayName);

    const endpoint = api.update;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data: form
    };
    return await makeAxiosRequest(options);
}

export const createNewNest = async (title, description = "", displayName = "", icon = null) => {
    if (!title) return { status: 400, data: { message: "Nest title is required. " } };
    if (title.length < 3 || title.length > 50) return { status: 400, data: { message: "Nest title must be 3-50 characters long." } };
    if (description.length > 500) return { status: 400, data: { message: "Description can only be 500 characters long." } }
    if (displayName.length > 100) return { status: 400, data: { message: "Description can only be 100 characters long." } }

    const form = new FormData();
    if (icon) {
        const res = await fileChecker(icon);
        if (res !== 200) return res;
        form.append("Icon", res.icon);
    }

    form.append('Title', title);
    form.append('Description', description);
    form.append('DisplayName', displayName);

    const endpoint = api.create;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        data: form
    }

    return await makeAxiosRequest(options);

}