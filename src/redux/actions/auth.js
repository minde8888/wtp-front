import AuthService from "../../redux/services/api/authServices"

const REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  SET_MESSAGE = "SET_MESSAGE",
  SEND_EMAIL = "SEND_EMAIL",
  SEND_FEIL = "SEND_FEIL"


export const register = (username, lastname, phoneNumber, email, password, roles, Id) => (dispatch) => {
 
  return AuthService.register(username, lastname, phoneNumber, email, password, roles, Id).then(
    async (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
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
        type: REGISTER_FAIL,
      });

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

// export const getPassword = (email) => (dispatch) => {
//   return AuthService.getPassword(email).then( 
//     async (response) => {
//       dispatch({
//         type: SEND_EMAIL,
//       });
//     },
//     (error) => {
//       var str = JSON.stringify(error.response.data);

//       var mySubString = str.substring(
//         str.indexOf("[") + 2,
//         str.lastIndexOf("]") - 1
//       );

//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       console.log(message);
//       dispatch({
//         type: SEND_FEIL,
//         payload: mySubString,
//       });
//     }
//   );
// }