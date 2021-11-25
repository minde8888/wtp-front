import AuthService from "../../redux/services/api/authServices"

const LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
  SET_MESSAGE = "SET_MESSAGE"


export const register = (obj) => (dispatch) => {

  return AuthService.register(obj).then(
    async (response) => {
      dispatch({
        type: SET_MESSAGE,
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
          type: SET_MESSAGE,
          payload: mySubString,
        });
        return Promise.reject();
      }

      dispatch({
        type: SET_MESSAGE,
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

      data.forEach(el => {
        const user = {
          id: el.Id,
          name: el.Name,
          surName: el.Surname,
          email: el.Email,
          imageName: el.ImageName,
          imageSrc: el.ImageSrc,
          isActine: el.IsActive,
          mobileNumber: el.MobileNumber,
          occupation: el.Occupation,
          role: el.Role,
          Address: el.Address
        }

        dispatch({
          type: LOGIN_SUCCESS,
        });

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('employees', JSON.stringify(el.Employees));
        localStorage.setItem('token', JSON.stringify(el.Token));
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
          type: SET_MESSAGE,
          payload: mySubString,
        });
        return Promise.reject();
      }

      dispatch({
        type: SET_MESSAGE,
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
    type: LOGOUT,
  });
};

export const isLogin = () => {
  if (localStorage.getItem("token") &&
    localStorage.getItem("user")) {
    return true;
  }
  return false;
}
