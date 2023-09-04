import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});
export default api;