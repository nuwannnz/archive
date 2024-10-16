import axios from "axios";
import { Domain } from "../types";

export const fetchDomain = async () => {
  try {
    const response = await axios.get<Domain>(
      `${process.env.REACT_APP_API_BASE_URL}/domains/public/${process.env.REACT_APP_DOMAIN_ID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
