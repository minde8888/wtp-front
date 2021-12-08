import { updateUserConstants } from "../constants/updateUserConstants";

const initialState = {
    message: "",
    data: "",
    file: null,
    ImageSrc: null,
    userIsLoadied: false
};

export default function updateUser(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case updateUserConstants.USER_DATA_ERROR:
            return {
                message: payload,
            };
        case updateUserConstants.GET_FILE:
            return {
                ImageFile: payload,
                fileSrc: URL.createObjectURL(payload)
            
            }
        default:
            return state;
    }
}