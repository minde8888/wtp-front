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
      console.log(data);
      data.forEach(el => {
        const user = {
          id: el.Id,
          name: el.Name,
          surname: el.Surname,
          email: el.Email,
          imageName: el.ImageName,
          imageSrc: el.ImageSrc,
          isActine: el.IsActive,
          mobileNumber: el.PhoneNumber,
          occupation: el.Occupation,
          role: el.Role,
          Address: el.Address
        }
        const data = {
          user: user,
          employees: el.Employees,
          token: el.Token
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
