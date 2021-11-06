import { combineReducers } from "redux";
import auth from "./authReduser";
import message from "./messageReduser";
import newPassword from "./getNewPasswordReduser";

export default combineReducers({
  auth,
  message,
  newPassword
});