import type React from "react";

export interface Route {
  path: string;
  page: React.FC<any>;
  layout?: React.FC<any>;
}

export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  lastActive: string;
  activeStatus: "OFFLINE" | "ONLINE";
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  birthDate: string;
  bio: string;
  avatar?: CustomFile;
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface CustomFile {
  id: number;
  url: string;
  fileName: string;
  fileType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}
