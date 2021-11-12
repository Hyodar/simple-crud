
import axios from "axios";

class RequestHandler {
    static axios = axios.create({
        baseURL: "http://localhost:4000/",
    });
    static token = "";
}

RequestHandler.axios.interceptors.request.use(config => {
    if (RequestHandler.token) {
        config.headers.common["Authorization"] = `Bearer ${RequestHandler.token}`;
    }
    return config;
});

export default RequestHandler;
