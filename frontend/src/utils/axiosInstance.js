import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://notes-app-backend-tau.vercel.app/',
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },
});


export default axiosInstance;