import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  (config) => {
    config.params = { name: Cookies.get("name") };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "https://concept-api2.herokuapp.com";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
