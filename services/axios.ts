import axios from 'axios';

const axiosInstance = axios.create({
   baseURL:  "https://microservice.baerp.com", // e.g., http://localhost:4000/api
  //  baseURL:"http://localhost:5111"
});

axiosInstance.interceptors.request.use(
  (config) => {
    // if (typeof window !== 'undefined') {
    //   const token = localStorage.getItem('token');
    //   if (token) {
        //   }
    // }
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ4MGZhZmM5NjkwMGQ1MzUxMzdkN2YiLCJmaXJzdE5hbWUiOiJTaGl2YW0iLCJsYXN0TmFtZSI6IkthcGFyIiwiZW1haWwiOiJzaGl2YW1AYnJpaGF0aW5mb3RlY2guY29tIiwiY291bnRyeUNvZGUiOiIrOTEiLCJjb250YWN0TnVtYmVyIjoiOTg5OTIzNzIzNiIsInJlZ2lzdHJhdGlvblN0ZXAiOjUsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ5ODQ5NjkyLCJleHAiOjE3ODEzODU2OTJ9.yeIZZiYNGqIXscegvQCBd3l10fZJ4BD7EoxKMZi-ZRw`;
    config.headers.isMobile = true;
    config.headers.business = "68480fafc96900d535137d7f"
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
