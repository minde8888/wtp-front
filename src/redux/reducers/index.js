import { combineReducers } from "redux";
import auth from "./authReduser";
import message from "./messageReduser";
import newPassword from "./getNewPasswordReduser";
import employee from "./emploeeReduser"

export default combineReducers({
  auth,
  message,
  newPassword,
  employee
});