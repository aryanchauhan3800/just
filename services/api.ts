import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: 'https://microservice.baerp.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const initializeCsrfToken = async (otpToken: string) => {
    try {
        const response = await api.get("/csrf-token", {
            withCredentials: true,
            headers: {
                "X-OTP-Token": otpToken,
            },
        });

        console.log("CSRF token initialized:", response);
        return response;
    } catch (error) {
        console.error("Failed to initialize CSRF token:", error);
        throw error;
    }
};

export const ensureCsrfToken = async () => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (!csrfToken) {
        try {
            await api.get("/csrf-token");
            console.log("Initialized CSRF token for registration");
            return true;
        } catch (error) {
            console.error("Failed to initialize CSRF token for registration:", error);
            return false;
        }
    }
    return true;
};

api.interceptors.request.use(
    async (config) => {
        if (config.url?.includes('/csrf-token')) {
            return config;
        }

        const csrfToken = Cookies.get('XSRF-TOKEN');
        console.log('Current CSRF token from cookies:', csrfToken);

        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
            console.log('Added CSRF token to request:', csrfToken);
        } else {
            console.warn('No CSRF token found in cookies');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 419 || error.response?.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;

            console.log('CSRF token might be expired or user is unauthorized, redirecting to login...');
            window.location.href = '/sign-in';

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;