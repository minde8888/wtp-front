import AuthService from "../../redux/services/api/authServices"

const   REGISTER_FAIL = "REGISTER_FAIL",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  SET_MESSAGE = "SET_MESSAGE"


export const register = (username, lastname, phoneNumber, email, password, occupation, roles, Id) => (dispatch) => {
 
  return AuthService.register(username, lastname, phoneNumber, email, password, occupation, roles, Id).then(
    async (response) => {
      console.log(response);

      dispatch({
        type: SET_MESSAGE,
        payload: "The user was successfully created."
      });
      return await Promise.resolve();
    },
    (error) => {

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

      console.log(error.response);

      dispatch({
        type: SET_MESSAGE,
        payload: mySubString,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {

  return AuthService.login(email, password).then(
    async (data) => {
      data.forEach(el => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: el },
        });
      });

      return await Promise.resolve();
    },
    (error) => {

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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: mySubString,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

