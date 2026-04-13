const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// Auth
export const authAPI = {
  register: (body) =>
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  login: (body) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  getMe: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: getHeaders() }).then(
      handleResponse,
    ),
};

// Projects
export const projectAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/projects`, { headers: getHeaders() }).then(
      handleResponse,
    ),
  getOne: (id) =>
    fetch(`${BASE_URL}/projects/${id}`, { headers: getHeaders() }).then(
      handleResponse,
    ),
  create: (body) =>
    fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  update: (id, body) =>
    fetch(`${BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  delete: (id) =>
    fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),
};

// Tasks
export const taskAPI = {
  getAll: (projectId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/projects/${projectId}/tasks?${query}`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },
  create: (projectId, body) =>
    fetch(`${BASE_URL}/projects/${projectId}/tasks`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  update: (projectId, taskId, body) =>
    fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),
  delete: (projectId, taskId) =>
    fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleResponse),
};
