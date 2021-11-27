import { messageConstants } from "../constants/messageConstants";


const initialState = {};

export default function message (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case messageConstants.SET_MESSAGE:
      return { message: payload };

    case messageConstants.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}