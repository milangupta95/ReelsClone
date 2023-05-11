import axios from "axios";

const api = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});
export default api;