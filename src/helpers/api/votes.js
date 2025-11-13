import { API_ENDPOINTS } from "@/config";
import makeAxiosRequest from "@/helpers/makeAxiosRequest";

const api = API_ENDPOINTS.vote;

export const getScoreOfPost = async (id) => {
    if (!id) return { status: 400, data: { message: "Post ID is required."}};
    const endpoint = api.score;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id)
    };
    return await makeAxiosRequest(options);
}

export const castVote = async (id, value) => {
    if (!id) return { status: 400, data: { message: "Post ID is required."}};
    if (value > 1 || value < -1) return { status: 400, data: { message: "Invalid vote value. 1 for upvote, -1 for downvote, 0 for remove vote."}};
    const data = {
        voteValue: value,
    }
    const endpoint = api.cast;
    const options = {
        method: endpoint.method,
        url: endpoint.url(id),
        data,
    }
    return await makeAxiosRequest(options);
}