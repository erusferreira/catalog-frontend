import axios from "axios";

export const http = axios.create({
  baseURL: `${process.env.VITE_APIADDRESS}:${process.env.VITE_APIPORT}`,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});
