import { combineReducers } from "redux";
import auth from "./authReduser";
import message from "./messageReduser";
import newPassword from "./getNewPasswordReduser";
import employee from "./emploeeReduser";
import updateUser from "./updateUserReduser";
import manager from "./managerReduser";

export default combineReducers({
  auth,
  message,
  newPassword,
  employee,
  manager,
  updateUser
});