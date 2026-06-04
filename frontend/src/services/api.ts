import axios from "axios";

const api = axios.create({
  baseURL: "https://medintel-ai-75k0.onrender.com"
})

export default api;