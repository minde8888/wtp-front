import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { setToken } from '../../actions/auth';
import authHeader from './header';
import store from "../../store"



const api = require('axios').create({
  baseURL: 'https://localhost:44395/'
});

api.interceptors.request.use(
  (config) => {
    config.headers = authHeader()
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = async (failedRequest) => {
  return api.post("api/Auth/RefreshToken", {
   token:localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken")
  })
    .then((response) => {
      const {
        token,
        refreshToken
      } = response.data;
      store.dispatch((setToken(token, refreshToken)))
      localStorage.setItem("token", token);//to remove temp
      localStorage.setItem("refreshToken", refreshToken);
      response.config.headers = authHeader()
      return Promise.resolve();
    })
    .catch((err) => {
      console.log('error', err)
      localStorage.clear();
      return Promise.reject(err);
    });

}
createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;











