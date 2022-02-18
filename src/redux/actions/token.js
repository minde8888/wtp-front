import { authConstants } from "../constants/authConstants";

export const setToken = (token) => ({
    type: authConstants.REFRESH,
    payloade:token
  });
  