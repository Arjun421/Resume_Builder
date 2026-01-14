// utils/apiPaths.js

export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",        // Signup
    LOGIN: "/auth/login",              // Authenticate user & return JWT token
    GET_PROFILE: "/auth/profile",      // Get logged-in user details
  },

  RESUME: {
    CREATE: "/resume",                 // POST - Create a new resume
    GET_ALL: "/resume",                // GET - Get all resumes of logged-in user
    GET_BY_ID: (id) => `/resume/${id}`,  // GET - Get a specific resume
    UPDATE: (id) => `/resume/${id}`,     // PUT - Update a resume
    DELETE: (id) => `/resume/${id}`,     // DELETE - Delete a resume
    UPLOAD_IMAGES: (id) => `/resume/${id}/upload-images`, // PUT - Upload images
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
};
