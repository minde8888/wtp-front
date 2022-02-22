import AuthService from "../../redux/services/api/authServices"
import {  authConstants} from "../constants/authConstants";
import {  messageConstants} from "../constants/messageConstants";
import { userConstants } from "../constants/userConstants";


export const register = (obj) => (dispatch) => {

  return AuthService.register(obj).then(() => {
    dispatch({
      type: messageConstants.SET_MESSAGE,
      payload: "The user was successfully created."
    });

    return Promise.resolve();
  }).catch(error => {

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
  })

};

export const login = (email, password) => (dispatch) => {

  return AuthService.login(email, password).then(
    (data) => {
      data.$values.forEach(el => {
        const user = {
          id: el.id,
          name: el.name,
          surname: el.surname,
          email: el.email,
          imageName: el.imageName,
          imageSrc: el.imageSrc,
          isActive: el.isActive,
          mobileNumber: el.phoneNumber,
          occupation: el.occupation,
          role: el.role,
          address: el.address
        }       

        localStorage.setItem('token', el.token); 
        localStorage.setItem('refreshToken', el.refreshToken);    
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
          type:userConstants.MANAGER_DATA,
          data:JSON.parse(localStorage.getItem('user'))
        })

        if (el.role === "Manager") {
          localStorage.setItem('employees', JSON.stringify(el.employees.$values));
          dispatch({
            type:userConstants.MANAGER_EMPLOYEES,
            payload:JSON.parse(localStorage.getItem('employees'))
          })
        }
   
        dispatch({
          type:authConstants.REFRESH,
          payload:localStorage.getItem('token'),
          refreshToken:localStorage.getItem('token')
        })
      });

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

export const setToken = (token) => (dispatch) => {
  
  dispatch({
    type: authConstants.REFRESH,
    payload: token
  })
};
