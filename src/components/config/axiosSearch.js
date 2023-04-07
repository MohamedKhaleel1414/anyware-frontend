import axios from "axios";

export const axiosInstance1 = axios.create({
    baseURL:"https://api.apilayer.com/number_verification",
    headers:{
        "apikey":"KzLLEvDsnlpz7KxyaMvMEnjC6Vsgwnfp"
    },
    redirect:"follow",
})