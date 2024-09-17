import axios from "axios";
import Cookies from "js-cookie";

const Http = axios.create({
  baseURL: "https://api.okamel.info/DashboardApi",
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: "Bearer " + Cookies.get("_auth"),
  },
});

export default Http;
