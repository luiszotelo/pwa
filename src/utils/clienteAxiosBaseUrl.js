import axios from "axios";
export const clienteAxiosBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
