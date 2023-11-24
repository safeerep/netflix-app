import axios from "axios";
import { baseUrl } from "../components/Constants/constants";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance
