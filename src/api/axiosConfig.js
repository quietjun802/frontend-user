import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // ← 임시 API or 네 서버 주소
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
