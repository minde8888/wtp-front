import { projectConstants } from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    userIsLoaded: false,
    isSelected: ""
};

export default function project(state = initialState, action) {

    const { type, data, isSelected, removeProjects } = action;

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
        case projectConstants.DELETE_PROJECT:
            return {
                ...state, removeProjects
            }
        default:
            return state;
    }
}