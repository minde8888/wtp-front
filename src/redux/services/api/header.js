import store from "../../store"

export default function authHeader() {
  var token = store.getState().auth.data.token
  if (typeof token === "string") {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}