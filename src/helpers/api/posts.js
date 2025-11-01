import { API_BASE_URL } from "../../../config";
import fileChecker from "../fileChecker";
import makeAxiosRequest from "../makeAxiosRequest";

const api_url = API_BASE_URL + "/api/Posts";

import { API_ENDPOINTS as endpoints } from "../../../config";

const deletePostById = async (id) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    const options = {
        method: endpoints.users.method,
        url: endpoints.users.deletePostById(id),
    };
    return await makeAxiosRequest(options);
}

const getPostById = async (id) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    const options = {
        method: "GET",
        url: `${api_url}/${id}`,
    };
    return await makeAxiosRequest(options);
}

const getAllPostsByNest = async (nest, pageNo, limit) => {
    if (!nest) return { status: 400, data: { message: "Nest title is required." } };
    const options = {
        method: "GET",
        url: `${api_url}/nest`,
        params: {
            nestTitle: nest,
            pageNo: pageNo ?? 1,
            limit: limit ?? 20,
        }
    };
    return await makeAxiosRequest(options);
}


const getAllPostsByUserId = async (id, pageNo, limit) => {
    if (!id) return { status: 400, data: { message: "User Id is required." } };
    const options = {
        method: "GET",
        url: `${api_url}/user/id/${id}`,
        params: {
            pageNo: pageNo ?? 1,
            limit: limit ?? 20,
        }
    };
    return await makeAxiosRequest(options);
}

const getAllPostsByUsername = async (username, pageNo, limit) => {
    if (!username) return { status: 400, data: { message: "Username is required." } };
    const options = {
        method: "GET",
        url: `${api_url}/user/username/`,
        params: {
            userHandle: username,
            pageNo: pageNo ?? 1,
            limit: limit ?? 20,
        }
    };
    return await makeAxiosRequest(options);
}

const getLatestPosts = async (nest = null, pageNo = 1, limit=20) => {
    const params = {
        pageNo: pageNo || 1,
        limit: limit || 20,
    };
    if (nest) {
        params.nest = nest;
    } 
    const options = {
        method: endpoints.posts.latest.method,
        url: endpoints.posts.latest.url,
        params
    };
    return await makeAxiosRequest(options);
}

const getSortedPostsByNest = async (nest, sort, pageNo, limit) => {
    if (!nest) return { status: 400, data: { message: "Nest title is required." } };
    const options = {
        method: "GET",
        url: `${api_url}/${sort === "popular" ? "popular" : "latest"}`, // latest or popular
        params: {
            nest,
            pageNo: pageNo ?? 1,
            limit: limit ?? 20,
        }
    };
    return await makeAxiosRequest(options);
}

const updatePostContent = async (id, content) => {
    if (!id) return { status: 400, data: { message: "Post Id is required." } };
    if (!content) return { status: 400, data: { message: "Post content is required." } };

    const form = new FormData();
    form.append("Content", content);

    const options = {
        method: 'PATCH',
        url: `${api_url}/update/${id}`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: form
    };
    return await makeAxiosRequest(options);
}

const createNewPost = async (title, content, nest, images, alts) => {
    if (!title) return { status: 400, data: { message: "Post title is required." } };
    if (!content) return { status: 400, data: { message: "Content content is required." } };
    if (!nest) return { status: 400, data: { message: "Nest title is required." } };

    const form = new FormData();
    form.append("Title", title);
    form.append('Content', content);
    form.append('NestTitle', nest);
    alts.forEach(alt => form.append("Alts", alt));


    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const res = fileChecker(images[i]);
            if (res.status === 200) {
                form.append("Images", images[i]);
            } else return res;
        }
    }



    const options = {
        method: 'POST',
        url: `${api_url}/new`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: form
    };

    return await makeAxiosRequest(options);

}

export {
    deletePostById,
    getPostById,
    getAllPostsByNest,
    getAllPostsByUserId,
    getAllPostsByUsername,
    getSortedPostsByNest,
    updatePostContent,
    createNewPost,
    getLatestPosts
};


