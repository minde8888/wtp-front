import { messageConstants } from "../constants/messageConstants";

export const setMessage = (message) => ({
  type: messageConstants.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: messageConstants.CLEAR_MESSAGE
});


