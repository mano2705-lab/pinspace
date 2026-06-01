import axios from "axios";

const API = axios.create({
  baseURL: "https://pinspace-backend.onrender.com/api",
});

export default API;