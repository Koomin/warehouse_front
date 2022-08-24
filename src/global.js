import axios from "axios";
import { logout, refresh } from "./services/authenticationService";
import { debounce } from "@material-ui/core";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

var wasAlreadyWarning = false;
var wasAlreadyError = false;



axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    
    if(!!error.response){
      const { status } = error.response;
      if (status === 401 & error.response.data.detail !== 'Token is invalid or expired') {
          return refresh().then((token) => {
            if(token[1]) {
              let newToken = token[0]
              error.config.headers['Authorization'] = "Bearer " + {newToken};
              return axios.request(error.config);
            }
          });

      }else if(status === 404) {
        console.log(error.response.data.status || "Error!");
      }
       else {
        if(!wasAlreadyError) {
          wasAlreadyError = true;
          
          setTimeout(() => {wasAlreadyError = false}, 1000)
        } 
      }
    }
    return Promise.reject(error);
  }
);
