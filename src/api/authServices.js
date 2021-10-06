import Instance from '../api/url.js';

const AUTH_URL = "/api/auth";

class AuthService {

  login(email, password) {
    return Instance
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

  register(username, email, password) {
    return Instance.post(AUTH_URL + "register", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();