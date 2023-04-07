import axios from "axios";

export const axiosInstance0 = axios.create({
  baseURL: "http://localhost:4000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance0.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance0.interceptors.response.use(
  (res) => {
    localStorage.setItem("authState",res.data)
    return res;
  },
  (error) => {
    Promise.reject(error);
  }
);
