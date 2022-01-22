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
        case projectConstants.DELETE_PROJECT_ID:
            return {
                ...state, removeProjects: payload,

            }
        case projectConstants.PROJECT_REMOVED:
            for (const key in payload) {
                state.data = state.data.filter(i => i.projectId !== payload[key])
            }
            return {
                ...state
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