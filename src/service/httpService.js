import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
  }
  return Promise.reject(error);
});

// www.pfmapi.ngf.org.ng

const http = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:5020/api/v1",
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

function showSuccess(message, setFeedback) {
  toast.success(`Success: ${message}`);
}

function showFeedback(ex) {
  const res = ex?.response;
  const error = ex?.response?.data;
  let errorMessage = "";

  if (Array?.isArray(error?.message)) {
    errorMessage = Object.values(error?.message[0])[0];
  } else if (typeof error?.message === "object") {
    errorMessage = Object.values(error?.message)[0];
  } else if (typeof error?.message === "string") {
    errorMessage = String(error?.message);
  } else if (typeof error === "string" && error?.length < 255) {
    errorMessage = error;
  }

  if (res && res.status >= 400 && res.status < 500) {
    toast.error(errorMessage);
  } else if (res && res.status >= 500) {
    toast.error("An unrespected error occurred.");
  } else if (typeof res === "string") {
    toast.error(res);
  }
}
const requests = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  all: http.all,
  axios: http,
  showFeedback,
  showSuccess,
};

export default requests;
