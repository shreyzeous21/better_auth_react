import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-api-secret": import.meta.env.VITE_API_SECRET,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.res?.status;
    const message = error?.response?.data?.error || "Something went wrong!";

    if (status === 401) {
      console.error("Unauthorized:", message);
    }

    if (status === 403) {
      console.error("Forbidden:", message);
    }

    if (status === 404) {
      console.error("Not found:", message);
    }

    if (status === 409) {
      console.error("Conflict:", message);
    }

    if (status === 500) {
      console.error("Internal Server Error:", message);
    }
    return Promise.reject(error);
  },
);
