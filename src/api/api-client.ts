import { appConfig } from "@/app/config/config";
import { useLoading } from "@/components/LoadingSpinner/useLoading";
import { useAppStore } from "@/stores/useAppStore";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

declare module "axios" {
    interface AxiosRequestConfig {
        skipRequestInterceptor?: boolean;
        skipResponseInterceptor?: boolean;
        skipLoadingInterceptor?: boolean;
        skipAllInterceptors?: boolean;
    }
}

const apiClient = axios.create({
    baseURL: appConfig.apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

const pendingRequests = new Map<string, AbortController>();

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (config.skipAllInterceptors || config.skipRequestInterceptor) {
            return config;
        }

        // Add token if exist
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Create unique key for this request
        const requestKey = `${config.method}-${config.url}`;
        // Create abort controller for this request
        const controller = new AbortController();
        config.signal = controller.signal;
        // Store the controller
        pendingRequests.set(requestKey, controller);
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        // Remove completed request from pending map
        const requestKey = `${response.config.method}-${response.config.url}`;
        pendingRequests.delete(requestKey);
        return response;
    },
    async (error) => {
        // Remove failed request from pending map
        if (error.config) {
            const requestKey = `${error.config.method}-${error.config.url}`;
            pendingRequests.delete(requestKey);
        }

        if (error.config?.skipAllInterceptors || error.config?.skipResponseInterceptor) {
            return Promise.reject(error);
        }

        // Handle canceled requests - don't show error toast
        if (error.code === "ERR_CANCELED" || error.message === "canceled") {
            return Promise.reject(error);
        }

        // Handle network errors (CORS, no internet, etc.)
        if (!error.response) {
            if (error.code === "ERR_NETWORK") {
                toast.error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.");
            } else if (error.code === "ECONNABORTED") {
                toast.error("Yêu cầu hết thời gian chờ");
            } else {
                toast.error("Không thể kết nối đến máy chủ");
            }
            return Promise.reject(error);
        }

        const { data, status } = error.response;
        const errorData = data?.errors;
        const errorMessage = data?.message;

        // Handle validation errors
        if (errorData && typeof errorData === "object") {
            const errorFields = Object.keys(errorData);
            if (errorFields.length > 0) {
                // Show only first error to avoid spam
                const firstField = errorFields[0];
                const messages = errorData[firstField];
                if (Array.isArray(messages) && messages.length > 0) {
                    toast.error(`${firstField}: ${messages[0]}`);
                }
            }
        }
        // Handle general error message
        else if (errorMessage) {
            toast.error(errorMessage);
        }
        // Handle by status code
        else {                    
            const navigate = useNavigate();

            switch (status) {
                case 400:
                    toast.error("Dữ liệu không hợp lệ");
                    break;
                case 401:
                    // Cancel all pending requests
                    pendingRequests.forEach((controller) => {
                        controller.abort();
                    });
                    pendingRequests.clear();

                    toast.error("Yêu cầu xác thực");
                    useAppStore.getState().logout();

                    navigate("/login");
                    break;
                case 403:
                    toast.error("Không có quyền truy cập");
                    break;
                case 404:
                    toast.error("Không tìm thấy tài nguyên");
                    break;
                case 500:
                    toast.error("Lỗi máy chủ");
                    break;
                default:
                    toast.error("Có lỗi xảy ra");
                    break;
            }
        }

        return Promise.reject(error);
    }
);

function SetupAxiosSpinnerInterceptors() {
    const { incrementLoading, decrementLoading } = useLoading();

    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {
                // Skip loading if skipAllInterceptors or skipLoadingInterceptor is true
                if (!config.skipAllInterceptors && !config.skipLoadingInterceptor) {
                    incrementLoading();
                }
                return config;
            },
            (error) => {
                // Always decrement on error (in case it was incremented)
                if (!error.config?.skipAllInterceptors && !error.config?.skipLoadingInterceptor) {
                    decrementLoading();
                }
                return Promise.reject(error);
            },
        );

        // Add a response interceptor
        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => {
                // Skip loading decrement if interceptor was skipped
                if (!response.config.skipAllInterceptors && !response.config.skipLoadingInterceptor) {
                    decrementLoading();
                }
                return response;
            },
            (error) => {
                // Always decrement on error (in case it was incremented)
                if (!error.config?.skipAllInterceptors && !error.config?.skipLoadingInterceptor) {
                    decrementLoading();
                }
                return Promise.reject(error);
            },
        );

        // Clean up interceptors when the component unmounts
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.response.eject(responseInterceptor);
        };
    }, [incrementLoading, decrementLoading]);

    return null; // This component doesn't render anything
}

export default apiClient;
export { SetupAxiosSpinnerInterceptors };

