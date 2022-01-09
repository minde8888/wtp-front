import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./messageReducer";
import newPassword from "./getNewPasswordReducer";
import user from "./userReducer";
import employee from "./employeeReducer";
import project from "./projectReducer";

export default combineReducers({
  auth,
  message,
  newPassword,
  user,
  employee,
  project
});