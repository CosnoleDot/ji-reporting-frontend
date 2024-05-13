import axios from "axios";
const env = process.env.REACT_APP_ENV || "production";
const instance = axios.create({
  baseURL: "https://ji-reporting-backend.vercel.app/api/v1/",

  headers: {
    "Content-Type": "application/json", // Set default headers
    // Add other default headers if needed
  },
});

export default instance;
