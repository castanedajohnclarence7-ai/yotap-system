// API client configuration
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/yotap-system/server/api/",
});

export default api;