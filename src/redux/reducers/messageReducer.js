import { messageConstants } from "../constants/messageConstants";


const initialState = { error: false };

export default function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case messageConstants.SET_MESSAGE:
      return { message: payload };
    case messageConstants.ERROR:
      return {
        error: true,
        message: payload     
      };
    case messageConstants.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}