import { deleteConstants } from "../constants/deleteConstants";

const initialState = {
    isFeleted: false
};

export default function manager(state = initialState, action) {

    const { type, isFeleted } = action;

    switch (type) {
        case deleteConstants.DELETED_USER:
            return {
                deleted: isFeleted,
            };
        default:
            return state;
    }
}