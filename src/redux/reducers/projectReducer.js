import { projectConstants } from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    userIsLoaded: false
};

export default function project(state = initialState, action) {

    const { type, payload, isSelected } = action;
    switch (type) {
        case projectConstants.PROJECT_DATA:
            return {
                data: payload,
                userIsLoaded: true
            };
        case projectConstants.EDIT_MODUS:
            return {
                ...state, isSelected
            }
        default:
            return state;
    }
}