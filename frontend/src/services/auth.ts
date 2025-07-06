import { fetchEnd, fetchStart } from "../redux/appSlice.ts";
import { logOutSuccess, refreshTokenSuccess } from "../redux/authSlice.ts";
import { store } from "../redux/store.ts";
import type {
    LoginRequest,
    RegisterRequest,
    UserLoginResponse,
} from "../types/index.ts";
import api from "./api.ts";

export const login = async (
  loginRequest: LoginRequest
): Promise<UserLoginResponse> => {
  try {
    const response = await api.post("/auth/login", loginRequest);
    const data: UserLoginResponse = response.data;
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const refreshToken = async (): Promise<string> => {
  store.dispatch(fetchStart());
  try {
    const response = await api.post("/auth/refresh");
    const data: string = response.data;
    store.dispatch(refreshTokenSuccess(data));
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    store.dispatch(fetchEnd());
  }
};

export const register = async (
  signUpRequest: RegisterRequest
): Promise<void> => {
  try {
    const response = await api.post("/auth/register", signUpRequest);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  store.dispatch(fetchStart());
  try {
    await api.post(`/auth/logout`);
    store.dispatch(logOutSuccess());
  } catch (error: any) {
    return Promise.reject(error);
  } finally {
    store.dispatch(fetchEnd());
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await api.post(`/auth/forgot-password`, email);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
