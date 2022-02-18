import instance from '../api/url.js';

const AUTH_URL = "/api/auth";

class AuthService {

  async login(email, password) {
    return await instance
      .post(AUTH_URL + "/login",
        {
          "email": email,
          "password": password
        })
      .then((response) => {
        return response.data;
      }).catch((error) => {
        return Promise.reject(error);
      })
  }

  logout() {
    localStorage.clear();
  }

  async register(obj) {
    console.log(obj);
    return await instance.post(AUTH_URL + "/register", obj, { skipAuthRefresh: true });
  }

  async getPassword(email) {
    return await instance.post(AUTH_URL + "/ForgotPassword", {
      "email": email
    }, { skipAuthRefresh: true })
  }

  async getNewPassword(token, email, password) {
    return await instance.post(AUTH_URL + "/ResetPassword",
        {
          "email": email,
          "token": token,
          "password": password
        }, { skipAuthRefresh: true })
      .catch((error) => {
        return error
      })
  }
}

export default new AuthService();