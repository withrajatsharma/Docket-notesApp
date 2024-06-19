import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://notes-app-backend-tau.vercel.app',
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },
});

// axiosInstance.interceptors.request.use(
//     (config) =>{
//         const accessToken = localStorage.getItem('token');
//         if(accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//             };
//         return config;
//     },
//     (error)=>{
//         return Promise.reject(error);
//     }

    
// )

export default axiosInstance;