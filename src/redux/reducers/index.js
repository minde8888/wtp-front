import { combineReducers } from "redux";
import auth from "./authReduser";
import message from "./message";

export default combineReducers({
  auth,
  message,
});