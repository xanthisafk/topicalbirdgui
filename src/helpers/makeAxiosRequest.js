import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
});

const makeAxiosRequest = async (options) => {
    try {
        
        const response = await axiosInstance.request(options);
        return {
            status: response.status,
            data: response.data,
            pagination: response.data.pagination ?? null,
            content: response.data.content
        };
    } catch (ex) {
        if (ex.response) {
            return {
                status: ex.response.status,
                data: ex.response.data,
            };
        } else { // network issue
            return {
                status: null,
                data: { error: ex.message },
            };
        }
    }
};

export default makeAxiosRequest;
