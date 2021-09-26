import axios from "axios";

class AuthService {

    login(username, password) {
      return axios
        .post("/login",
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
      return axios.post("/register", {
        username,
        email,
        password,
      });
    }
  }
  
  export default new AuthService();