import { API_BASE_URL } from "../../../topicalbirdconfig";
import makeAxiosRequest from "../makeAxiosRequest";

const api_url = `${API_BASE_URL}/api/Auth`;

const logInUser = async (email, password, rememberMe) => {
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

export {
    logInUser,
    logOutUser,
}