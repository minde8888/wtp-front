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
        response.data.forEach(element => {

          if (element.Token) {
            localStorage.setItem("user", JSON.stringify(element));
          }
        })
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password, roles) {
    return await Instance.post(AUTH_URL + "/register", {
      "username": username,
      "email": email,
      "password": password,
      "roles": roles
    });
  }
}

export default new AuthService();