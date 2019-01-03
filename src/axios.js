import Axios from "axios";
const axios = Axios.create({
  baseURL: "http://localhost:8000",
  headers: { token: localStorage.getItem("token") }
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      //place your reentry code
      window.location.href = "/log_in";
    }
    return error;
  }
);

export default axios;
