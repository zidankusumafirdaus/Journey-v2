import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL,
  // baseURL: "/api", // For Development
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============ JWT INTERCEPTOR ============ */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/me";
    }
    return Promise.reject(error);
  }
);

/* ============ AUTH ============ */
// LOGIN
export const login = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

// GET PROFILE
export const getProfile = async () => {
  const { data } = await api.get("/admin");
  return data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

/* ============ NOTES ============ */
export const getNotes = async () => {
  const { data } = await api.get("/note");
  return Array.isArray(data) ? data : [data];
};
export const getNoteById = async (id) => {
  const { data } = await api.get(`/note/${id}`);
  return data;
};
export const createNote = async (noteData) => {
  const { data } = await api.post("/note", noteData);
  return data;
};
export const updateNote = async (id, noteData) => {
  const { data } = await api.put(`/note/${id}`, noteData);
  return data;
};
export const deleteNote = async (id) => {
  const { data } = await api.delete(`/note/${id}`);
  return data;
};

/* ============ PROJECTS ============ */
export const getProjects = async () => {
  const { data } = await api.get("/project");
  return Array.isArray(data) ? data : [data];
};
export const getProjectById = async (id) => {
  const { data } = await api.get(`/project/${id}`);
  return data;
};
export const createProject = async (projectData) => {
  const { data } = await api.post("/project", projectData);
  return data;
};
export const updateProject = async (id, projectData) => {
  const { data } = await api.put(`/project/${id}`, projectData);
  return data;
};
export const deleteProject = async (id) => {
  const { data } = await api.delete(`/project/${id}`);
  return data;
};