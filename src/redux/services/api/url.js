import createAuthRefreshInterceptor from 'axios-auth-refresh';


const instance = require('axios').create({
  baseURL: 'https://localhost:44395/'
});

let token = localStorage.getItem('token');
let refreshToken = localStorage.getItem('refreshToken');
console.log({token:token, refreshToken:refreshToken});
const refreshAuthLogic = failedRequest => instance.post('api/Auth/RefreshToken',{token:token, refreshToken:refreshToken}).then(tokenRefreshResponse => {

  localStorage.setItem('token', tokenRefreshResponse.data.token);
  localStorage.setItem('refreshToken', tokenRefreshResponse.data.refreshToken);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
  return Promise.resolve();
});

createAuthRefreshInterceptor(instance, refreshAuthLogic);



export default instance