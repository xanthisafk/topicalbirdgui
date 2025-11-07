import { API_ENDPOINTS } from "@/config";
import makeAxiosRequest from "@/helpers/makeAxiosRequest";

const api = API_ENDPOINTS.comments;

export const deleteComment = async (id) => {
    if (!id) return { status: 400, data: { message: "Comment ID is required."}};
    const endpoint = api.delete;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id)
    };
    return await makeAxiosRequest(options);
}

export const getAllCommentOfPosts = async (id) => {
    if (!id) return { status: 400, data: { message: "Post ID is required."}};
    const endpoint = api.get;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id)
    };
    return await makeAxiosRequest(options);
}

export const updateComment = async (id, content) => {
    if (!id) return { status: 400, data: { message: "Comment ID is required."}};
    if (content.length < 1 || content.length > 10_000) return { status: 400, data: { message: "Comment size must be between 1 and 10,000 characters."}};
    const form = new FormData();
    form.append("Content", content);
    const endpoint = api.update;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data: form
    }
    return await makeAxiosRequest(options);
}

export const createNewComment = async (id, content) => {
    if (!id) return { status: 400, data: { message: "Post ID is required."}};
    if (content.length < 1 || content.length > 10_000) return { status: 400, data: { message: "Comment size must be between 1 and 10,000 characters."}};
    const form = new FormData();
    form.append("Content", content);
    const endpoint = api.create;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data: form
    }
    return await makeAxiosRequest(options);
}