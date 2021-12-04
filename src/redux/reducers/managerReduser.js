import { managerConstants } from "../constants/managerConstatnts";

const initialState = {
    message: "",
    data: "",
    userIsLoadied: false
};

export default function manager(state = initialState, action) {

    const { type, payload, userIsLoadied } = action;

    switch (type) {
        case managerConstants.MANAGER_DATA:
            return {
                data: payload,
                userIsLoadied: userIsLoadied
            };
        case managerConstants.MANAGER_DATA_ERROR:
            return {
                message: payload,
                userIsLoadied: userIsLoadied
            };
        default:
            return state;
    }
}