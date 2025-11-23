import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const adminInstance = axios.create({
  baseURL: apiUrl,
});

adminInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

adminInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${apiUrl}/api/admin/refresh`, {
          withCredentials: true,
        });
        return adminInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default adminInstance;
