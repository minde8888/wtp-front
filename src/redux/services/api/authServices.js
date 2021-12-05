import Instance from '../api/url.js';

const AUTH_URL = "/api/auth";

class AuthService {

  async login(email, password) {
    return await Instance
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
    return await Instance.post(AUTH_URL + "/register", obj);
  }

  async getPassword(email) {
    return await Instance.post(AUTH_URL + "/ForgotPassword", {
      "email": email
    })
  }

  async getNewPassword(token, email, password) {
    return await Instance
      .post(AUTH_URL + "/ResetPassword",
        {
          "email": email,
          "token": token,
          "password": password
        })
      .catch((error) => {
        return error
      })
  }
}

export default new AuthService();