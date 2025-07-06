import axios from "axios";
import Swal from "sweetalert2";
import { logOutSuccess } from "../redux/authSlice";
import { store } from "../redux/store";
import { routes } from "../routes";
import { getNavigate } from "../utils/navigation";
import { refreshToken } from "./auth";

// Tạo axios instance với base config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${response}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logOutSuccess());
        await Swal.fire({
          title: "Phiên đăng nhập đã hết hạn!",
          text: "Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại.",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            getNavigate()(routes.login);
          }
        });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
