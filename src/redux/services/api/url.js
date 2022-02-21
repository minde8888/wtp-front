import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {  setToken} from '../../actions/token';
import getToken from '../../../componets/auth/token/getToken';
import {  connect } from "react-redux";



  const instance = require('axios').create({
    baseURL: 'https://localhost:44395/'
  });
  
  instance.interceptors.request.use(
    (config) => {
      console.log(getToken());
      config.headers = config.headers ?? {
        Authorization: getToken()
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest) => {
    console.log('failedRequest', failedRequest);
    return instance.post("api/Auth/RefreshToken", {
        token: getToken(),
        refreshToken: localStorage.getItem("refreshToken")
      })
      .then((response) => {
        const {
          token,
          refreshToken
        } = response.data;
        setToken(token);
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        response.config.headers = {
          Authorization: getToken()
        };
        return Promise.resolve();
      })
      .catch((err) => {
        console.log('error', err)
        // removeLocalStorageData();
        // fireSessionTimeoutAlert(err);
        return Promise.reject(err);
      });

  }

  createAuthRefreshInterceptor(instance, refreshAuthLogic);

  export default instance;











