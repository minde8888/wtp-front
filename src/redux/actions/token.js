import { authConstants } from "../constants/authConstants";

export const setToken = (token) => (dispatch) => {
  console.log(11111111111111111111111111111111111);
  console.log(token);
  dispatch({
    type: authConstants.REFRESH,
    payload: token
  })
};
