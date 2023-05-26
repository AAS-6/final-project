import axios from "axios";

export const instance = axios.create({
  baseURL: "http:/localhost/api/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
