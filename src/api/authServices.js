import axios from "axios";
import url from './url';

const AUTH_URL = url + "/api/auth";

class AuthService {

  login(username, password) {
    return axios
      .post(AUTH_URL + "/login",
        {
          "email": username,
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
    return axios.post(AUTH_URL + "register", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();