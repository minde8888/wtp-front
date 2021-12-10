import AuthService from "../../redux/services/api/authServices"
import { authConstants } from "../constants/authConstants";
import { messageConstants } from "../constants/messageConstants";


export const register = (obj) => (dispatch) => {

  return AuthService.register(obj).then(
    async (response) => {
      dispatch({
        type: messageConstants.SET_MESSAGE,
        payload: "The user was successfully created."
      });

      return await Promise.resolve();
    },
    (error) => {

      if (error.response) {
        var str = JSON.stringify(error.response.data);

        var mySubString = str.substring(
          str.indexOf("[") + 2,
          str.lastIndexOf("]") - 1
        );

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(message);

        dispatch({
          type: messageConstants.SET_MESSAGE,
          payload: mySubString,
        });

        return Promise.reject();
      }

      dispatch({
        type: messageConstants.SET_MESSAGE,
        payload: "Network Error",
      });
      console.log(error);
      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {

  return AuthService.login(email, password).then(
    async (data) => {
      data.$values.forEach(el => {
        const user = {
          id: el.id,
          name: el.name,
          surname: el.surname,
          email: el.email,
          imageName: el.imageName,
          imageSrc: el.imageSrc,
          isActine: el.isActive,
          mobileNumber: el.phoneNumber,
          occupation: el.occupation,
          role: el.role,
          address: el.address
        }
        var data = {}
        if (el.role === "Manager") {
          data = {
            user: user,
            employees: el.employees.$values,
            token: el.token
          }
        } else if (el.role === "Employee") {
          data = {
            user: user,
            token: el.token
          }
        }

        localStorage.setItem('user', JSON.stringify(data));
      });

      return await Promise.resolve();
    },
    (error) => {

      if (error.response) {
        var str = JSON.stringify(error.response.data);

        var mySubString = str.substring(
          str.indexOf("[") + 2,
          str.lastIndexOf("]") - 1
        );

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(message);

        dispatch({
          type: messageConstants.SET_MESSAGE,
          payload: mySubString,
        });
        return Promise.reject();
      }

      dispatch({
        type: messageConstants.SET_MESSAGE,
        payload: "Network Error",
      });
      console.log(error);
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: authConstants.LOGOUT,
  });
};

export const isLogin = () => {
  if (localStorage.getItem("user")) {
    return true;
  }
  return false;
}


