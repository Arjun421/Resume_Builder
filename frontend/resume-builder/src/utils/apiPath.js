// utils/apiPaths.js

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
  },

  RESUME: {
    CREATE: "/resume",
    GET_ALL: "/resume",
    GET_BY_ID: (id) => `/resume/${id}`,
    UPDATE: (id) => `/resume/${id}`,
    DELETE: (id) => `/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/resume/${id}/upload-images`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
};
