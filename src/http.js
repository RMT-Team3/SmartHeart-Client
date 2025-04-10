import axios from "axios";
const http = axios.create({
  baseURL: "https://server.thom.web.id/"
});

export default http;
