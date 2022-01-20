import { projectConstants } from "../constants/projectConstants";

const initialState = {
    data: JSON.parse(localStorage.getItem('projects')),
    projectIsLoaded: false,
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
                ...state, id: payload
            }
        case projectConstants.DELETE_PROJECT:
            var a = state.data.filter(i => console.log(i.projectId !== payload))//tvarkyti

            return {
                ...state, removeProjects: payload,

            }
        case projectConstants.ADD_PROJECT:
            var key = state.data.length    
            state.data[key] = data
            return {
                ...state, isLoaded: payload,
            }
        case projectConstants.UPDATE_PROJECT_TABLE:
            return {
                ...state, updateProject: payload
            }
        default:
            return state;
    }
}