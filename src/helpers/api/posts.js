import { API_ENDPOINTS } from "@/config";
import fileChecker from "@/helpers/fileChecker";
import makeAxiosRequest from "@/helpers/makeAxiosRequest";

const api = API_ENDPOINTS.posts;

export const deletePostById = async (id) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    const endpoint = api.deletePostById;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    };
    return await makeAxiosRequest(options);
}

export const getPostById = async (id) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    const endpoint = api.getPostById;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
    };
    return await makeAxiosRequest(options);
}

export const getAllPostsByNest = async (nest, pageNo, limit) => {
    if (!nest) return { status: 400, data: { message: "Nest title is required." } };
    const endpoint = api.getAllPostsByNest;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params: {
            nestTitle: nest,
            pageNo, limit,
        }
    };
    return await makeAxiosRequest(options);
}


export const getAllPostsByUserId = async (id, pageNo = 1, limit = 20) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const endpoint = api.getAllPostsByUserId;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        params: { pageNo, limit }
    };
    return await makeAxiosRequest(options);
}

export const getAllPostsByUsername = async (username, pageNo, limit) => {
    if (!username) return { status: 400, data: { message: "Username is required." } };
    const endpoint = api.getAllPostsByUsername;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params: {
            userHandle: username,
            pageNo, limit,
        }
    };
    return await makeAxiosRequest(options);
}

export const getLatestPosts = async (nest = null, pageNo = 1, limit = 20) => {
    const params = { pageNo, limit };
    if (nest) {
        params.nest = nest;
    }
    const endpoint = api.latest;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params
    };
    return await makeAxiosRequest(options);
}

export const getPopularPosts = async (nest = null, pageNo = 1, limit = 20) => {
    const params = { pageNo, limit };
    if (nest) {
        params.nest = nest;
    }
    const endpoint = api.popular;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        params
    };
    return await makeAxiosRequest(options);
}

export const updatePostContent = async (id, content) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    if (!content) return { status: 400, data: { message: "Post content is required." } };

    const form = new FormData();
    form.append("Content", content);
    const endpoint = api.update;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data: form
    };
    return await makeAxiosRequest(options);
}

export const createNewPost = async (title, content, nest, images, alts) => {
    if (!title) return { status: 400, data: { message: "Post title is required." } };
    if (!content) return { status: 400, data: { message: "Content is required." } };
    if (!nest) return { status: 400, data: { message: "Nest title is required." } };

    const form = new FormData();
    form.append("Title", title);
    form.append('Content', content);
    form.append('NestTitle', nest);
    if (alts && Array.isArray(alts)) {
        alts.forEach(alt => form.append("Alts", alt));
    }


    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const res = fileChecker(images[i]);
            if (res.status === 200) {
                form.append("Images", images[i]);
            } else return res;
        }
    }
    const endpoint = api.create;
    const options = {
        method: endpoint.method,
        url: endpoint.url,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: form
    };

    return await makeAxiosRequest(options);

}