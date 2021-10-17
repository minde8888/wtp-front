import { combineReducers } from "redux";
import auth from "./authReduser";
import message from "./messageReduser";
import adduser from "./addUserReduser"

export default combineReducers({
  auth,
  message,
  adduser
});