import axios from "axios";

export const HttpClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
