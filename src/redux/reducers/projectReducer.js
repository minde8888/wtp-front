import { projectConstants } from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    userIsLoaded: false,
    isSelected: ""
};

export default function project(state = initialState, action) {

    const { type, data, isSelected, payload } = action;

    switch (type) {
        case projectConstants.PROJECT_DATA:
            return {
                data: data,
                projectIsLoaded: true,
            };
        case projectConstants.EDIT_MODUS:
            return {
                ...state, isSelected
            };
        case projectConstants.PROJECT_ID:
            return {
                ...state, id:payload
            }
        case projectConstants.DELETE_PROJECT:
            // state.project.filter(i => i.id !== payload)
            return {
                ...state, removeProjects: payload
            }
        case projectConstants.ADD_PROJECT:
            return {
                ...state, isLoaded: payload
            }
        default:
            return state;
    }
}