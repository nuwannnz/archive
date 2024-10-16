import { Auth } from "aws-amplify";
import axios from "axios";

const API = () => {
  // Create instance
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  // Set the Auth token for any request
  instance.interceptors.request.use(async (config) => {
    try {
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      config.headers.Authorization = token ?? "";
      config.headers["X-Domain"] = process.env.REACT_APP_DOMAIN ?? "";
    } catch (error) {
      console.log("error : ", error);
    }

    return config;
  });

  return instance;
};

export default API();
