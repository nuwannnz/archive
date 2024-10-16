import { Auth } from "aws-amplify";
import axios from "axios";

// Create instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// Set the Auth token for any request
export default instance.interceptors.request.use(async (config) => {
  try {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    config.headers.Authorization = token ?? "";
    config.headers["X-Domain"] = process.env.NEXT_PUBLIC_DOMAIN ?? "";
  } catch (error) {
    console.log("error : ", error);
  }

  return config;
});

export const axiosInstance = instance;

export const fetcher = (url: string) =>
  instance.get(url).then((res) => res.data);
