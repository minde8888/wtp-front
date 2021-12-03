// import React from "react";
import { isEmpty } from "../../hjelpers/isEmpty";
import { authConstants } from "../constants/authConstants";

const data = JSON.parse(localStorage.getItem('user'));

// const {useEffect} = React

// useEffect(() => {
//     function checkUserData() {
//       const item = localStorage.getItem('data')
  
//       if (item) {
//         localStorage.setItem('user', JSON.stringify(item));
//       }
//     }
  
//     window.addEventListener('storage', checkUserData)
  
//     return () => {
//       window.removeEventListener('storage', checkUserData)
//     }
//   }, [])

var initialState =
    isEmpty(data) ?
        { isLoggedIn: true, data } :
        { isLoggedIn: false, data: null };


export default function auth(state = initialState, action) {

    const { type, data } = action;

    switch (type) {
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: data.user,
                employees: data.employees,
                token: data.token,
                isLoggedIn: true
            };
        case authConstants.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}