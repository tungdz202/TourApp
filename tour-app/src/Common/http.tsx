import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default api;
