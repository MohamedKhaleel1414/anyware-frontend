import axios from "axios";

export const axiosInstance2 = axios.create({
  baseURL: "http://localhost:4000/history",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance2.interceptors.request.use(
  (req) => {
    const logged = localStorage.getItem("authState")
    if(logged){
        let tokn = document.cookie.split("=")
        req.headers['auth'] = `${tokn[1]}`
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance2.interceptors.response.use(
    res =>{
        return res
    },
    error =>{
        Promise.reject(error)
    }
);
