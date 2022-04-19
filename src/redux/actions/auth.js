import AuthService from "../../redux/services/api/authServices"
import { authConstants } from "../constants/authConstants";
import { messageConstants } from "../constants/messageConstants";
import { userConstants } from "../constants/userConstants";


export const register = (obj) => async (dispatch) => {

  try {
    await AuthService.register(obj);
    dispatch({
      type: messageConstants.SET_MESSAGE,
      payload: "The user was successfully created."
    });
    return await Promise.resolve();
  } catch (error) {
    if (error.response) {
      var str = JSON.stringify(error.response.data);

      var mySubString = str.substring(
        str.indexOf("[") + 2,
        str.lastIndexOf("]") - 1
      );

      const message = (error.response &&
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
    return await Promise.reject();
  }

};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      localStorage.setItem('token', data.$values[0].token);
      localStorage.setItem('refreshToken', data.$values[0].refreshToken);
      localStorage.setItem('user', JSON.stringify(data.$values[0]));
      localStorage.setItem('employees', JSON.stringify(data.$values[0].employees.$values));
      dispatch({
        type: userConstants.MANAGER_DATA,
        data: JSON.parse(localStorage.getItem('user'))
      })

      dispatch({
        type: authConstants.REFRESH,
        payload: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('token')
      })
      return Promise.resolve();
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

export const setToken = (token, refreshToken) => (dispatch) => {

  dispatch({
    type: authConstants.REFRESH,
    payload: token,
    refreshToken: refreshToken
  })
};
