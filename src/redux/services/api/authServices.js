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

  async register(username, lastname, phoneNumber, email, password, roles, Id = null) {

    // console.log(username, lastname, phoneNumber, email, password, roles, Id);
    return await Instance.post(AUTH_URL + "/register", {
      "username": username,
      "surname": lastname,
      "phoneNumber": phoneNumber,
      "email": email,
      "password": password,
      "roles": roles,
      "ManagerId": Id
    });
  }
}

export default new AuthService();